# GDX Agreements Tracker API

## Description

### This is the Application Programmer Interface for the entire GDX Agreements Tracker application.

- handles all CRUD operations for the application
- handles all authentication and authorization for the application
- handles all routing for the application

## Testing the API

### To run tests:

```shell
npm test
```

### To Write tests:

Many of the codebase's functions are asynchronous. In order to test them, you'll need to pass an "async" function as the second argument to `it()`. Within that function, you'll need to "await" the function you're testing. For example:

```javascript
it("tests an asynchronous function", async () => {
  const result = await functionToTest();
});
```

### To debug tests:

```shell
npm run test:debug
```

### To get test coverage:

```shell
npm run test:coverage
```

> References:
>
> Test Runner: [Jest](https://jestjs.io/)
>
> Test Utilities: [light-my-request](https://www.fastify.io/docs/latest/Guides/Testing/#benefits-of-using-fastifyinject)

## Database

### Connecting

#### To connect to a database GUI tool during development, use the following parameters:

- Server host: `localhost`
- Server port: `15432`
- Username: `postgres`
- Password: `postgres`

> If using the [docker-compose.yml](/docker-compose.yml) file to develop locally, you'll need to populate your database once the containers are up and running. Make sure to run these migrate and seed commands from within the [/backend](./) directory so that the knex command can find [/backend/knexfile.js](/backend/knexfile.js).

### Migrations

#### Create a new migration:

```shell
docker compose exec backend npx knex migrate:make <name_of_migration>
```

#### Migrate new Schema into the Database:

```shell
docker compose exec backend npx knex migrate:latest
```

```
docker compose exec backend npx knex migrate:rollback
```

### Seeds

#### Create new Seeds:

```shell
npx knex seed:make <name_of_seed>
```

#### Execute all seeds

```shell
npx knex seed:run
```

> #### Database migrations that target tables inside the `data` Schema may fail under some conditions:
>
> - if they require table structures to already exist before they can be run
> - example: `Schema.data.projects` migrations are run before the `data.projects` table has been created
>
> #### We need to guarantee that migrations on the `Schemas.data` schema run in this order:
>
> 1.  Migration of new Schema into database
> 2.  Migrations of new tables into the existing Schema
> 3.  Seeding those tables with data

# Environment Variables for the backend API [/backend/.env](/backend/.env) :

- The .env file is not committed to the repo, you will need to create your own .env file in the backend directory
- There is an up to date sample.env file here: [/backend/sample.env](/backend/sample.env)
- Refer here for the variable values here: [OpenShift config maps for acd38d-dev](https://console.apps.silver.devops.gov.bc.ca/k8s/ns/acd38d-dev/configmaps/0-gdx-agreements-tracker-api-env-config/yaml)
  > note: The JSON Web Key Set (keycloak ) endpoint is: [https://mykeycloak.com/realms/my-realm/protocol/openid-connect/certs](https://mykeycloak.com/realms/my-realm/protocol/openid-connect/certs)

## Create a New API Endpoints for existing Database Tables

### Run this script in the [/backend](/backend) directory:

```script
npm run createAPI
```

- The cli will prompt you for the {API Name}
- The cli generates the bare minimum files needed to create a new API endpoint:

```shell
backend/src/controllers/{API Name}
backend/src/models/{API Name}
backend/src/routes/{API Name}
backend/src/validators/{API Name}
```

- Once these files are created, you should have a (locally) working API at: [http://localhost:8080/{API NAME}](http://localhost:8080/APIName)
  > Note: if you run `createAPI` inside a remote docker container, your API URL may be different.

# Using of CDOGS and CHES APIs _inside_ the GDX Agreements Tracker API:

#### The GDX Agreements Tracker API uses the Common Components with this syntax:

```bash
  const cdogs = useCommonComponents("{cdogs|ches}");
  const result = cdogs.api.get('/{uri}', config={});
  const result = cdogs.api.post('/{uri}', body={}, config={});
```

# How Routes use Roles to control user Edit/Read Capabilities:

### The globally default Role for all Routes is `PMO-Manager-Edit-Capability`:

> see _verifyRole()_ in [./src/facilities/fastify.js](./src/facilities/fastify.js)

```JavaScript
  // This sets the DEFAULT Role for ALL Routes globally
  const routeRoleRequired = request.routeConfig?.role ?? "PMO-Manager-Edit-Capability";

   if (!roles.includes(routeRoleRequired)) {
    const message = `User doesn't have required role ${routeRoleRequired}`;
    request.log.warn(message);
    request.log.debug(roles);
    reply.code(401).send({ message });
  }
```

### To set a different Role for a Route, set the Role in `fastify.route({ config })`:

> see example route at [./src/routes/reports/genericRoute.js](./src/routes/reports/genericRoute.js)

```JavaScript
    fastify.route({
      method: "GET",
      url: `/report/:type`,
      schema: getReport,
      preHandler: controller.reportHandler,
      handler: controller.getReport,
      config: {
        role: "PMO-Reports-Capability",
      },
    });
```

#### The following Roles are available for use in Routes:

###### Composite roles - each composite role contains one or more individual Roles

- PMO-Admin-Role
- PMO-Manager-Role
- PMO-User-Role
- pmo-sys-admin (_deprecated - do not use_)

###### Individual Roles: they determine what a user can do:

- PMO-Admin-Edit-Capability
- PMO-Manager-Edit-Capability
- PMO-Manager-Read-Capability
- PMO-Reports-Capability

---

---

### Troubleshooting

- coming soon!

## Folder structure

- coming soon!
