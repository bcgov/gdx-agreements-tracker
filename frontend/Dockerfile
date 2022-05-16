# build env.
FROM node:16-alpine3.12
WORKDIR /app
COPY public/ public/
COPY src/ src/
COPY package.json .
ADD tsconfig.json .
ADD .eslintrc.js .
ADD .prettierrc.js .

# COPY ./ .

RUN yarn
RUN yarn build --prod
