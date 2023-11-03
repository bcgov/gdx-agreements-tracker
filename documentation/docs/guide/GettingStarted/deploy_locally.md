# Deploying Using Node and Docker

## Prerequisite 
All development setup is done with a Mac OS 

- Requirements:
  - Node (V18)
  - Docker (Desktop, Ranger, Colima)
  - PGAdmin (not required but helpful)

Install brew if not already installed.

- Install mkcert tool for creating certificates ```brew install mkcert```
- Only if using **Firefox**, Install nss```brew install nss```
- Create a self signed Certificate Authority ```mkcert -install```

## Setup
### Download Source Code

```git clone https://github.com/bcgov/gdx-agreements-tracker.git```


### Setup Certificates
**All bash commands are assumed from root of repository** ```./gdx-agreements-tracker```
A self signed certificate is required for local development deployments.
- in a terminal window go to the GDX agreements tracker repository ```cd gdx-agreements-tracker```
- create a ```.cert``` directory in the frontend folder if not already created ```mkdir -p ./frontend/.cert```
  - This is where your certificates will be saved.
  - This folder is also excluded from the repository via the .gitignore file.
- create a key and cert file ```mkcert -key-file ./frontend/.cert/key.pem -cert-file ./frontend/.cert/cert.pem "localhost"```


## Setup and Deploy Database
The database is a postgres database, which needs to be deployed via docker compose.
- Add a `./backend/.env` by either creating a new file or using [sample.env](https://github.com/bcgov/gdx-agreements-tracker/blob/development/backend/sample.env) as the template
- Update/add all database [environment variables]
```sh 
#/backend/.env
...
POSTGRES_PORT=15432
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=gat_db
DATABASE_AUTO_DEPLOY=1
...
```
- Start the database by running the docker compose command ```cd ./backend && docker compose up --build```
  - if this fails you can manually build the image ```docker build -t backend-db ./openshift/templates/images/postgres/``` and then run ```cd ./backend && docker compose up```


## Backend Setup and Deploy
- Create/update an .env for the backend

```sh
# Json web token uri
JWKSURI=https://example.com/auth/realms/aaoozhcp/protocol/openid-connect/certs
# Node env
NODE_ENV=development
# Database
POSTGRES_PORT=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
DATABASE_AUTO_DEPLOY=1
# Common Component Token host/path used for CHES and CDOGS
COMMON_COMPONENT_TOKEN_HOST=
COMMON_COMPONENT_TOKEN_PATH=
# Common Hosted Documentation Generation API
CDOGS_CLIENT_ID=
CDOGS_SECRET=
COMMON_COMPONENT_CDOGS_API=
# Common Hosted Email API
CHES_CLIENT_ID=
CHES_SECRET=
COMMON_COMPONENT_CHES_API=
# Single Sign on API
SINGLE_SIGN_ON_API_TOKEN_HOST=
SINGLE_SIGN_ON_API_TOKEN_PATH=
SINGLE_SIGN_ON_API_CLIENT_ID=
SINGLE_SIGN_ON_CLIENT_SECRET=
SINGLE_SIGN_ON_API=
SINGLE_SIGN_ON_INTEGRATION_ID=
SINGLE_SIGN_ON_ENVIRONMENT=
# Deprecated 
COMMON_COMPONENT_CLIENT_ID=
COMMON_COMPONENT_SECRET=
COMMON_COMPONENT_URL=
```
- go to backend directory `cd ./backend`
- Ensure using the correct version of Node which is restricted by the `./backend/package.json` engines parameter
- Using `NVM` switch versions for example `nvm use 18.18`
- Install dependencies `npm i`
- Run frontend app `npm run start`

### Migrations and Seeds
- In order to fully seed the database with production data, the `./backend/srcs/database/production_seeds` folder needs to contain the *.dat production seeds.
  - See the [readme](https://apps.itsm.gov.bc.ca/bitbucket/projects/DES/repos/pmo-mssql-converter/browse/README.md?useDefaultHandler=true#50) for instructions.
- To migrate the database go to `./backend` folder and run `npx knex migrate:latest`
- To run the seeds go to the `./backend` folder and run `npx knex seed:run`
- To run a specific seed go to the `./backend` folder and run `npx knex seed:run --specific=the-name-of-the-seed`



## Frontend Setup and Deploy
- Create/update an .env for frontend
  - the `REACT_APP_KEYCLOAK_URL`, `REACT_APP_KEYCLOAK_CLIENT_ID`, `REACT_APP_KEYCLOAK_REALM` will have to be updated according to your keycloak server settings.

```sh
#/frontend/.env
WDS_SOCKET_PORT=3000
REACT_APP_API_URL=https://localhost:8080
REACT_APP_KEYCLOAK_URL="https://keyloak-login-server/auth"
REACT_APP_KEYCLOAK_CLIENT_ID="keycloak-id"
REACT_APP_KEYCLOAK_REALM=standard
```
- Ensure using the correct version of Node which is restricted by the `./frontend/package.json`
```json
  /*/frontend/package.json --- example node version*/
  ...
  "engines": {
    "node": ">=18.18.0"
  }
  ...
```
- go to frontend directory `cd ./frontend`
- Using `NVM` switch versions for example `nvm use 18.18`
- Install dependencies `yarn i`
- Run frontend app `npm run start`
- Your browser should open up at [localhost:3000](https://localhost:3000)

## Deployment of Application After Setup
- Deploy database  ```cd ./backend && docker compose up```
- Deploy backend ```cd ./backend && npm run start```
- Deploy frontend ```cd ./frontend && npm run start```

## Setting up PGAdmin to Access Postgres Database
Import the following into PGAdmin
```json
{
    "Servers": {
        "1": {
            "Name": "GDX Agreements Tracker",
            "Group": "Servers",
            "Host": "localhost",
            "Port": 15432,
            "MaintenanceDB": "postgres",
            "Username": "postgres",
            "SSLMode": "prefer",
            "SSLCompression": 0,
            "Timeout": 10,
            "UseSSHTunnel": 0,
            "TunnelPort": "22",
            "TunnelAuthentication": 0
        }
    }
}
```

## Deleting GDX Agreements Database

- If the database container is not running, go to the `./backend` folder and run ```docker-compose up db```
- In pgAdmin, right click the pmo database and drop/delete it.
- In pgAdmin, right click your pmo server and create a new database with the same name as the old pmo database.