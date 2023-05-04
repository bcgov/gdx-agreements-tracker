# build env.
FROM node:18.14.0-alpine3.17
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .
ADD tsconfig.json .
ADD .eslintrc.js .
ADD .prettierrc.js .
RUN yarn
RUN yarn build --openssl-legacy-provider --prod
