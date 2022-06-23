# Images
Base images are images that would use dockerhub image streams to create an additional layer to add more functionality or modify existing functionality of the image.


## API Image Stream
* Creates the image used for the backend container.
* `oc process -p OC_DOCKER_FILE="$(cat openshift/templates/images/api/docker/Dockerfile)" -f openshift/templates/images/api/build.yaml | oc apply -f -`

### Build locally 
* `docker build -t gdx-agreements-tracker-api-run -f openshift/templates/images/api/docker/Dockerfile ./backend/`
* verify image `docker run -it gdx-agreements-tracker-api-run sh`


## App Image Stream
* Creates the image used for the app container.
* `oc process -p OC_DOCKER_FILE="$(cat openshift/templates/images/app/docker/Dockerfile)" -f openshift/templates/images/app/build.yaml | oc apply -f -`

#### Build locally 
* `docker build -t gdx-agreements-tracker-app-run -f openshift/templates/images/app/docker/Dockerfile ./frontend/`
* verify image `docker run -it gdx-agreements-tracker-app-run sh`


## Nginx Image Stream
* Creates the image used for the nginx.
* `oc process -f openshift/templates/images/nginx/build.yaml | oc apply -f -`

#### Build locally 
* `docker build -t gdx-agreements-tracker-nginx-run -f openshift/templates/images/nginx/docker/Dockerfile ./openshift/templates/images/nginx/docker/`
* `
* verify image `docker run -it gdx-agreements-tracker-nginx-run sh`


-p GIT_REF=${OC_GIT_REF}