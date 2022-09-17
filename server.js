const express = require('express') // body parser lo trae incluido o npm i body-parser
// require('dotenv').config()
const router = require('./routes/routes')

const app = express()

const port = process.env.PORT || 3000 // asignar un puerto en heroku

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json())


  
// Routes
// app.use(require('./routes/routes'))
app.use('/api/v1', router) // prefijo


app.listen(port, () => console.log(`server runing on port ${port}`))

// git push heroku main