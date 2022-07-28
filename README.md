
# events-backend

## Start postgres and create database 'event' 
docker-compose up
```
psql -U postgres -c 'create database events'
psql -U postgres -d events < events.sql
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
