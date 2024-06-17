# build stage

FROM node:20 as build_stage

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# 

FROM nginx:alpine

COPY --from=build_stage /build/dist /usr/share/nginx/html

# CMD [ "nginx" ]


