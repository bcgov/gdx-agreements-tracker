![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)

# GDX Agreements Tracker

## Installation
* ```git clone https://github.com/bcgov/gdx-agreements-tracker.git```

## Development All-in-One Quick Start
If you have Docker:
```bash
cd gdx-agreements-tracker
docker compose up --build -d
```
The app is then available at [http://localhost:82/](http://localhost:82/). For your reference, the API is available at [http://localhost:82/api/](http://localhost:82/api/). The websocket for the frontend react is available at http://localhost:3001/ and as long as the `frontend/.env` file (or other similar facility) specifies the WDS_SOCKET_PORT as 3001, the React live-refresh-upon-code-change feature should work in your browser. 

Logs end up in `docker/logs/` in `backend`, `frontend`, and `nginx` subdirectories for your debugging convenience.

If you haven't done a `yarn install` or `npm install` in the frontend or backend subdirectories before executing the above, the docker-compose will handle that for you. This is useful if your local node/npm are not the right version.

### Try a Production Build in Local Dev
If your containers are running, as per above:

* `docker compose exec frontend yarn build` and wait for the build to complete
* Refresh [http://localhost:82/](http://localhost:82/)

To go back to live-refresh local development node server:
* Delete the contents of `frontend/build` directory
* Refresh [http://localhost:82/](http://localhost:82/)

## Development à la Carte

### Front End

#### Setup
* ```cd gdx-agreements-tracker/frontend```
* ```yarn install```
* Commands
    * ```yarn start``` - starts front end app on localhost:3000
    * ```yarn build``` - builds for production deployment

#### Build
* ```cd gdx-agreements-tracker-front-end/frontend```
* ```docker build -t gdx-agreements-tracker-front-end:latest .```
* Test build by running ```docker run -p 8081:80 --rm gdx-agreements-tracker-front-end```


### Back End

#### Setup
* ```cd gdx-agreements-tracker/backend```
* ```npm i```
* Commands
  * ```npm run start``` - to start api server on localhost:8080
  * ```npm run test``` - to run tests.

#### Build
* ```cd gdx-agreements-tracker/backend```
* ```docker build -t gdx-agreements-tracker-api:latest .```
