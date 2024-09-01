#!/bin/bash
echo "Building and running task-manager-backend Docker container..."
cd /var/www/taskmanager-task-manager-backend
docker build -t task-manager-backend:latest .
docker stop task-manager-backend || true
docker rm task-manager-backend || true

docker run -d --restart unless-stopped --no-cahce --name task-manager-backend -p 8000:8000 \
  -e PORT="${PORT}" \
  -e CORS="${CORS}" \
  -e ENDPOINT="${ENDPOINT}" \
  -e PUBLIC_STORAGE="${PUBLIC_STORAGE}" \
  -e MONGO_DB_URI="${MONGO_DB_URI}" \
  -e DB_NAME="${DB_NAME}" \
  -e EMAIL_USERNAME="${EMAIL_USERNAME}" \
  -e EMAIL_PASSWORD="${EMAIL_PASSWORD}" \
  -e CORS_ORIGINS="${CORS_ORIGINS}" \
  task-manager-backend:latest