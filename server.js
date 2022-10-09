const express = require('express') // body parser lo trae incluido o npm i body-parser
const favicon = require('serve-favicon')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000

// middlewares se ejecutan antes de las funcionalidades y rutas
app.use(express.json())
// se configura uso de formularios
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const nunj_env = nunjucks.configure(path.resolve(__dirname, "views"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});

app.use(require('./routes/routes'))
// app.use('/api/v1', router) // prefijo

app.listen(port, () => console.log(`server runing on port http://localhost:${port}`))

// git push heroku main