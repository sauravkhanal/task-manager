#!/bin/bash
echo "Building and running taskManagerBackend Docker container..."
cd /var/www/taskmanager-taskManagerBackend
docker build -t taskManagerBackend:latest .
docker stop taskManagerBackend || true
docker rm taskManagerBackend || true

docker run -d --restart unless-stopped --no-cahce --name taskManagerBackend -p 8000:8000 \
  -e PORT="${PORT}" \
  -e CORS="${CORS}" \
  -e ENDPOINT="${ENDPOINT}" \
  -e PUBLIC_STORAGE="${PUBLIC_STORAGE}" \
  -e MONGO_DB_URI="${MONGO_DB_URI}" \
  -e DB_NAME="${DB_NAME}" \
  -e EMAIL_USERNAME="${EMAIL_USERNAME}" \
  -e EMAIL_PASSWORD="${EMAIL_PASSWORD}" \
  -e CORS_ORIGINS="${CORS_ORIGINS}" \
  taskManagerBackend:latest