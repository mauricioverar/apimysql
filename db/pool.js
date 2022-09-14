const { Pool } = require('pg')
// const secrets = require('../secrets')


// const pool1 = new Pool(config)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = {pool};
