const express = require('express') // body parser lo trae incluido o npm i body-parser
const mysql = require('mysql2/promise') //const mysql = require('mysql2/promise')
const app = express()

const port = process.env.PORT || 3000 // asignar un puerto en heroku o usar 3000

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json())

// create the connection to database

async function main() {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'company'
  })
  const res = await connection.query( 'select * from employees' )
  console.log(res[0])
  // execute will internally call prepare and query
  /* connection.execute(
    'SELECT * FROM employees',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
  
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    }
  ) */
}
main()

/* 
async function main() {

  const connection = await createPool({
    host     : 'localhost',
    user     : 'root',
    password: '123456789',
    database : 'company'
  })
  connection.connect(function (err) {
    if(err) {
      console.log(err);
      return
    } else {
      console.log('db conectada');
    }})
}
main() */
  

app.listen(port, () => console.log(`server runing on port ${port}`))