# GoProxyDock (GPD)

## Overview

GoProxyDock (GPD) is a Node.js application designed to automatically update DNS records for domains registered with GoDaddy. The application periodically checks your current public IP address and updates the DNS records if there are changes, ensuring that your domains always point to the correct IP address.

## Features

- Automatically fetches the current public IP address.
- Updates DNS records for specified domains on GoDaddy.
- Configurable check interval.
- Uses environment variables for configuration.
- **Nginx Proxy Manager**: Provides a user-friendly interface for managing reverse proxies and SSL certificates.
- **Portainer**: Docker management interface that makes it easy to manage containers, images, and volumes.

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- GoDaddy account with API access

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```plaintext
   GODADDY_API_KEY=your_godaddy_api_key
   GODADDY_API_SECRET=your_godaddy_api_secret
   DOMAINS=yourdomain.com,anotherdomain.com
   INTERVAL=300000 # Interval in milliseconds (default is 5 minutes)
   ```

3. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```

## Usage

The application will automatically start checking your public IP address and update the DNS records for the specified domains at the interval defined in the `.env` file.

Additionally, you can use `nginx-proxy-manager` to manage reverse proxies and SSL certificates for your services. `Portainer` helps you manage Docker containers easily through a web interface.

## Configuration

- **GODADDY_API_KEY**: GoDaddy API key.
- **GODADDY_API_SECRET**: GoDaddy API secret.
- **DOMAINS**: Comma-separated list of domains to update.
- **INTERVAL**: Interval in milliseconds to check the IP address (default is 5 minutes).

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Axios](https://github.com/axios/axios) for HTTP requests.
- [dotenv](https://github.com/motdotla/dotenv) for environment variable management.
