# GDX Agreements Tracker React Web Application.

## Build

```
oc project acd38d-tools
oc process -f build.yaml | oc create --save-config=true -f -
```

## Changes to config
```oc process -f build.yaml | oc apply -f -```

### Deployments

#### Deploy to dev
```
oc project acd38d-dev
oc process -f deploy.yaml -p ENV_NAME=dev | oc create --save-config=true -f -
oc process -f deploy-route.yaml -p ENV_NAME=dev -p APP_DOMAIN=gdx-agreements-tracker-dev.apps.silver.devops.gov.bc.ca | oc create --save-config=true -f -
```

#### Deploy to test
```
oc project acd38d-test
oc process -f deploy.yaml -p ENV_NAME=test | oc create --save-config=true -f -
oc process -f deploy-route.yaml -p ENV_NAME=test -p APP_DOMAIN=gdx-agreements-tracker-test.apps.silver.devops.gov.bc.ca | oc create --save-config=true -f -
```

#### Deploy to prod
```
oc project acd38d-prod
oc process -f deploy.yaml -p ENV_NAME=prod | oc create --save-config=true -f -
oc process -f deploy-route.yaml -p ENV_NAME=prod -p APP_DOMAIN=gdx-agreements-tracker-prod.apps.silver.devops.gov.bc.ca | oc create --save-config=true -f -
```

