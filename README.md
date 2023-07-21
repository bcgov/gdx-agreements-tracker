![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)

# GDX Agreements Tracker

NOTE: To host this application in docker for local development, please see file here: [Docker Hosting GDX Agreements Tracker](/documentation/README.md)

## OpenShift
For deploying to OpenShift please reference the [OpenShift Readme](./openshift/templates/README.md)

Below is the current preferred method for development. (ao. 03/25/2022)<br><br>

## Prerequisites

The following prerequisites are required for this application to function correctly:

*   PostgreSQL
*   NPM (latest stable version)
*   Colima or Docker desktop

## Installation

1.  Clone the repo to your local development system:
    ```
    git clone https://github.com/bcgov/gdx-agreements-tracker.git
    ```
---

2. Install dependencies for the backend.
    * Open a new terminal in the directory of the repo you just cloned locally and run the following commands: 
        ```
        cd /backend
        npm i
        ```
---

3. Now install dependencies for the frontend.
    * Open a new terminal in the directory of the repo you just cloned locally and run the following commands: 
        ```
        cd /frontend
        yarn i
        ```
---

4. Run the seeders and migrations for the local development database.
    * To bring your local database up to the latest version run:
    ```
    npx knex migrate:latest
    npx knex seed:run
    ```
---

5. Update the .env file in the backend directory ([backend .env](/backend/.env)) with the following:
    * If you don't what JWKSURI should be, contact your site administrator

   ```
    NODE_ENV=development
    JWKSURI=https://example.com/auth/realms/aaoozhcp/protocol/openid-connect/certs
    POSTGRES_PORT=15432
    POSTGRES_HOST=localhost
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DATABASE=gat_db
    DATABASE_AUTO_DEPLOY=1
   ```
  ---

## Start Servers
### Adding HTTPS cert for local development
This step is required to run the app as the npm start command requires the app to run locally with https.  This only has to be run on intial setup.

1. install the following with brew through terminal
    #### Install mkcert tool
    brew install mkcert

    #### Install nss (only needed if you use Firefox)
    brew install nss

    #### Setup mkcert on your machine (creates a CA)
    mkcert -install

2. From the root of your gdx-agreement-tracker frontend, you should now run:
    #### Create .cert directory if it doesn't exist
    mkdir -p .cert

    #### Generate the certificate (ran from the root of the frontend)
    mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"


1. Start the Database container in docker
    *   Open a terminal in the root of the project directory and run:
         ```
         docker compose start db
         ```

2. Start the backend and frontend
    *   Open a terminal in the /frontend directory and run:
        ```
        npm run start
        ```
    *   Open a terminal in the /backend directory and run:
         ```
         npm run start
         ```

3. In your browser, visit localhost:3000 to access the site and login


### Congratulations, you can now start developing!

## Setting up and updating database migrations and seeds
### Local environment
#### 1. Stop the app and api containers
1. Stop the frontend process if it is running.
2. Stop the backend process if it is running.
3. If the database container is not running, start it:
```bash
docker-compose up db
```
#### 2. Reset the pmo database
1. In pgAdmin, right click the pmo database and drop/delete it.
2. In pgAdmin, right click your pmo server and create a new database with the same name as the old pmo database.
#### 3. Get updated migrations and seeds and copy them into your project folder.
1. See the [readme](https://apps.itsm.gov.bc.ca/bitbucket/projects/DES/repos/pmo-mssql-converter/browse/README.md?useDefaultHandler=true#50) for instructions.
   * Make sure to also follow the npx. steps for running the migrations and seeders.
#### 4. Restart processes
1. Restart the backend process:
```bash
cd ../gdx-agreements-tracker/backend
npm run start
```
2. Restart the frontend process:
```bash
cd ../gdx-agreements-tracker/frontend
npm run start
```
### OpenShift environment
**Note:** All OpenShift steps will have to be reproduced on ***every*** namespace that needs to be updated.
#### 1. Stop the app and api containers
1. Set the gdx-agreements-tracker-api deployment pod count to 0.
2. Set the gdx-agreements-tracker-app deployment pod count to 0.
#### 2. Reset the pmo database
1. From gdx-agreements-tracker-postgres pod terminal, run:
```postgres
psql -U <postgres_username>
DROP DATABASE <database_name>;
CREATE DATABASE <database_name>;
```

#### 3. Get updated migrations and seeds
1. See the [readme](https://apps.itsm.gov.bc.ca/bitbucket/projects/DES/repos/pmo-mssql-converter/browse/README.md?useDefaultHandler=true#50) for instructions.
#### 4. Update the .dat files for migrations and seeds
1. Set the gdx-agreements-tracker-api deployment pod count to 1.
2. If the [oc client](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html) is not installed locally, install it:
```bash
brew install openshift-cli
```
3. From a terminal with the oc client installed, log in by copying the login command from silver cluster, eg:
```
oc login --token=<your_token_hash> --server=<server_address>
```
4. Copy the contents of the updated migrations and production seeds folders to the gdx-agreements-tracker-api pod:
```bash
oc cp <local_updated_migrations_folder>/. <namespace><pod_name>:<opt/api-root/src/database/migrations>

oc cp <local_updated_production_seeds_folder>/. <namespace><pod_name>:<opt/api-root/src/database/production_seeds>
```

#### 5. Run migrations and seeders
1. From the gdx-agreements-tracker-api pod terminal, run:
```bash
cd /opt/app-root
npx knex migrate:latest
npx knex seed:run
```
#### 6. Restart the app process
1. Set the gdx-agreements-tracker-app deployment pod count to 1.
