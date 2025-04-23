# Verifica Copertura Fibercop

This project is a tool to check if FTTH (Fiber to the Home) is available at a given address.

## Project Setup

To get this project up and running, you need to have Docker and Docker Compose installed on your system.

### Prerequisites

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/verifica-copertura-fibercop
    cd verifica-copertura-fibercop
    ```

2.  Build the Docker image:
    ```bash
    docker compose build
    ```
## Usage

Once the Docker image is built, you can run the `fibercop.js` script by executing the following command, passing the required arguments for city, street, and house number:

```bash
docker compose run app "city" "street" "house_number"
```

*   `app`: This is the name of the service defined in your `docker compose.yml`.
*   `"city" "street" "house_number"`: These are the arguments passed to the `src/fibercop.js` script.

Example:
```bash
docker compose run app roma "via del corso" 2
```

## Output

The script can produce three types of output:

1.  **FTTH Available**: Indicates that Fiber to the Home is available at the specified address.
2.  **FTTH Not Available**: Indicates that Fiber to the Home is not available at the specified address.
3.  **Address Not Found**: If the script is unable to find the specified address, it will print an error message indicating that the address could not be found.
4.  **Unknown output**: If the script encounters an unexpected response from the Fibercop website, it will print a message indicating an unknown output type and the detected `href`. In this case, please consider opening a pull request on the GitHub repository with the new output type.

## Author

Edoardo Mistretta
