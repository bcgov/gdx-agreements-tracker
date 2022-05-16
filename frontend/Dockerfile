# build env.
FROM node:16-alpine3.12
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .

RUN npm i
RUN npm run build --prod
