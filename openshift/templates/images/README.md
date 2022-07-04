# Images
[..back to OpenShift](../README.md)

Base images are images that would use dockerhub image streams to create an additional layer to add more functionality or modify existing functionality of the image.


## API
* Creates the image used for the backend container.
* `oc process -p OC_DOCKER_FILE="$(cat openshift/templates/images/api/docker/Dockerfile)" -f openshift/templates/images/api/build.yaml | oc apply -f -`

### Build locally 
* `docker build -t gdx-agreements-tracker-api-build -f openshift/templates/images/api/docker/Dockerfile ./backend/`
* verify image `docker run -it gdx-agreements-tracker-api-build sh`


## App
* Creates the image used for the app container.
* `oc process -p OC_DOCKER_FILE="$(cat openshift/templates/images/app/docker/Dockerfile)" -f openshift/templates/images/app/build.yaml | oc apply -f -`

#### Build locally 
* `docker build -t gdx-agreements-tracker-app-build -f openshift/templates/images/app/docker/Dockerfile ./frontend/`
* verify image `docker run -it gdx-agreements-tracker-app-build sh`


## Nginx
* Creates the image used for the nginx.
* `oc process -f openshift/templates/images/nginx/build.yaml | oc apply -f -`

#### Build locally 
* `docker build -t gdx-agreements-tracker-nginx-run -f openshift/templates/images/nginx/docker/Dockerfile ./openshift/templates/images/nginx/docker/`
* verify image `docker run -it gdx-agreements-tracker-nginx-run env`

## NodeJS
* Creates s2i using node 16.15.1 lts
* `oc process -f openshift/templates/images/nodejs/build.yaml | oc apply -f -`

#### Build locally
* `docker build -t gdx-agreements-tracker-node-s2i -f openshift/templates/images/nodejs/Dockerfile ./openshift/templates/images/nodejs/`
* verify image `docker run -it gdx-agreements-tracker-node-s2i env`


## Postgres
* Creates the image used for the nginx.
* `oc process -f openshift/templates/images/postgres/build.yaml | oc apply -f -`

#### Build locally 
* `docker build -t gdx-agreements-tracker-postgres-run -f openshift/templates/images/postgres/Dockerfile ./openshift/templates/images/postgres/`
* verify image `docker run -it gdx-agreements-tracker-postgres-run env`

