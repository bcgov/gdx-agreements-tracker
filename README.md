[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)]

# GDX Agreements Tracker Front End

## Installation
* ```git clone https://github.com/bcgov/gdx-agreements-tracker-front-end.git```
* ```cd gdx-agreements-tracker-front-end```
* ```yarn install```
* Commands
    * ```yarn start``` - starts front end app on localhost:3000
    * ```yarn build``` - builds for production deployment

## Build
* ```cd gdx-agreements-tracker-front-end```
* ```docker build -t gdx-agreements-tracker-front-end:latest .```
* Test build by running ```docker run -p 8081:80 --rm gdx-agreements-tracker-front-end```