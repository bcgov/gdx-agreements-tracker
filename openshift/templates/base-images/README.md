

# Bring Dockerhub node images in as OpenShift imagestreams.

## Node 16
* `oc process -f openshift/templates/base-images/node-16.yaml | oc apply -f -`

## Nginx
* `oc process -f openshift/templates/base-images/nginx.yaml | oc apply -f -`

## Postgres image
* `oc process -f openshift/templates/base-images/postgres-14.yaml | oc apply -f -`