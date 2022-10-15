const mysql = require('mysql2'); // .promess
// const secrets = require('./secrets')

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || secrets.db_host,
  user: process.env.DB_USER || secrets.db_user,
  password: process.env.DB_PASS || secrets.db_pass,
  database: process.env.DB_NAME || secrets.db_name  
}); // ssl: {"rejectUnauthorized":true}

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;