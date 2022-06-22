# API

## Variables
```bash
export OC_ENV="dev" #(dev|test|prod)
```

## Configure 
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/api/config.yaml | oc apply -f -`

## Routes.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/api/deploy-route.yaml | oc apply -f -`

## Deployment.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/api/deploy.yaml | oc apply -f -`

