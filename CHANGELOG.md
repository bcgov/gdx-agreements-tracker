## Developer Changelog

### June 15, 2022 DESCW-394

- Frontend / backend
  - added Node version restriction rules

### June 14, 2022 DESCW-410

- Frontend
  - added accordion for project sections

### May 30, 2022 DESCW-360

- backend
  - new migration to permit data load from production
  - new seed that can load data from production, if present
    - only (re)loads production data if it is there, does nothing but updates ID sequences otherwise.
    - uses the `production_seeds` directory
      - updated `.gitignore` to prevent you from committing production data to repo
    - added nReadLine package to read seed data line-by-line in order to reduce memory usage
    - see the `pmo-mssql-converter` repo for more information

### May 18, 2022 DESCW-363

- backend
  - API
    - added backend API for picker_options

### May 17, 2022 DESCW-382

- frontend
  - implemented react-query for project details api

### May 16, 2022 DESCW-362

- frontend
  - Added sub menu for admin links

### May 13, 2022

- backend
  - added new migrations and seeds for picklists database table

### May 6, 2022

- DESCW-271 - improve linter standards
  - frontend and backend
    - you will need to do an `npm i` in `frontend` and `backend` directories to get the updated linter dependencies, if you have been working on the codebase before this commit.

### May 5, 2022 DESCW-324, DESCW-368, DESCW-369, DESCW-370, DESCW-371

- backend
  - added new migrations and seeds for projects database table
  - API
    - added backend API for projects
- frontend
  - added projects table
  - added route for projects

### May 4, 2022 DESCW-297

- frontend
  - added signout button/funcionality

### May 2, 2022 DESCW-280

- frontend
  - added new header, footer and sidebar
- Add CODEOWNERS file.

### April 26, 2022 DESCW-279

- frontend
  - added subcontractors table

### April 19, 2022 DESCW-275

- frontend
  - added hook that formats table data for use in Material UI Tables
  - added suppliers table
  - updated suppliers routes to point to the updated suppliers page

### April 11, 2022 DESCW-76

- frontend
  - added route for subcontractors
  - added test for subcontractors route

### April 8, 2022 DESCW-282, DESCW-278, DESCW-278, DESCW-281

- backend
  - added new migrations and seeds for subcontractors database table
  - added new migrations and seeds for suppliers database table
  - API
    - added backend API for suppliers
    - added tests for suppliers API
    - added backend API for subcontractors
    - added tests for subcontractors API

### April 5, 2022 DESCW-234

- backend
  - added backend API for contacts
  - added tests for contacts API

### April 1, 2022 DESCW-269

- added functionality that auto creates API's

### March 24, 2022 DESCW-233

- added new migrations and seeds for contacts database table

### March 11, 2022 DESCW-201

- fixes to make `docker compose up` work with (co)lima.
  - this change moves the database storage volume inside the VM, so your database will be blank; don't forget to:
    - `docker compose exec backend npx knex migrate:latest`
    - `docker compose exec backend npx knex seed:run`

### February 1, 2022 WD-3678

- frontend
  - added new table component from MUI
  - added contacts component that leverages the table component

### January 18, 2022 WD-3772

- backend
  - added new migrations and seeds for roles, user_roles, role_capabilities, and capabilities tables
  - added resolution of capabilities via database.

### January 17, 2022 WD-3815 part 4

- backend
  - various small changes to please the linter in preparation for enabling backend linting check github action.

### January 14, 2022 WD-3774

- backend
  - added user role checking for the user controller.
  - updated tests.
- removed frontend/.env file and consolidated .gitignore

### January 14, 2022 WD-3815 part 3

- backend
  - added logging for when connected to database, but the schema is wrong
- openshift
  - api
    - attempt a database migration to the latest migration on startup
  - templates: a build automation fix
- github workflows
  - fix overlooked item: don't rebuild containers on non-code file changes
- local dev environment
  - fix overlooked item: don't copy new transients into container builds

### January 12, 2022 WD-3815 part 2

- backend
  - added info to log about database being connected to
- openshift
  - permit api to connect to the database container
  - various cleanups

### January 12, 2022 WD-3691

- add material UI, including theming, icons
- add users table and related components

### January 11, 2022 WD-3815 part 2

- backend
  - added secretfile support for openshift database password
  - auth fix
  - autodeploy fix
- openshift
  - removed postgres alpine image from imagestream; alpine won't work for postgres on openshift without needless suffering. we will probably use hosted postgres eventually.
  - added configmap for keycloak endpoint, and database config parameters
  - changed backend deploy to use database and keycloak params
- other
  - deduplicated parameters in docker-compose.yml
  - migrated docker web directory to the docker directory to clean up the root

### January 11, 2022 WD-3815

- backend
  - added unified logger (facilities/logging.js)
    - set environment variable NODE_ENV to 'production' when deploying to production
    - uses pino library for logging in the whole app (fastify uses it, and it is pretty slick)
      - there is one logger instance, with the option to use child logger instances
        - conveniently group log entries by file/role/request
        - usage: `const log = require('../facilities/logging.js')(module.filename);` at the top of your file that needs logging
          - the `module.filename` makes a new child logger for you that will group all log messages in that file for you
          - use `log.child({ subcomponent: 'someUniqueStringYouLike' })` to make a sub-child log if you need. perhaps for logging individual requests/sessions.
    - updated fastify to use new logger
    - updated database to use new logger
  - moved database auto-deploy logic to a more appropriate spot (startup, not every db check)
  - cleanup server.js: moved shutdown handlers into daemon.js
  - restructuring
    - new directory: facilities: for full-on components, not just helpers
    - moved daemon.js to facilities directory
    - helpers/auth.js -> facilities/keycloak.js because keycloak items are what is in there, and it is more than helpers
    - helpers/server.js -> facilities/fastify.js because fastify configuration items are in there, and fastify is not just a helper

### January 10, 2022 WD-3771

- backend
  - included fastify-plugin to package.json
  - Added **getUserInfo** function to backend/src/helpers/auth.js -> gets user info from bearer token.
  - added .register(fastifyRoles) to backend/src/helpers/config.json -> register fastify roles plugin.
  - added plugin fastifyRoles
  - changed the logger default level to debug.
  - structure for payload is now {data: payload} instead of just payload, this allows other objects to be passed along with the data.
  - updated the validator logic for the data attribute.
  - added checkPermissions in user controller as a function that might be used for checking against capabilities, and allowed endpoints.

## January 10, 2022

- fix log volume issue for nginx reverse proxy
- flesh out readmes a bit more
- add user to DB on first login

### January 4, 2022

- update pullrequest template
- updated docker-compose file to include db variables
- frontend
  - fixed user endpoint user -> users
- backend
  - added knexfile.js to nodeman watch
