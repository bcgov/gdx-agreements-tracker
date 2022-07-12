# build env.
FROM node:16.16.0-alpine3.16
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .
ADD tsconfig.json .
ADD .eslintrc.js .
ADD .prettierrc.js .
RUN yarn
RUN yarn build --prod
