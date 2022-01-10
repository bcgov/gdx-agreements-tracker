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

**Note**: If this is your first time starting the app, you can populate the database by running the provided migrations and seeders. See the README within the backend directory for more information.

The app is then available at [http://localhost/](http://localhost/). For your reference, the API is available at [http://localhost/api/](http://localhost/api/). The websocket for the frontend react is available at http://localhost:3000/ and as long as the `frontend/.env` file (or other similar facility) specifies the WDS_SOCKET_PORT as 3000, the React live-refresh-upon-code-change feature should work in your browser. 

Logs end up in `docker/logs/` in `backend`, `frontend`, and `nginx` subdirectories for your debugging convenience.

If you haven't done a `yarn install` or `npm install` in the frontend or backend subdirectories before executing the above, the docker-compose will handle that for you. This is useful if your local node/npm are not the right version.

### Various Actions Useful for Development
#### To Stop and Remove All Development Containers
`docker compose down`

#### To Update Packages After Changing `package.json`
* Frontend: `docker compose exec frontend yarn install`
* Backend: `docker compose exec backend npm install`

#### To Stop, Start, Restart, Remove, and Get a Shell Inside a Container
These are all demonstrated below on the `web` container, but can work on any of `frontend`, `backend`, or `db` as well, just change the container name on the lines below accordingly.
* Stop: `docker compose stop web`
* Start: `docker compose start web`
* Restart: `docker compose restart web`
* Remove: `docker compose rm web`
* Get a shell inside the container: `docker compose exec web /bin/sh`

### If You Want to Try a Production Build in Local Dev
Open `frontend/Docker/nginx.conf` find the `location / {` section and **uncomment the `try_files` line** so the section looks like this:
```
location / {
    # this will let you try out a static build on dev. delete build/index.html to go back to using the node server.
    # if the request can be served from the build directory, try it first, otherwise shunt it to the proxy.\
    try_files $uri $uri/ @app_proxy;
    error_page 403 = @app_proxy;
    error_page 404 = @app_proxy;
}
```
Then restart the web container:
* `docker compose restart web`

If your containers are running, as per above:

* `docker compose exec frontend yarn build` and wait for the build to complete
* Refresh [http://localhost/](http://localhost/)

To go back to live-refresh local development node server:
* Temporarily:
  * Delete the contents of `frontend/build` directory (`rm -rf build/*`)
  * Refresh [http://localhost/](http://localhost/)
* Permanently:
  * Delete the contents of `frontend/build` directory
  * Comment out the `try_files` line in nginx.conf as per above by placing a `#` before `try_files`
  * Restart the web container
    * `docker compose restart web`

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
