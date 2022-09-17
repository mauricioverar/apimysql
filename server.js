const express = require('express') // body parser lo trae incluido o npm i body-parser
// require('dotenv').config()
const router = require('./routes/routes')

const app = express()

const port = process.env.PORT || 3000 // asignar un puerto en heroku

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json())


  
// Routes
app.get('/', (req, res) => {
  res.send(`
  <html>
    <h2>Api-Rest-Mysql</h2>
    <ul>
      <li>See all The employees: <i>/api/v1/employees</i></li>
      <li>See one employee: <i>/api/v1/employee/nº id</i></li>
      <li>Add a employee: <i>/api/v1/add</i></li>
      <li>Update a employee: <i>/api/v1/update/nº id</i></li>
      <li>Delet a employee: <i>/api/v1/delete/nº id</i></li>
    </ul>
  </html>`)
})
// app.use(require('./routes/routes'))
app.use('/api/v1', router) // prefijo


app.listen(port, () => console.log(`server runing on port ${port}`))

// git push heroku main