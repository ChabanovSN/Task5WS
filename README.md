# Building a RESTful API with Koa and Postgres

Project base...

1. Fork/Clone
1. Install dependencies - `npm install`
1. Sanity check - `npm start`
1. Test - `mocha test`
chai-http@3.0.0
koa@2.3.0
npm install axios


npm install --save koa-static
npm install --save koa-mount
#DB
pg@7.1.2 
knex@0.13.0 (Run knex init ) for new folder
koa-router@7.2.1 
koa-bodyparser@4.2.0




CREATE DATABASE moviesdb;
CREATE DATABASE moviesdb_test;

 knex migrate:latest --env development
 knex seed:run --env development

#Authorization
koa-passport@4.0.1
koa-session@5.5.1
passport-local@1.0.0

bcryptjs@2.4.3

SET DEBUG=node-koa-api* & npm run devstart