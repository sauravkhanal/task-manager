#!/bin/bash

echo "Building and running taskManagerFrontend Docker container..."
cd /var/www/taskmanager-taskManagerFrontend
docker build --no-cache -t taskManagerFrontend:latest .
docker stop taskManagerFrontend || true
docker rm taskManagerFrontend || true
docker run --restart unless-stopped --detach --name taskManagerFrontend --publish 3000:80 taskManagerFrontend:latest
