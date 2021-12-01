# build env.
FROM node:14-alpine3.12 as build
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .

RUN yarn
RUN yarn build

#FROM nginx:1.21-alpine
#COPY --from=build /app/build /var/www
#COPY Docker/nginx.conf /etc/nginx/nginx.conf
#EXPOSE 8080
#ENTRYPOINT ["nginx", "-g", "daemon off;"]