const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {"rejectUnauthorized":true}
});

// DATABASE_URL='mysql://l198bm38faafjwu4xiod:pscale_pw_L53RHjlak5bz5fWnkqtwPHebUsFsp7ta1Kjsyn58WzP@us-east.connect.psdb.cloud/apimysql?ssl={"rejectUnauthorized":true}'

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;