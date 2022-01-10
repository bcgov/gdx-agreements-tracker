# GDX Agreements Tracker API

## Description


## Testing

### Run

Test runner: [Jest](https://jestjs.io/)

Test utilities:
- [light-my-request](https://www.fastify.io/docs/latest/Guides/Testing/#benefits-of-using-fastifyinject)

To run tests, simply run `npm test`.

To debug, run `npm run test:debug`.

To get a test coverage report, run `npm run test:coverage`.

### Write
Many of the codebase's functions are asynchronous. In order to test them, you'll need to pass an "async" function as the second argument to `it()`. Within that function, you'll need to "await" the function you're testing. For example:

```
it("tests an asynchronous function", async () => {
    const result = await functionToTest();
});
```

## Database

To connect to a database GUI tool during development, use the following parameters:

- Server host: `localhost`
- Server port: `15432`
- Username: `postgres`
- Password: `postgres`

If using the docker-compose.yml file to develop locally, you'll need to populate your database once the containers are up and running. Make sure to run these migrate and seed commands from within the `backend` directory so that the knex command can find `knexfile.js`.

#### Migrations
* Create a new migration:
    * `docker compose exec backend npx knex migrate:make <name_of_migration>`
* Bring your database up to the changes in the latest migration
    * `docker compose exec backend npx knex migrate:latest`
* Undo the last migration (may end up with data loss)
    * `docker compose exec backend npx knex migrate:rollback`

#### Seeds
* Make a new seeder
    * `docker compose exec backend npx knex seed:make 01_users`
* Execute all seeds
    * `docker compose exec backend npx knex seed:run`

### The .env file settings
```JWKSURI= #The JSON Web Key Set (keycloak ) endpoint https://mykeycloak.com/realms/my-realm/protocol/openid-connect/certs```

### Folder structure
.content comming soon.