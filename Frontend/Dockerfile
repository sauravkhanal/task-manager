# build stage

FROM node:20 as build_stage

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Final stage
FROM nginx:alpine

COPY --from=build_stage /build/dist /usr/share/nginx/html

# COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
# RUN curl -o /etc/nginx/conf.d/default.conf https://files.khanalsaurav.com.np/api/public/dl/g8A8Li1z?inline=true



