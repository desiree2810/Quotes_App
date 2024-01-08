
# Quote App

Welcome to the Quotes App – a simple and intuitive platform where users can share, discover, and engage with inspiring or thought-provoking quotes. Whether you have your own wisdom to impart or come across a gem from someone else, this app provides a space for the exchange of meaningful quotes.


## Tech Stack

**Client:** VITE React 

**Server:** NestJS

**Database:** PostgreSQL


## Installation

Install the project with npm

To install all dependencies on backend:
```bash
  cd Quotes_App
  cd quotes_backend
  npm install
```

## Migrations in PostgreSQL:
NOTE: First create a databse with the same name that you have given in the env file (`DB_DATABASE`)
```bash
npm run migration:generate -- db/migrations/FirstMigration
npm run migration:run
```
NOTE: in migration:generate command "FirstMigration" is the name of the file that you would like to give.


To run backend:
```bash
npm run start:dev
```