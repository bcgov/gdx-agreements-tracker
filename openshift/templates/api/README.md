# API
[..back to OpenShift](../README.md)
## Variables
```bash
export OC_ENV="dev" #(dev|test|prod)
```

## Configure 
* Configure the API deployment.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/api/config.yaml | oc apply -f -`

## Routes.
* Stand up the API routes.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/api/deploy-route.yaml | oc apply -f -`

## Deployment.
* Initialize the API container deployment.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/api/deploy.yaml | oc apply -f -`
