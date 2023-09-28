# build env.
FROM node:18.18.0-alpine3.18
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .
ADD tsconfig.json .
ADD .eslintrc.js .
ADD .prettierrc.js .
RUN yarn
RUN yarn build --openssl-legacy-provider --prod
