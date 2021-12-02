# build env.
FROM node:16-alpine3.12
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .

RUN yarn 
RUN yarn build --prod
