# GDX Agreements Tracker React Web Application
[..back to OpenShift](../README.md)

## Variables
```bash
export OC_ENV="dev" #(dev|test|prod)
export OC_APP_DOMAIN="gdx-agreements-tracker-dev.apps.silver.devops.gov.bc.ca"
```

## Routes
* Stand up the App routes.
* `oc process -p ENV_NAME=${OC_ENV} -p APP_DOMAIN=${OC_APP_DOMAIN} -f openshift/templates/app/deploy-route.yaml | oc apply -f -`

## Deployment
* Initialize the App container deployment.
* `oc process -p ENV_NAME=${OC_ENV} -f openshift/templates/app/deploy.yaml | oc apply -f -`
