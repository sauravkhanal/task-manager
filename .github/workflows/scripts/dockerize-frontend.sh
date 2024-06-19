#!/bin/bash

echo "Building and running frontend Docker container..."
cd /var/www/taskmanager-frontend
docker build --no-cache -t frontend:latest .
docker stop frontend || true
docker rm frontend || true
docker run --restart unless-stopped --detach --name frontend --publish 3000:80 frontend:latest
