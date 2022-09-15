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
}
main()
  
// routes
app.get('/', (req, res) => {
  res.send('Api')
})

// rutes with endpoints
app.get('/employees', (req, res) => {
  res.send('List of employees')
})

app.get('/employee/:id', (req, res) => {
  res.send('Get employee by id')
})

app.post('/add', (req, res) => {
  res.send('New employee')
})

app.put('/update/:id', (req, res) => {
  res.send('Update employee')
})

app.delete('/delete/:id', (req, res) => {
  res.send('Delete employee')
})
app.listen(port, () => console.log(`server runing on port ${port}`))