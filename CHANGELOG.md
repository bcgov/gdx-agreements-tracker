## Developer Changelog
### January 17, 2022 WD-3815 part 4
* backend
    * various small changes to please the linter in preparation for enabling backend linting check github action.

### January 14, 222 WD-3774
* backend
    * added user role checking for the user controller.
    * updated tests.
* removed frontend/.env file and consolidated .gitignore

### January 14, 2022 WD-3815 part 3
* backend
    * added logging for when connected to database, but the schema is wrong
* openshift
    * api
      * attempt a database migration to the latest migration on startup 
    * templates: a build automation fix
* github workflows
  * fix overlooked item: don't rebuild containers on non-code file changes
* local dev environment
  * fix overlooked item: don't copy new transients into container builds

### January 12, 2022 WD-3815 part 2
* backend
    * added info to log about database being connected to
* openshift
  * permit api to connect to the database container
  * various cleanups

### January 12, 2022 WD-3691
* add material UI, including theming, icons
* add users table and related components

### January 11, 2022 WD-3815 part 2
* backend
  * added secretfile support for openshift database password
  * auth fix
  * autodeploy fix
* openshift
  * removed postgres alpine image from imagestream; alpine won't work for postgres on openshift without needless suffering. we will probably use hosted postgres eventually.
  * added configmap for keycloak endpoint, and database config parameters
  * changed backend deploy to use database and keycloak params
* other
  * deduplicated parameters in docker-compose.yml
  * migrated docker web directory to the docker directory to clean up the root

### January 11, 2022 WD-3815
* backend
    * added unified logger (facilities/logging.js)
      * set environment variable NODE_ENV to 'production' when deploying to production
      * uses pino library for logging in the whole app (fastify uses it, and it is pretty slick)
        * there is one logger instance, with the option to use child logger instances 
          * conveniently group log entries by file/role/request
          * usage: `const log = require('../facilities/logging.js')(module.filename);` at the top of your file that needs logging
            * the `module.filename` makes a new child logger for you that will group all log messages in that file for you
            * use `log.child({ subcomponent: 'someUniqueStringYouLike' })` to make a sub-child log if you need. perhaps for logging individual requests/sessions.
      * updated fastify to use new logger
      * updated database to use new logger
    * moved database auto-deploy logic to a more appropriate spot (startup, not every db check)
    * cleanup server.js: moved shutdown handlers into daemon.js
    * restructuring
      * new directory: facilities: for full-on components, not just helpers
      * moved daemon.js to facilities directory
      * helpers/auth.js -> facilities/keycloak.js because keycloak items are what is in there, and it is more than helpers
      * helpers/server.js -> facilities/fastify.js because fastify configuration items are in there, and fastify is not just a helper

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
