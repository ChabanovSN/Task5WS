const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

const user= 'postgres';
const password = 'root';

module.exports = {
  test: {
    client: 'pg',
    connection: `postgres://${user}:${password}@localhost:5432/moviesdb_test`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: `postgres://${user}:${password}@localhost:5432/moviesdb`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};