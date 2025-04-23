FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx playwright install --with-deps

COPY . .
