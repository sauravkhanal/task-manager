#!/bin/bash

echo "Building and running taskmanager-frontend Docker container..."
cd /var/www/taskmanager-frontend
docker build --no-cache -t taskmanager-frontend:latest .
docker stop taskmanager-frontend || true
docker rm taskmanager-frontend || true
docker run --restart unless-stopped --detach --name taskmanager-frontend --publish 3000:80 taskmanager-frontend:latest
