# Postgres
[..back to OpenShift](../README.md)

## Variables
```bash
export OC_ENV="dev" #(dev|test|prod)
```

## Configure 
* Configure the Postgres deployment.
* `oc process -p ENV_NAME=${OC_ENV} -p POSTGRES_REGULAR_USER_PASSWORD=changeTHISstring -p POSTGRES_ROOT_PASSWORD=changeTHISstringTOO  -f openshift/templates/postgres/config.yaml | oc apply -f -`

## Volumes.
* Create the Postgres volume
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/postgres/volume.yaml | oc apply -f -`

## Deployment.
* Initialize the API container deployment.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/postgres/deploy.yaml | oc apply -f -`