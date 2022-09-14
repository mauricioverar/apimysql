const express = require('express')

const app = express()

const port = process.env.PORT || 3000 // asignar un puerto en heroku o usar 3000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use(require('./routes/routes'))


app.listen(port, () => {
  console.log(`Servidor en puerto http://localhost:${port}`)
})

// nodemon server
