const { Pool } = require('pg');
// const dotenv = require('dotenv');
// dotenv.config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.connect();

module.exports = pool;
