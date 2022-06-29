# GDX Agreements Tracker React Web Application
[..back to OpenShift](../README.md)

## Variables
```bash
export OC_ENV="dev" #(dev|test|prod)
export OC_APP_DOMAIN="gdx-agreements-tracker-dev.apps.silver.devops.gov.bc.ca"
export OC_KC_CLIENTID="my-client-id"
export OC_KC_URL="https://example.com"

```

## Routes
* Stand up the App routes.
* `oc process -p ENV_NAME=${OC_ENV} -p APP_DOMAIN=${OC_APP_DOMAIN} -f openshift/templates/app/deploy-route.yaml | oc apply --overwrite=false -f -`

## Deployment
* Initialize the App container deployment.
* `oc process -p ENV_NAME=${OC_ENV} -p KEYCLOAK_CLIENT_ID=${OC_KC_CLIENTID} -p KEYCLOAK_URL=${OC_KC_URL} -f openshift/templates/app/deploy.yaml | oc apply -f -`
