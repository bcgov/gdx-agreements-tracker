## API
Creates the image used for the backend container.
`oc process -f openshift/templates/api/build.yaml | oc apply -f -`

## APP
Creates the image used for the frontend container.
`oc process -f openshift/templates/app/build.yaml | oc apply -f -`

## Base Images
| Image | Version | Description |
| ----- | ------- | ----------- |
| node | 16-alpine | Node version that gets built in base images via Dockerfile. |
| nginx | stable | Nginx web server, used to serve WordPress / PHP |
| postgres | 14-bullseye | Postgres database management system |