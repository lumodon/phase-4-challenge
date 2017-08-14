# Vinyl

A community for record enthusiasts to review their favorite albums.

Part of the application has already been built for you. Your job is to take it to completion.

## Getting Started

Run `$ npm run` to see the list of commands available. To see what each command does, look at `package.json`.

The app uses a basic Express file structure, and includes SQL files to set up the schema and import data.

A quick configuration had been made to get setup. Follow these instructions:

1. Install brew // TODO: Instructions to install brew
1. Install PostgreSQL with brew if you haven't already `brew install postgresql`
1. Contact the developer to get the `.env` file information - Recommended through slack
1. Run quick setup `npm run setup`

#### Problems
If you experience a problem with postgresql like I did try running this:
`sudo mkdir /var/pgsql_socket/`
`sudo ln -s /private/tmp/.s.PGSQL.5432 /var/pgsql_socket/`
Recommendation is only one that worked for me. Came from here:
https://stackoverflow.com/questions/13410686/postgres-could-not-connect-to-server

Error I had was this:
```
psql: could not connect to server: No such file or directory Is the server running locally and accepting connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

You should be up and running.
// TODO: Insert heroku instructions before production

### Setting Up Your Database

Use the following commands to set up and seed your database:

1. Create PostgreSQL database `vinyl`: `$ npm run db:create`
1. Set up database tables from `schema.sql`: `$ npm run db:schema`
1. Load seed data from `albums.sql`: `$ npm run db:seed`
