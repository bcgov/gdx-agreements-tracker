## Developer Changelog

### September 15, 2022 (DESCW-568) Glossary
- Backend
  - Added fastify-markdown plugin to package.json
    - `npm i`
  - Created glossary route, controller, validator
  - Created glossary markdown file
- Frontend
  - Created Glossary page component and routing

### September 14, 2022 (DESCW-574)
- Backend
  - initial journal voucher controller/model/route/validator
  - optimized picklist option code
  - removed view formatted_picker_options and replaced model with select statement
    - `npx knex migrate:latest`
  - updated pickerlist options seed 
    - `npx knex seed:run --specific=08_picker_options.js`
- frontend
  - voucher table.
  - Created a reusable component for TableData

### September 14, 2022 (DESCW-566) Role Base Routing
- Backend 
  - Added Api to get current user
- Frontend
  - Added role base routing

### Septermber 13, 2022 (DESCW-565) Backend capabilities
- Backend 
  - Added pino prettier `npm i` to install which adds some formatted backend output logs
  - update capabilities seeds
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - Updated controller permissions

### September 13, 2022 (DESCW-567) Backend Route Tests Complete
- Backend
  - Added unit tests for all remaining routes

### September 9, 2022 (DESCW-567) Backend Route Tests
- Backend
  - Created common route testing suite for all route unit tests to use
  - Updated users route tests

### September 9, 2022 (DESCW-564) Controller Optimization
- Backend
  - Updated Database connection file to be more efficient
  - Updated all models to use new database connection functionality

### September 8, 2022 (DESCW-563) Route Validators
- Backend
  - Added input validation and response serialization for all other routes

### September 7, 2022 (DESCW-563) Route Validators
- Backend
  - Added fluent-json-schema dependency to package.json (need to `run npm install`)
  - Created validators/common_schema to provide helpers for validators
  - Added input validation and response serialization for change_request, projects, contacts, users routes

### August 31, 2022 (DESCW-587) Project Agreements
- Backend
  - Added input validation for agreements fields
- Frontend
  - Added missing agreements fields for read/edit forms
  - Moved logic for determining user capability into details component, now passed into children

### August 31, 2022 (DESCW-572) Project Close Out Notify
- Backend
  - Added controller and route for project close out notify function
- Frontend
  - Changed Notify component to handle checkbox value changes and make API request

### August 31, 2022 (DESCW-484) Project Reports
- Backend
  - Added controllers, models, and routes for project report queries

### August 30, 2022 (DESCW-561) Project CloseOut ChipNav
- Frontend
  - Updated ChipNav component to allow justifying chips right

### August 29, 2022 (DESCW-571) Project Registration
- Backend
  - Added `fiscal` picker option
  - Updated Projects controller getOne() to return contracts associated with project
- Frontend
  - Updated Project Registration page to use ReadForm and EditForm components, view/edit now working
  - Updated Project Agreements page to use ReadForm and EditForm components
- Require to run picker seeds
  - `npx knex seed:run --specific=08_picker_options.js`

### August 25, 2022 (DESCW-562) Project Close Out
- Backend
  - Created migration for contacts picker, seeds for multiple pickers
  - Refactored Projects controller to use admin_form functions
  - Add Projects route/controller/model functions for getting close out data
- Frontend
  - Fixed bug in hooks/useFormSubmit preventing form submit when given a null select field value
  - Added user capability check in Close Out page (determines whether user can edit)
- Require to run migrations and seeds
  - `npx knex migrate:latest`
  - `npx knex seed:run --specific=08_picker_options.js`

### August 25, 2022 (DESCW-537) accordion test
- Frontend
  - added according test.

### August 25, 2022 (DESCW-556) capabilities
- Backend
  - updated roles and cababilities
  - need to run seeds
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - updated plugin hook for checking permissions
  - updated users validators
  - fix for null user role_id

### August,24 2022 (DESCW-560)
- Frontend
  - Restructured and improved ministries and subcontractors page
  - Added test for ministries page component
- Backend
  - Added roles for viewing, editing and adding ministries.
  - Added tests for subcontractors
  - Added tests for minsitries

### August,24 2022 (DESCW-559)

- Frontend

  - Added test for amendments page component
  - Added amendments page component
  - Added amendments view, edit and add modal forms

- Backend
  - Added controller, model, route, validator for amendments
  - Added two capabilities "amendments_read_all",
    "amendments_read_mine",
  - Added amendments READ, POST and PUT functionality

### August 24, 2022 (DESCW-558) Project Close Out Frontend

- Frontend
  - Created Project/CloseOut and Project/CloseOut/Notify components
  - Added routing and navigation

### August 24, 2022 (DESCW-556) Permissions

- Backend
  - update realm capabilities logic.
  - removed unused capability helper (uses db)
  - optimize some controller code controllers/admin_form.js for controllers/user.js

### August 23, 2022 (DESCW-555) User Form

- Frontend
  - Added view, edit and create forms for User
- Backend
  - Update model and controllers for user
  - Created migration to add role_id in users table
  - Created migration to add user_roles in picklist_options
  - Seeded picklist.
- require to run migrations and seeds
  - `npx knex migrate:latest`
  - `npx knex seed:run --specific=08_picker_options.js`

### August 23, 2022 (DESCW-554) Ministries Form

- Frontend
  - Added view, edit and create forms for ministries.
  - Added new reusable form input type for checkboxes.
- Backend
  - Added MVC and routes for ministries.

### August 23, 2022 (DESCW-548) Contacts Form

- Frontend
  - Admin/Contacts: Fixed bugs with ministry select input
  - Added IOption interface to Types for use with Select input options ({value, label} objects)
- Backend
  - Improved Contacts model to handle ministry data
  - Added input validation to Contacts update/add requests

### August 23, 2022 (DESCW-553) Resources Test

- Frontend
  - simple resource test to test component
- Backend
  - permission test for correct/incorrect roles.

### August 22, 2022 (DESCW-549) Github actions

- Frontend
  - Added form for creating a new subcontractor.
- Backend
  - Added MVC and routes for adding a new subcontractor.
  - Added 'subcontractors_read_mine' test.

### August 22, 2022 (DESCW-553) Github actions

- Fixed github actions with linters/tests being skipped

### August 22, 2022 (DESCW-543) Resource Form

- Frontend
  - Admin - Resources (view, edit, and add)
- Backend
  - models, controllers and routes to support admin resources.
  - Migrations need to be run
  - `npx knex migrate:latest`
  - seeds need to be re run
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`

### August 22, 2022 (DESCW-550)(DESCW-541)

- Frontend

  - Added view, edit and update forms and functionality for suppliers
  - Fixed bug with modal headers not being correct
  - Fixed snackbar message not showing correctly

- Backend
  - Changed Node version requirement from 16.16 to 16.x
  - Added controller, model, route, validator for supplier
  - Added three new capabilities to seeds, "suppliers_update_all", "suppliers_read_all", "suppliers_update_mine",

### August 19, 2022 (DESCW-547)

- Frontend
  - Improved subcontractor view and edit forms.
  - Removed ability to view and edit subcontractor id.
- Backend
  - Added subcontractors MVC and ability to edit in modal.
  - Made adding roles more efficient.

### August 18, 2022 (DESCW-539)

- Frontend
  - Contacts view/edit modal
- Backend
  - Added controller, model, and routes getOne(), updateOne(), addOne() for Contacts

### August 18, 2022 (DESCW-457)

- Frontend
  - Subcontractors view modal

### August 17, 2022 (DESCW-457)

- Frontend
  - Added Reports navigation and report selector

### August 17, 2020 (DESCW-538)

- Frontend
  - Resources view modal
- Backend

  - Added controller, model, route, validator for project status summary

  - Requires
    - `npx knex --specific=01_capabilities.js seed:run`
    - `npx knex --specific=02_role_capabilities.js seed:run`
  - Updated Resources (controller, model)
  - Added controller, model, route, validator for project status summary

### August 16, 2022 (DESCW-505)

- Frontend
- Added test for GDX Accordion

### August 12, 2022 (DESCW-67)(DESCW-536)

- Frontend
- Added react router for contracts
- Added link for contracts to sidebar menu and connected it to react router
- Added contracts page with
- connected contracts MUI table to contracts API to use real data
- Resolved old linter warnings
- Add Modal functionality to Suppliers page

- Backend
  - Added controller, model, route, validator for contracts
  - Added new capabilities "contracts_read_mine", "contracts_read_all"

### August 8, 2022 (DESCW-420)

- Frontend
- Created new reusable component called "CreatForm"
- Fixed layout issues on all forms
- Added new Form Type state which allows for switching between edit and new forms types
- Added test for CreateForm component
- Fixed any type errors for in-scope components
- Added new "Post" and "Edit" functions to useFormSubmit hook
- Added n-readlines as prod dependency

- Backend
  - Added "addOne" function - used for posting a new Change Request(CR)
  - Added new capability "change_request_add_one"

### July 28, 2022 (DESCW-419)

- Frontend

  - Created reusable edit form component
  - Updated variables in reusable components to be more readable
  - Added check role exists hook
  - Added check role condition for cr form edit button
  - Created reusable read form
  - Created useFormSubmit hook for handling form submissions
  - Added more type definitions to types.d.ts

- Backend
  - Added change-request(cr) update function to controller
  - Updated variables to be more clear for projects controller
  - Added two capabilities "change_request_update_one" and "change_request_update_all"
  - Added new "generic" grouping for picker options
  - Added filters to cr model
  - Added cr id in response for cr validator

### July 12, 2022 (DESCW-484)

- Backend
  - Added controller, model, route, validator for project status report
  - Added a new capability to seeds: "report_read_mine"

### July 6, 2022 (DESCW-455)

- Backend
  - add development api bypass

### July 5, 2022 (DESCW-417)

- Frontend
  - Added ChipNav component for forms
  - GDXSelect uses MUI Skeleton as a placeholder instead of a loader
  - Made useFormatTableData hook more reusable
  - Added change request table section for each project
  - Reorganized project file directory
  - Converted conditional rendering to use switch statements
- Backend
  - Changed Node version requirement from 16.15 to 16.15.1
  - Added controller, model, route, validator for change requests
  - Added two new capabilities to seeds, "change_request_read_all" "change_request_read_mine"
  - Updated react-router-dom from 6.2.1 to 6.3

### June 29, 2022 (DESCW-449)

- Openshift
  - updated nginx deploy to handle keycloak variables for app
- Frontend
  - updated keycloak to use variables, instead of hardcoded
  - updated ReactKeycloakProvider to have initial options.

### June 28, 2022 (DESCW-409)

- Openshift
  - add whitelist annotation to app dev route

### June 28, 2022 (DESCW-448)

- Update local dev for backend.

### June 28, 2022 (DESCW-444)

- update nginx docker file to specific version of nginx
- update api config to point to new postgres service

### June 28, 2022 DESCW-416

- Frontend
  - Added Agreements sections to project form

### June 27, 2022

- Frontend, Backend
  - Added functionality for updating project registration data in projects DB

### June 23, 2022 DESCW-444

- OpenShift
  - restructured OpenShift images and BuildConfigs
  - Update README's
- Github actions
  - minor naming changes, and re-point to new builds.

### June 23, 2022

- Frontend
  - Added https cert creation and enforcement

### June 20, 2022 DESCW-402 DESCW-403

- Frontend
  - added project registration structure

### June 16, 2022 DESCW-392

- frontend
  - move dockerfile to openshift/templates/app folder
  - added inline dockerfile to build
- backend
  - move dockerfile to openshift/templates/api folder
  - added inline dockerfile to build

### June 15, 2022 DESCW-394

- Frontend / backend
  - added Node version restriction rules

### June 14, 2022 DESCW-410

- Frontend
  - added accordion for project sections

### June 3, 2022 DESCW-402 DESCW-403

- Frontend
  - added project registration structure

### June 20, 2022 DESCW-402 DESCW-403

- Frontend
  - added project registration structure

### June 3, 2022 DESCW-402 DESCW-403

- backend
  - new migration and seeds for ministries and layout tables
  - new api for ministries and layout tables
  - added filter for default project table data
- Frontend
  - added react query to all Admin data

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
