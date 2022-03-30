![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)

# GDX Agreements Tracker

<mark style="background-color: #fff; padding: 10px;">NOTE: To host this application in docker for local development, please see file here:</mark> [Docker Hosting GDX Agreements Tracker](/documentation/README.md)

Below is the current preferred method for development. (ao. 03/25/2022)<br><br>

## Prerequisites

The following prerequisites are required for this application to function correctly:

*   PostgreSQL
*   NPM (latest stable version)
*   Colima or Docker desktop
 
## Installation

1.  Clone the repo to your local development system:
    ```git clone https://github.com/bcgov/gdx-agreements-tracker.git```
---

2. Install dependencies for the backend. 
    * Open a new terminal in the directory of the repo you just cloned locally and run the following commands: 
        * ```bash cd /backend``` 
        * ```npm i``` 
---

3. Now install dependencies for the frontend. 
    * Open a new terminal in the directory of the repo you just cloned locally and run the following commands: 
        * ```cd /frontend```
        * ```yarn i```
---

4. Run the seeders and migrations for the local development database.
    * To bring your local database up to the latest version run:
        * `docker compose exec backend npx knex migrate:latest`
        * `docker compose exec backend npx knex seed:run`
---

5. Update the .env file in the backend directory ([backend .env](/backend/.env)) with the following:
    
    NODE_ENV=development<br>
    JWKSURI=https://oidc.gov.bc.ca/auth/realms/aaoozhcp/protocol/openid-connect/certs<br>
    POSTGRES_PORT=15432<br>
    POSTGRES_HOST=localhost<br>
    POSTGRES_USER=postgres<br>
    POSTGRES_PASSWORD=postgres<br>
    POSTGRES_DATABASE=gat_db<br>
  ---

6. Start the Database container in docker 
    *   Open a terminal in the root of the project directory and run:
        * ```docker compose start db```

7. Start the backend and frontend
    *   Open a terminal in the /frontend directory and run:
        * ```npm run start```
    *   Open a terminal in the /backend directory and run:
        * ```npm run start```

8. In your browser, visit localhost:3000 to access the site and login


### Congratulations, you can now start developing!