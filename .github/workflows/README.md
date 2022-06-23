# Github Workflows

## Actions
* `api-build.yml` is fired when either there is a backend change, or an OpenShift template change related to api.
* `api-tests.yml` is fired when there is a pr into development, and changes have been made to the backend api.
* `app-build.yml` is fired when there is a app (frontend) change or an OpenShift template change related to app.
* `app-tests.yml` is fired when there is a pr into development, and changes have been made to the app.
* `app-nginx-build.yml` is fired when there is a change to an OpenShift template for nginx
* `app-promote-to-test.yml` currently not operational
* `nodejs-s2i-build.yml`  is fired when changes are made to the nodejs s2i OpenShift templates

## Create Openshift secrets 

Create the following secrets in repo.

* OpenShiftServerURL `https://api.silver.devops.gov.bc.ca:6443`
* OpenShiftToken `oc serviceaccounts get-token pipeline`
