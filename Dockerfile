### STAGE 1: Build ###
FROM node:alpine as builder

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

ARG configuration=production

RUN npx ng build --configuration $configuration

## Stage 2: Serve with NGINX ###
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/*/ /usr/share/nginx/html

COPY 10-custom-nginx.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80