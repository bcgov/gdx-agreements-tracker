FROM node:18.14.0-alpine3.17
WORKDIR /usr/scr/app
ADD . /usr/scr/app/
RUN npm i

RUN rm -rf src/database/production_seeds/* && \
    rm src/database/production_seeds/.gitkeep && \
    chmod -R 777 src/database/production_seeds
EXPOSE 8080
CMD [ "node", "src/server.js" ]
