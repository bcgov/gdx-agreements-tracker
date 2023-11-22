      # Can't use the assemble script from node s2i as React needs yarn && yarn build
      # docker build -t app-run ./frontend
      FROM node-s2i as build
      WORKDIR /tmp
      COPY . /tmp
      RUN yarn
      RUN yarn build --openssl-legacy-provider --prod

      # Adding Nginx
      FROM nginx-s2i
      COPY --from=build /tmp/build/. /tmp/app/dist
      USER root
      # Adding the env so frontend client has access to them.
      RUN ln -sf /etc/nginx/publicServerEnvironmentSettings.js  /tmp/app/dist/publicServerEnvironmentSettings.js
      USER 104
      CMD  /usr/libexec/s2i/run