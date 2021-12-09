FROM node:16-alpine

WORKDIR /usr/scr/app
COPY . .
RUN npm i --production

EXPOSE 8080
CMD [ "node", "src/server.js" ]
