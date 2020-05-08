
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // "production": {
  //   "use_env_variable": 'DATABASE_URL'
  // }
}
