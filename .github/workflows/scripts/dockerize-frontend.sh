#!/bin/bash

echo "Building and running task-manager-frontend Docker container..."
cd /var/www/taskmanager-task-manager-frontend
docker build --no-cache -t task-manager-frontend:latest .
docker stop task-manager-frontend || true
docker rm task-manager-frontend || true
docker run --restart unless-stopped --detach --name task-manager-frontend --publish 3000:80 task-manager-frontend:latest
