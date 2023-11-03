# Building Images
Base images are images that would use dockerhub image streams to create an additional layer to add more functionality or modify existing functionality of the image.

**IMPORTANT** There are multi-stage build, which these are only part of the build.  This documentation is incomplete, but left here as a starting point.

## API
```sh
# Build
docker build -t gdx-agreements-tracker-api-build -f openshift/templates/images/api/docker/Dockerfile ./backend/
# Verify
docker run -it gdx-agreements-tracker-api-build sh
```

## App
```sh
# Build
docker build -t gdx-agreements-tracker-app-build -f openshift/templates/images/app/docker/Dockerfile ./frontend/
# Verify
docker run -it gdx-agreements-tracker-app-build sh
```

## Nginx
```sh
# Build
docker build -t gdx-agreements-tracker-nginx-run -f openshift/templates/images/nginx/docker/Dockerfile ./openshift/templates/images/nginx/docker/
# Verify
docker run -it gdx-agreements-tracker-nginx-run env
```

## NodeJS
```sh
# Build
docker build -t gdx-agreements-tracker-node-s2i -f openshift/templates/images/nodejs/Dockerfile ./openshift/templates/images/nodejs/
# Verify
docker run -it gdx-agreements-tracker-node-s2i env
```

## Postgres

```sh
# Build
docker build -t gdx-agreements-tracker-postgres-run -f openshift/templates/images/postgres/Dockerfile ./openshift/templates/images/postgres/
# Verify
docker run -it gdx-agreements-tracker-postgres-run env
```

