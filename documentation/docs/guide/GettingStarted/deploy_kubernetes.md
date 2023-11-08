# Deploying to Kubernetes

In order to deploy to a kubernetes cluster, follow these steps.  [Kustomize](https://kustomize.io/) is used to deploy to Kubernetes.
- Create a folder for your deployment for this example we use `deployment`
- Add a `kustomization.yaml` and a `patch.yaml` to your deployment
- Copy the sample code into these files and add configuration and secretes
- Create images for your deployment, which needs to be accessible by your deployment, and also match the architecture of kubernetes cluster (amd/arm)
  - Instructions on how to build images TBD
- View and test your deployment run `kubectl kustomize ./deployment`
- deploy your deployment `kubectl apply -k ./deployment`

## Deploying GDX Agreements Tracker to Kubernetes
### kustomization.yaml
```yaml
#/deployment/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
bases:
  - github.com/bcgov/gdx-agreements-tracker/deployments/kustomize/base

namespace: default
commonLabels:
  env: test
images:
  - name: bcgovgdx/gdx-agreements-tracker-app-run
    newName: yourimage-app-run
    newTag: latest
  - name: bcgovgdx/gdx-agreements-tracker-api-run
    newName: your-image-api-run
    newTag: latest
  - name: bcgovgdx/gdx-agreements-tracker-postgres-run
    newName: your-image-postgres-run
    newTag: latest
configMapGenerator:
  - name: config
    behavior: merge
    literals:
      - POSTGRES_DB=
      - POSTGRES_USER=
      - POSTGRES_HOST=
      - NODE_ENV=test
      - JWKSURI=
      - CDOGS_CLIENT_ID=
      - CDOGS_SECRET=
      - CHES_CLIENT_ID=
      - CHES_SECRET=
      - COMMON_COMPONENT_CDOGS_API=''
      - COMMON_COMPONENT_CHES_API=''
      - COMMON_COMPONENT_TOKEN_HOST=''
      - COMMON_COMPONENT_TOKEN_PATH=
      - SINGLE_SIGN_ON_API_TOKEN_HOST=
      - SINGLE_SIGN_ON_API_TOKEN_PATH=
      - SINGLE_SIGN_ON_API_CLIENT_ID=s
      - SINGLE_SIGN_ON_CLIENT_SECRET=
      - SINGLE_SIGN_ON_API=
      - SINGLE_SIGN_ON_INTEGRATION_ID=
      - SINGLE_SIGN_ON_ENVIRONMENT=
secretGenerator:
  - name: secrets
    type: Opaque
    behavior: merge
    literals:
      - POSTGRES_PASSWORD=
patchesStrategicMerge:
  - patch.yaml
```
### patch.yaml
```yaml
#/deployment/patch.yaml
kind: Deployment
apiVersion: apps/v1
metadata:
  name: app-deployment
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: app
          env:
            - name: REACT_APP_API_URL
              value: /api
            - name: REACT_APP_KEYCLOAK_URL
              value: ""
            - name: REACT_APP_KEYCLOAK_CLIENT_ID
              value: ""
            - name: REACT_APP_KEYCLOAK_REALM
              value: ""
```
