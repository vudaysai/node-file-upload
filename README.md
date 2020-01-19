# PasteBin sample

## Sample PasteBin applicaton developed using Nodejs, Express, MongoDB and Docker.

## Installation

> [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)

> Docker Compose

- sudo apt-get install docker-compose

### Steps to run docker without sudo

- newgrp docker
- sudo usermod -aG docker {your-username}

## Usage

1. Clone it!
2. run docker-compose build (to build the containers)
3. docker-compose up -d (to up and run the containers. Use -d to run it in background)

## Using API's

1. GET http://localhost:3000/api/uploads
   > Sample API to check app is up and running. Response will be `Sample paste bin app`.
2. POST http://localhost:3000/api/uploads
   > Request body { name:test (this will be uploaded file name if none specified original file name is assigned), file: FILE(required), expiry: 60(time in seconds. If not given defaults to one day ) }
   > Response { url: downlodable file URI }
