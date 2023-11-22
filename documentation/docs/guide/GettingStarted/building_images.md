# Container Images

## Base Images on OpenShift
::: tip
Updating base images on OpenShift is only done at the specific Build config;
-  [s2i Node](https://github.com/bcgov/gdx-agreements-tracker/blob/development/deployments/kustomize/image-builds/nodejs-s2i.yaml#L29)
-  [s2i Nginx](https://github.com/bcgov/gdx-agreements-tracker/blob/development/deployments/kustomize/image-builds/nginx.yaml#L27)
-  [Postgres](https://github.com/bcgov/gdx-agreements-tracker/blob/development/deployments/kustomize/image-builds/postgres.yaml#L31)
:::


### Updating OpenShift Build Configs
After the images have been updated into the Build Configs for Node, Nginx and Postgres, update the build configs by running the following commands.
```sh
# Step 1 - Go to Directory of Repo
cd gdx-agreements-tracker
# Step 2 - Login to OpenShift oc command line
oc login --token=secret-token --server=https://myopnshift.com
# Step 3 - Choose the tools folder
oc project 12345-tools
# step 4 - Apply kustomize file
oc apply -k deployments/kustomize/image-builds
```
::: warning
Don't forget this step, otherwise base images will never get updated.
:::


### S2I Node Base Image
@[code{29-29} yaml:no-line-numbers](../../../../deployments/kustomize/image-builds/nodejs-s2i.yaml)

### S2I Nginx Base  Image
@[code{27-27} yaml:no-line-numbers](../../../../deployments/kustomize/image-builds/nginx.yaml)

### Postgres Base Image
@[code{31-31} yaml:no-line-numbers](../../../../deployments/kustomize/image-builds/postgres.yaml)

## Building Images Locally using Docker
Local development only uses docker for the database, and the app, and api use node on the local machine.
The images builds for the app, and api utilizes the OpenShift s2i, therefor these image builds might only be useful for troubleshooting.


### NodeJs
Is used for building both the api and frontend application.
```sh
# Build
docker build -t node-s2i \
-f openshift/templates/images/nodejs/Dockerfile \
./openshift/templates/images/nodejs/
# Verify
docker run -it --rm node-s2i /usr/local/s2i/usage
```

### Nginx
Is required for building application, creates Nginx server.
```sh
# Build
docker build -t nginx-s2i \
-f openshift/templates/images/nginx/docker/Dockerfile \
./openshift/templates/images/nginx/docker/
# Verify
docker run -it --rm nginx-s2i cat /etc/nginx/conf.d/default.conf
```


### Postgres
The PostgreSQL database image
```sh
# Build
docker build -t postgres-run \
-f openshift/templates/images/postgres/Dockerfile \
./openshift/templates/images/postgres/
# Verify
docker run -it --rm postgres-run env | grep -i version
```

### Application
The frontend application, however the build is failing on docker, but works with OpenShift
```sh
# Build
docker build -t app-run \
-f ./frontend/Dockerfile \
./frontend/
# Verify
docker run -it --rm app-run -p 308080:8080
```

### API
```sh
# TBD
```

