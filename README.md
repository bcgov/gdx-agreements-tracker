![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)

# GDX Agreements Tracker

## Installation
* ```git clone https://github.com/bcgov/gdx-agreements-tracker.git```

### Front End
* ```cd gdx-agreements-tracker/frontend```
* ```yarn install```
* Commands
    * ```yarn start``` - starts front end app on localhost:3000
    * ```yarn build``` - builds for production deployment

### Back End
* ```cd gdx-agreements-tracker/backend```
* ```npm i```
* Commands
  * ```npm run start``` - to start api server on localhost:8080
  * ```npm run test``` - to run tests.

## Build

### Front End
* ```cd gdx-agreements-tracker-front-end/frontend```
* ```docker build -t gdx-agreements-tracker-front-end:latest .```
* Test build by running ```docker run -p 8081:80 --rm gdx-agreements-tracker-front-end```

### Back End
* ```cd gdx-agreements-tracker/backend```
* ```docker build -t gdx-agreements-tracker-api:latest .```
