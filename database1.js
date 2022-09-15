// const mysql = require('mysql2')
const {createPool} = require('mysql2/promise')

// crear coneccion a basedato
// const mysqlConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456789',
//   database: 'company'
// })

async function main() {

  const conn = await createPool({
    host: 'us-east.connect.psdb.cloud',
    user: 'n44prnkukdc9hfpwjpxi',
    password: 'pscale_pw_jCzbDo1w28BjEWGg2AFbJELoFekBxDiHUJUeXDc7NyK',
    database: 'apimysql'
  })
  console.log('first ')
}
main()
// conectarse a basedato
/* mysqlConnection.connect(function (err) {
  if(err) {
    console.log(err);
    return
  } else {
    console.log('db conectada');
  }
}) */

// simple query
/* mysqlConnection.query(
  'SELECT * FROM employees',
  function(err, results, fields) {
    console.log('db results ',results)  // results contains rows returned by server
    // console.log('db fields',fields); // fields contains extra meta data about results, if available
  }
); */

module.exports = conn