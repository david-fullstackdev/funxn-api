# Full Funxn Server 2.0

## Overview

This is the updated version of the FullFunxn Server. It will be used primarily for reporting 
services. This is  Node.js TypeScript server utilizing Express for basic http services.

## Setup

This application is built on node. To better manage the active node version it is recommended
that you install `nvm` with `avn`. The `nvm` module will manage the node version per project and
the `avn` module will check for a `.nvmrc` file and switch to that version of node automatically.

* `npm install nvm avn avn-nvm typescript@next grunt -g`
* make sure to add a `.nvmrc` file to the root of the project with a version number in it no "v" prefix 

##  Install

* `npm install` - Note this will also install the Type Definitions
* `grunt` - compiles typing. 

## Auto Start Server

The server is should use `pm2` as a container. This can be integrated with Ubuntu upstart services. Run the following commands on a new server to setup the app with server autostart services.

* `cd <project root>`
* `pm2 startup ubuntu -u deploy` # run the command that is returned
* `pm2 start bin/app.js -i 0 --name "api"` # make sure that the app is accessible as expected
* `pm2 save` # this saves the current state of the app
* image server


## Migrations

Migrations help to maintain the current state of the database schema for the application. 
Migrations are not necessary if using Mongo as a data source. For all sql based data sources
accessed through Bookshelf/Knex see [this migrations documentation](http://knexjs.org/#Migrations).

NOTE: Use this command to start mysql on MacOS development machine `mysql.server start`


## API

The api routing starts at `/api` as defined in the `app.ts` file. The individual routes are defined `/routes` directory.


### Servers

* API dev root URL: `http://api.funxn.tapestryd.com/api/`
* Web Dashboard dev root URL: `http://funxn.tapestryd.com/`


### CORS

Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the resource originated.


### Server Info

Provide basic server information about the API. This is also used for health_checks on the server so should ideally attempt to validate that critical path services are operational.

* Route: `GET /api/server_info`
* Curl:

	```
	curl -H "Content-Type:application/json" -H "Accept:application/json" \
	     -H "Authorization:Bearer 7e58e4d0-b181-11e4-b3d2-af125d7347f9" \
	     -X GET 'http://localhost:3000/api/server_info'
	```


* Response example:

  ```
  {
	  "name":"fullfunxn-server",
	  "description":"Full Funxn API Server",
	  "version":"0.1.0",
	  "status":"OK"
  }
  ```

### Users

Read-only API to the users.

#### Index

* Route: `GET /api/users`
* Curl:

	```
	curl -H "Content-Type:application/json" -H "Accept:application/json" \
	     -H "Authorization:Bearer 7e58e4d0-b181-11e4-b3d2-af125d7347f9" \
	     -X GET 'http://localhost:3000/api/users'
	```


* Response example:

  ```
  {
	  "name":"fullfunxn-server",
	  "description":"Full Funxn API Server",
	  "version":"0.1.0",
	  "status":"OK"
  }
  ```

#### Read


#### Delete


#### Create

TBD

### Tasks

#### Index

Get a list of tasks

#### Read 

Show a single task

### Reports

#### Index

List of of reports. 

#### Show Custom

The "custom" report is the result of the report request. This optionally include data for tasks, mood, rewards based on provided date and user filters.

TODO: Review static report display

* Route: `GET /api/reports/custom`
* Params:
	* date - range [start,end] - narrow the list of items
		* task.finish_due = range [start,end] - narrow the list of tasks
		* taskfinish_timestamp = when it was completed. It should be before the finish_due
* Return: object with a list for each report "item"
* Curl:

	```
	curl -H "Content-Type:application/json" -H "Accept:application/json" \
	     -H "Authorization:Bearer 7e58e4d0-b181-11e4-b3d2-af125d7347f9" \
	     -X GET 'http://localhost:3000/api/reports/custom? \			date=2016-04-18,2016-04-20&item=tasks_completed,mood'
	```


* Response example:

  ```
  {
	  "name":"fullfunxn-server",
	  "description":"Full Funxn API Server",
	  "version":"0.1.0",
	  "status":"OK"
  }
  ```




## References

* [TypeScript Setup](https://code.visualstudio.com/Docs/languages/typescript)

### Themes

Angular 2 Admins:

```
https://wrapbootstrap.com/theme/sing-app-web-angular-2.0-dashboard-WB0J6BJ85
http://coreui.io/
https://sabbirrahman.github.io/ng2-mdl/#/ - angular 2 with mdl wrapper
https://denisvuyka.github.io/2016/06/06/angular2-material.html - tips
http://builtwithangular2.com/coreui-admin-theme/ - Bootstrap with Angular 2
https://github.com/mrholek/CoreUI-Free-Bootstrap-Admin-Template
http://coreui.io/demo/Angular_Demo/#/dashboard
https://github.com/angular/angular-cli
http://stackoverflow.com/questions/39341523/how-to-include-theme-in-angularjs-2
https://scotch.io/tutorials/seamless-ways-to-upgrade-angular-1-x-to-angular-2 - Upgrade the triangular theme
```

## Accounts / Servers

* Funxn API 1.0 - `ssh -A ubuntu@52.32.157.35`



## TODO 

* ~~Figure out use of `typings` vs `tsc` get modules and definitions installed property~~
* ~~Setup Database ORM~~
  * ~~Setup basic migratins~~
* ~~switch routes to use fetchAll from controller by passing promise method~~
* ~~Refactor routes to allow for directory import of routes to be more extensible and easier to maintaini~~
* Config loads from ENV VARS. Update database and app to use config settings
  * Setup `Config` with variables that is included in app.js and should be available to other modules
  * Just use basic `process.env` vars to set this up one per variable in database connections string
* Setup Auth with json-web-tokens
* Install and setup [Swagger](https://www.npmjs.com/package/swagger)
* Review Hapi plugin system for Best Practices 
* Possible other name TINMEN, Typescript-Integrated-Model-Express-N(?)
* Possible other name TINMAN, Typescript-Integrated-Model-Auth-N(?)
* Possible name TYPE Stack - Typescript,Yeoman,Patterns,Express (logo typewrite)
* NEXT Stack - (N)ode (EX)press (T)ypeScript
