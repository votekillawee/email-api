const postgres = require('postgres');

// these should be defined in the .env file
const pgConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD
};

const sql = postgres(pgConfig);

module.exports = { sql };
