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
    docker compose exec backend npx knex migrate:latest
    docker compose exec backend npx knex seed:run
    ```
---

5. Update the .env file in the backend directory ([backend .env](/backend/.env)) with the following:
    
   ```
    NODE_ENV=development<br>
    JWKSURI=https://oidc.gov.bc.ca/auth/realms/aaoozhcp/protocol/openid-connect/certs<br>
    POSTGRES_PORT=15432<br>
    POSTGRES_HOST=localhost<br>
    POSTGRES_USER=postgres<br>
    POSTGRES_PASSWORD=postgres<br>
    POSTGRES_DATABASE=gat_db<br>
    DATABASE_AUTO_DEPLOY=1<br>
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

    #### Generate the certificate (ran from the root of this project)
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
