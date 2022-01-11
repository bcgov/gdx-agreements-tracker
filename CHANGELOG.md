## Developer Changelog

### January 10, 2022 WD-3771
* backend
    * included fastify-plugin to package.json
    * Added **getUserInfo** function to backend/src/helpers/auth.js -> gets user info from bearer token.
    * added  .register(fastifyRoles) to backend/src/helpers/config.json -> register fastify roles plugin.
    * added plugin fastifyRoles
    * changed the logger default level to debug.
    * structure for payload is now {data: payload} instead of just payload, this allows other objects to be passed along with the data.
    * updated the validator logic for the data attribute.
    * added checkPermissions in user controller as a function that might be used for checking against capabilities, and allowed endpoints.

## January 10, 2022
* fix log volume issue for nginx reverse proxy
* flesh out readmes a bit more
* add user to DB on first login

### January 4, 2022
* update pullrequest template
* updated docker-compose file to include db variables
* frontend
    * fixed user endpoint user -> users
* backend
    * added knexfile.js to nodeman watch
