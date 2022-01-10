## Developer Changelog

### January 10, 2022 WD-3771
* backend
    * included fastify-plugin to package.json
    * Added getUserInfo function to backend/src/helpers/auth.js -> gets user info from bearer token.
    * added  .register(fastifyRoles, { user }) to backend/src/helpers/config.json -> register fastify roles plugin.
    * added plugin fastifyRoles
    * changed the logger default level to debug.

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
