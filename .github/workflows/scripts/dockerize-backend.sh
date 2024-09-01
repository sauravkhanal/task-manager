#!/bin/bash
echo "Building and running taskmanager-backend Docker container..."
cd /var/www/taskmanager-backend
docker build -t taskmanager-backend:latest .
docker stop taskmanager-backend || true
docker rm taskmanager-backend || true

docker run -d --restart unless-stopped --no-cahce --name taskmanager-backend -p 8000:8000 \
  -e PORT="${PORT}" \
  -e CORS="${CORS}" \
  -e ENDPOINT="${ENDPOINT}" \
  -e PUBLIC_STORAGE="${PUBLIC_STORAGE}" \
  -e MONGO_DB_URI="${MONGO_DB_URI}" \
  -e DB_NAME="${DB_NAME}" \
  -e EMAIL_USERNAME="${EMAIL_USERNAME}" \
  -e EMAIL_PASSWORD="${EMAIL_PASSWORD}" \
  -e CORS_ORIGINS="${CORS_ORIGINS}" \
  taskmanager-backend:latest