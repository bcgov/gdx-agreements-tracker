## Developer Changelog
**May 17, 2023 (DESCW-1148)**
- Backend
  - Added new backend script `npm run createReport` which creates all the required framework for reports.
  - Created Tab_10 report as a test
**May 16, 2023**

- Backend
  - add fiscal year to totals model
  - slightly refactor model/controller
- Frontend
  - fix typo in frontend component import
  - finish template for net recovery summary by quarter

**May 15, 2023**

- Backend
  - add model for net recovery summary by quarterly reports
  - add controller
  - add totals model as well for same report

**May 15, 2023**

- Frontend
  - fixed issue with projects table not rendering

**May 15, 2023**

- Frontend
  - Upgraded to react-router v6.11

**May 12, 2023 (DESCW-1102)**

- Backend

  - Updated model, validators for deliverables

- Frontend
  - Updated new Table component to be more reusable
  - Add hook useFormatTableData for formatting table data
  - Updated new Table with modal to be more reusable
  - Removed unused code
  - Updated deliverables section to use new tablewithmodal

**May 11, 2023 (DEWCW-1130)**

- bumped postgres version
- Fixed s2i build to use omit=dev
- Backend
  - removed n-readlines from devDevelopment (Backend)
  - removed sensitive information in logging

**May 10, 2023 (DESCW-1073)**

- Backend
  - enable pdf output
  - adjust model somewhat
  - structure model JSON to group rows by project_number
- Frontend
  - finish template
  - make fiscal year a required parameter
  - add try/catch block to alert users of cdogs timeout
  - remove change request reports from report list (DESCW-1076)

**May 8, 2023**

- Backend
  - Add model, controller, and route for multi-year changerequest summary report.

**May 5, 2023**

- Frontend
  - Upgraded to mui-x version 6
    **May 5, 2023 (DESCW-1128)**
- OpenShift
  - Created Kustomized deployments of ImageStreams and BuildConfigs
  - Updated node s2i for api, which now includes auto migrations and seeds (no longer require manual commands by devs)

**May 5, 2023 (DESCW-1129)**

- Backend
  - Updated packages dependencies
    **May 4, 2023 (DESCW-1128)**
    Upgrade node docker builds to 18.14

**May 4, 2023 (DESCW-1105)**

- Backend
  - restored docx reports for Individual Projects
    - project status (most recent) Tab_17
    - project budget Tab_14
    - project quarterly Tab_16
    - Project quarterly billing request Tab_15
  - refactored models for; Tab_14 - Tab_16
  - Added model/useDbTables - to store the table name and schema
  - Added model/report/useProject - to store common used functions.
- Frontend
  - fix typescript error

**May 3, 2023 fixed issue with duplicate clicks for dblocking mechanism**
| Backend |
| -------- |
fixed issue with duplicate clicks for dblocking mechanism

**May 3, 2023 db_lock migratino update**
| Backend |
| -------- |

- Added update migration update for db_lock table.
- Added debug for github actions

**May 3, 2023 (DESCW-1098)**

- Backend
  - updated report controllers for Individual Projects
- Frontend
  - updated route settings for Individual Projects

**May2, 2023 Added DbLock to more sections**
**May 2, 2023 (DESCW-1097)**

- Backend
  - updated Tab_18 controller and model
  - created a project.js model for common project model queries
- Frontend
  - Updated pointer of Individual Project Reports > Status Summary to point to Tab_18

**April 29, 2023 SQL injection prevention patch**
| Backend || Frontend |
| -------- |

- Added dblock to project contacts section.
- Added dblock to project agreements section.

**April 29, 2023 SQL injection prevention patch**
| Backend |
| -------- |

- updated model for db_lock to use knex instead of raw to help prevent SQL injection.

**April 28, 2023 (DESCW-1041) DB Locking Refactor Final**
| Frontend |
| -------- |

- Form render is now more simplified. Now instead of showing a lock when the section is locked, it shows a read form. The way to determine if the section is locked is to click the edit button which will query for lock information.
- updated useRenderTableCell to follow React best practices.
- Updated project page to use table component from tablewithmodal as it doesn't need a modal
- Temp. disabled table with modal functionality.
- Added new hook for handling form data. (useFormData)
- Made useFormLock for simplified and updated type definitions.
- removed unnecessary async from useFormSubmit
- changed "fields" config files to be called "formFields"
- updated project details section to handle more functionality for efficiency elsewhere.

| Backend |
| ------- |

- Made db_lock controller more efficient. Now it handles everything from checking lock, lock owner and adding locks all in one function.
- Removed fastifyRowLockCheck and changed it to send back the payload now only. It is now called fastifyPayload.
- Cleaned up the db_lock model to be more efficient and easier to read.
- Changed all db_lock routes to be posts to allow for passing parameters. Although all routes use the POST method, the model of those routes add, remove, and get respectively.
- Removed old db_lock validation from common validation schema
- Updated projects validator to check for correct data and allow for null values where necessary.

---

**April 21, 2023 (DESCW-1041) DB Locking Mech pt.4**
| Frontend |
| -------- |

- Temporarily removed lint check for unused variables.
- Added a temporary dummy test to allow tests to pass in github while we rework old tests.
- Added FormRenderer component to allow for easier implementation of dblock
- Broke out the notification snackbar into it's own component reusablilty
- Broke out form buttons into their own component to allow for more reusablilty
- Create new Input form which will eventually replace edit and create for component
- useDBLockRender will go away soon so I removed the handleform type function
- Updated use form submit to be more efficient. I also had to add some temporary measures to allow for no errors. These will be resolved in the next PR
- Added useSnackbar hook to alllow for the snackbar functionality to be broken out and reused.
- Added a ternary to the project details section that added a loader if there is no data yet
- Added new reusable dblock and form functionality to the project registration section
- Added more type definitions to types.d.ts

---

**April 19, 2023 (DESCW-1041) DB Locking Mech pt.3**
| Frontend |
| -------- |

- Added reusbale DB Lock functionality
- Applied reusbale DB Lock functionality to section "Projects/Project/ProjectRegistrationSection"

---

**April 18, 2023 (DESCW-1041) DB Locking Mech pt.2**
| Frontend |
| -------- |

- Starting restructure of frontend tables to help with readabliltiy and performance.
- Temp disabled frontend tests because of restructure.

---

**April 12, 2023 (DESCW-1008) Made backend more efficient for role handling**
| Backend |
| -------- |

- Removed Fastify plugin "fasify roles"

---

**April 6, 2023 (DESCW-1008) Added keycloak roles and capabilities to controller hook**
| Backend |
| -------- |

- Updated controllers to use new userRquires function
- Added keycloak roles and capabilities to useController hook
- Updated frontend to use keycloak roles and capabilities

---

**April 5, 2023 (DESCW-1008) fix logon bug**
| Frontend |
| -------- |

- Changed the frontend Authorized routes to use keycloak roles over the postgresql

---

**MAR 31, 2023 (DESCW-405) DB Locking Mechanism**
| IMPORTANT! |
| --- |

- Make sure to run seeds: 01_capabilities and 02_role_capabilities.

  - `npx knex seed:run –specific “01_capabilities.js`
  - `npx knex seed:run –specific “02_role_capabilities.js`

- Make sure to run migration latest:
  - `npx knex migrate:latest `

| Backend |
| ------- |

- Added database locking mechanism(db_lock) - Added controller, routes, and models for db_lock
  - Added new capabilities for admins.
    - db_lock_add_one
    - db_lock_read_all
    - db_lock_delete_one
  - Updated error message handling for failed Query function in useController hook
  - Added new Fastify plugin for checking role check on a section: fastifyRowLockCheck
  - Updated common_schema validator to include new property “db_row_lock”

| Frontend |
| -------- |

- Added new reusable button for running db locking functions, taking over lock function, - and putting form in edit mode.
- Updated hook index to include new and old hooks for import efficiency.
- Added new lock for handling form section locking(db_lock) called “useFormLock”
  - Updated project registration section to use new form locking(db_lock) mechanism.
- Added a more in-depth switch handler for rendering the project registration section (will need to be made more efficient in future tickets)

---

### MAR 20, 2023 (DESCW-964) PA Fiscal Template and Query

- Backend
  - Created route, controller, and model for pa by fiscal
- Frontend
  - Added Project Registered Reports by fiscal and report template (initial template)

### MAR 16, 2023 (DESCW-966) PA ministry template

- Backend
  - finalized the template

### MAR 15, 2023 (DESCW-967) PA ministry queries

- Backend
  - Created route, controller, and model for pa by ministry
- Frontend
  - Added Project Registered Reports functionality and report template (initial template)

### MAR 15, 2023 (DESCW-1002) add migration

- Backend
  - Created migration for new project by ministry view

### MAR 13, 2023 (DESCW-970) Project registered by date/year

- Backend
  - Created route, controller, and model for Project registered by date/year
- Frontend
  - Added Project Registered Reports functionality and report template.

### MAR 1, 2023 (DESCW-838) Project dashboard by Portfolio

- Backend
  - Created route, controller, and model for Divisional Projects
- Frontend
  - Added Project Dashboard Reports functionality and report template.

### Mar 1, 2023 (DESCW-697) Add search to tables

- Frontend
  - Added Search function to table component

### Feb 28, 2023 (DESCW-930) Divisional Project Reports

- Backend
  - Created route, controller, and model for Divisional Projects
- Frontend
  - Added Divisional Projects Reports functionality and report template.

### Feb 21, 2023 (DESCW-833) Update Secrets fro CDOGS and CHES

- Backend
  - Updated secrets for ches and cdogs to most recent version
  - Updated code to account for unique secrets and id's for cdogs and ches

### Feb 17, 2023 (DESCW-692) active-projects-by-portfolio

- Backend
  - Added template and updated it
  - Fixed DESCW-839 template which had unused carbone template statement
  - updated model to pull needed totals
  - updated controller to shape model output for templating engine
  - installed lodash in backend
  - Updated node version to "=18.14.1"
- Frontend
  - Updated node version to "=18.14.1"
- GITHUB TESTS
  - Updated from 16.x/gallium to 18.x

### Feb 7, 2023 (DESCW-839) portfolio-status-rollup report query

- Backend
  - Added all blank templates for reports (xlxs, docx)
  - Added boilerplate controllers, models, routes for reports

### Feb 7, 2023 (DESCW-839) portfolio-status-rollup report query

- Backend
  - Updated route, controller, and model for project rollup report
  - separated utility functions into helper folder

### February 3, 2022 Helper functions for reports

- Backend
  - added loadTemplate, groupByProperty and getDocumentApiBody helpers

### December 16, 2022 (DESCW-686) Project deliverables section

- Backend

  - updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - updated picker options model.
  - Added project deliverables backend

- Frontend
  - Added project deliverable section

### December 6, 2022 (DESCW-733) Project budget section

- Backend
  - updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - updated picker options model.
- Frontend
  - Added project budget section

### December 6, 2022 (DESCW-689) Contract GDX Internal Coding

- Backend
  - Created controller, model, route, validators for Contract Internal Coding
- Frontend
  - Created Internal Coding page component and fields file
  - Fixed console errors due to incorrect usage of Grid component in GDXList

### December 6, 2022 (DESCW-733) Project Status Rollup Report

- Backend
  - Created route, controller, and model for project rollup report
- Frontend
  - Added Active Projects rollup to the list of json reports.

### December 6, 2022 (DESCW-690) Individual Contract Summary Report

- Backend
  - Created route, controller, and model for contract summary report
- Frontend
  - Added Active Projects Report to the list of json reports.
  - Small bug fix for a problem with accessing values inside parameter objects

### December 2, 2022 (DESCW-730) Project Lessons Learned Report

- Backend
  - Created route, controller, and model for Project Lessons Learned Report
  - Fixed bug in Project Dashboard report
  - Changed Report Controller groupByPortfolio() to generic groupByProperty()
- Frontend
  - Changed ReportSelect Component:
    - Handles required/optional fields
    - Handles route params vs. querystring params
    - Fixed hardcoded localhost url, now using UseAxios hook

### December 1, 2022 (DESCW-691) Divisional Active Projects Report

- Backend
  - Created route, controller, and model for Divisional Active Projects Report
- Frontend
  - Added Active Projects Report to the list of json reports.

### December 1, 2022 (DESCW-732) Project Dashboard Report

- Backend
  - Created route, controller function, and model function for Project Status Dashboard report
- Frontend
  - Changed ReportSelect component to temporarily allow downloading reports as json.
  - Fixed bug with multiselect input initial value.

### November 25, 2022 (DESCW-708) Projects Backend Reorg

- Backend
  - Reorganized backend for projects (Run npm i to install new dependencies)
  - Reorganized backend for reports
  - Reorganized backend for amendments
  - Reorganized backend for change_requests
  - Reorganized backend for client_coding

### November 22, 2022 (DESCW-726) Quarterly Review Report

- Backend
  - Added controller function, model functions, routes for Project Quarterly Review Report

### November 22, 2022 (DESCW-663) Project Status Section

- Frontend Backend
  - Added project Status Section

### November 22, 2022 (DESCW-658) Edit Cancel Button

- Frontend
  - Added cancel button to EditForms so user can return to ReadForm without page refresh

### November 18, 2022 (DESCW-725) Budget Summary Report

- Backend
  - Added controller, model and routes for Budget Summary Report
  - Changed report routes to use a common handler: getReport
  - Changed project status most recent and budget summary report to match new standard

### November 18, 2022 (DESCW-29) Contracts List Filters

- Frontend
  - Added initial filter state contracts list
  - Fixed bug in GDXModal causing close button not to close modal

### November 16, 2022 (DESCW-727) Project Quarterly Billing Request Report

- Backend
  - Added controller function, model functions, routes for Project Quarterly Billing Request Report

### November 10, 2022 (DESCW-720) Project Status Summary Report

- Backend
  - Added controller function, model functions, routes for Project Status Summary Report

### November 7, 2022 (DESCW-40) Projects List Filter

- Frontend
  - Committed package-lock file!
    - If frontend unit tests are failing you may need to run `npm ci`
  - Re-enabled table filtering and sorting
  - Added initialState prop to Table component to allow setting default filter values (projects status filter defaults to "active")

### November 2, 2022 (DESCW-633) Project Status Report

- Backend
  - Updated report routes
  - Created Template and updated the cdogs API query for Project Status (Most Recent)
  - Updated capabilities.
  - `npx knex seed:run --specific=01_capabilities.js`
  - Updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Added ability to export Project Status Report (Most Recent) as a pdf on the report page

### November 2, 2022 (DESCW-623) Project Contacts Section

- Backend
  - Created migration to add unique constraint to contact_project table
    - `npx knex migrate:latest`
  - Created controller, model, routes, and validators for project contacts
- Frontend
  - Created/implemented ProjectDetails/ContactSection page
  - Changed Select and Multiselect components to optionally use a fieldLabel given in editFields

### October 27, 2022 (DESCW-631) Added tests for frontend components

- Frontend
  - Added tests for TableComplete and all associated components

### October 25, 2022 (DESCW-617) Lint Cleanup

- Frontend
  - Fixed various lint warnings across frontend (mainly use of `any` type).

### October 21, 2022 (DESCW-662) Projects Client Coding Delete

- Frontend
  - Created DeleteButton and ConfirmationDialog components.
  - Added above components to FormHeader used in TableComplete modal.

### October 21, 2022 (DESCW-662) Projects Client Coding Section

- Backend
  - Added controller, model, routes, and validators for client coding.
- Frontend
  - Created ClientCoding page component and fields.
  - Fixed bug with GDXAccordion not allowing TableComplete as child.
  - Added button, capability checking, and request handling for delete requests to TableComplete and associated components.

### October 19, 2022 (DESCW-654) Invoice Resources/Deliverables

- Backend
  - Updated picker options seeds:
    - `npx knex seed:run --specific=08_picker_options.js`
  - Added controller, model, route, and validators for invoice_resources and invoice_deliverables.
  - Fixed bugs with picker_options model.
- Frontend
  - Added support for contract-specific picker options.
  - Added read/edit/add for invoice resources and invoice deliverables.

### October 18, 2022 (DESCW-625) Contract Deliverables Section

- Frontend

  - Added Deliverables page component
  - Added new BudgetDisplay component

- Backend
  - Added controller, model, route, validator for Deliverables

### October 17, 2022 (DESCW-638) Picker options update

- Backend
  - update picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - allowed for project id / contract id
- Frontend
  - client coding in billing now uses new picker options

### October 13, 2022 (DESCW-638) Picker options update

- Backend
  - updated picker options
  - `npx knex seed:run --specific=08_picker_options.js`
  - updated picker options model.
- Frontend
  - updated edit and new table to include pickerName attribute.

### October 12, 2022 (DESCW-659) Contract - Amendments table

- Backend
  - updated amendments validators and model
- Frontend
  - updated amendments component.

### October 12, 2022 (DESCW-660) Change Request table

- Backend
  - Updated capabilities.
    - `npx knex seed:run --specific=01_capabilities.js`
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - project controller/model
  - permission issues
- updated change request table list.

### October 11, 2022 (DESCW-611) Fastify Upgrade

- Backend
  - Upgraded Fastify and related packages to latest versions.
    - `npm i` from /backend directory
  - Updated all validators (serializer now required to run in strict mode).
- Frontend
  - Changed amendments page to use TableComplete component.

### October 6, 2022 (DESCW-657)

- fixed login loading issues
- converted change request to tableComplete
- updated Table defaults
- Removed Admin test, which was testing only for Admin title.

### October 6, 2022 (DESCW-656) Table Lists

- Backend
  - updated models for getAll, and validators to improve Table lists
  - updated roles
    - `npx knex seed:run --specific=02_role_capabilities.js`
  - Frontend
    - Added columnWidths property to allow tables to have different flex sizes besides 1
    - updated Projects and Contract lists.
    - updated amdin form lists.

### October 6, 2022 (DESCW-624) Contract Resources Roles

- Backend
  - Created migration to drop user_roles table and removed all references to it in code (03_users_roles seed, users model, facilities/keycloak).
    - `npx knex migrate:latest`
- Frontend
  - Updated routes to allow Manager role to access routes (only allowed Administrator before).

### October 5, 2022 (DESCW-624) Contract Resources

- Backend
  - Created contract resources controller, model, routes, validators.
  - Added getAll/getOne/update/add functionality to above.
  - Change to picker options:
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Added Contracts/Resources page component.
  - Created TableTotalFooter to allow tables to display column totals in footer.

### October 4, 2022 (DESCW-625) Contract Deliverables

- Frontend
  - added new component for rendering table-like data

### October 3, 2022 (DESCW-627) Update admin forms to use new component TableData

- Frontend
  - Updated admin forms to use new component TableComplete (formally TableData)

### September 28, 2022 (DESCW-653) Contracts Add/Update

- Backend
  - Created invoice details controller, model, routes, validators.
  - Added add/update functionality for invoices controller, model, routes, validators.
  - Change to picker options:
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Created InvoiceProcessing/Deliverables and /Resources page components.
  - Added read/edit form fields for invoices, deliverables, resources components.
  - Added logic for changing which deliverables/resources are displayed based on invoice table row selected.

### September 23, 2022 (DESCW-616) Contracts Add/Update

- Backend
  - Added add/update functionality to Contracts route, validator, model.
  - Created models/useModel to provide reusable model functions (diffInsert() for now).
  - Small change to picker options:
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Refactored Contracts pages (separated Contract Details from Invoice Processing).
  - Created reusable ReadEditPage component to be used for single-item read/edit form pages (Contract Details, Project Registration for example).

### September 23, 2022 (DESCW-614) Billing

- Frontend
  - updating TableData component for updates, has new prop for url's
  - fixed not authorized when browser refresh
  - finishing up Project Billing section

### September 23, 2022 (DESCW-483) Lessons Learned Table

- Backend
  - Created routes, controllers, models, validators for Lessons Learned
  - Added picker options for Lessons Learned
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Created Lessons Learned Section Page Component
  - Added routing for above

### September 21, 2022 (DESCW-615) Contracts Frontend

- Backend
  - Created routes, controllers, models, validators for Contract and Contract Invoices (only GETs)
  - Added picker options for Contract form
    - `npx knex seed:run --specific=08_picker_options.js`
- Frontend
  - Created ContractDetailsSection and InvoiceSection page components
  - Added routing for above
  - Created GDXMultiselect reusable field component (allows multiple values to be selected in select input)
  - Added support for "readonly" form inputs shown in some mockups

### September 21, 2022 ([DESCW-590](https://apps.itsm.gov.bc.ca/jira/browse/DESCW-590))

- Bump knex version to 2.0.3
- Backend
  - Update role capabilities and users roles seeds to reflect that operations now always return an object: [Upgrading knex to version 1.0.0](https://github.com/knex/knex/blob/master/UPGRADING.md#upgrading-to-version-100)

### September 20, 2022 (DESCW-613) (DESCW-586) CDOGS CHES

- Backend
  - CDOGS and CHES functionality
  - Files added:
    - backend/src/controllers/useCommonComponents/index.js
    - backend/src/controllers/cdogs.js
    - backend/src/controllers/ches.js
    - backend/src/routes/ches.js
    - backend/src/routes/cdogs.js
- Frontend
  - Fix model edit button not showing up, with convert to new TableData component

### September 16, 2022 (DESCW-566) Role Base Routing

- Backend
  - Added Api to get current user
- Frontend
  - Added role base routing
  - Add API error handling

### September 15, 2022 (DESCW-568)(DESCW-574) Glossary

- Backend
  - Added fastify-markdown plugin to package.json
    - `npm i`
  - Created glossary route, controller, validator
  - Created glossary markdown file
- Frontend
  - Created Glossary page component and routing
  - Adding role check
  - Updating TableData

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
