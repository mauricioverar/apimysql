const express = require('express') // body parser lo trae incluido o npm i body-parser

const app = express()

const port = process.env.PORT || 3000 // asignar un puerto en heroku o usar 3000

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json())


  
// Routes
app.use(require('./routes/routes'))

app.listen(port, () => console.log(`server runing on port ${port}`))