const { chromium } = require('playwright');

(async () => {
  if (process.argv.length < 5) {
    console.log('Usage: node fibercop.js <city> <address> <addressNum>');
    process.exit(1);
  }

  const city = process.argv[2];
  const address = process.argv[3];
  const addressNum = process.argv[4];
  console.log("Request pending...")
  const browser = await chromium.launch({ headless: true, timeout: 60000 });
  const page = await browser.newPage();
  async function typeSlowly(selector, text) {
    for (let char of text) {
      await page.press(selector, char); // Digita un carattere alla volta
      const randomDelay = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
      await page.waitForTimeout(randomDelay);
    }
  }
  await page.goto('https://www.fibercop.it/chi-siamo/verifica-la-tua-copertura/');
  await page.waitForSelector('input[id="ff-citta"]');
  try {
    await typeSlowly('input[id="ff-citta"]', city);
    await page.waitForSelector('div.ff-form-field.citta ul.prompter.show li:not(.start)');
    const firstComuneOption = await page.locator('div.ff-form-field.citta ul.prompter.show li:not(.start)').first();
    await firstComuneOption.click();
    await typeSlowly('input[id="ff-indirizzo"]', address);
    await page.waitForSelector('div.ff-form-field.indirizzo ul.prompter.show li:not(.start)');
    const firstIndirizzoOption = await page.locator('div.ff-form-field.indirizzo ul.prompter.show li:not(.start)').first();
    await firstIndirizzoOption.click();
    await typeSlowly('input[id="ff-civico"]', addressNum);
    await page.waitForSelector('div.ff-form-field.civico ul.prompter.show li:not(.start)');
    const firstCivicoOption = await page.locator('div.ff-form-field.civico ul.prompter.show li:not(.start)').first();
    await firstCivicoOption.click();
    await page.waitForSelector('button[id="ff-submit"]:not([disabled])');
    await page.click('button[id="ff-submit"]');
  } catch (error) {
    console.error(`Address Not Found: ${city}, ${address}, ${addressNum}`);
    await browser.close();
    process.exit(1);
  }

  const response = await page.waitForResponse((response) =>
    response.url().includes('admin-ajax.php') && response.status() === 200
  );
  const data = await response.json();
  const href = data.href;
  if (href.includes('/verifica-copertura/connesso/')) {
    console.log('FTTH Available');
  } else if (href.includes('/verifica-copertura/non-connesso-out-no-fibercop/') || href.includes('/verifica-copertura/non-connesso-out/')) {
    console.log('FTTH Not Available');
  } else {
    console.log('Unknown output. Please open a pull request on GitHub with the new output type.');
    console.log('Detected href:', href);
  }
  await browser.close();
})();
