const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')
const mysqlConnection = require('../database.js');

const { get_employees, get_employee, update_employee, delete_employee } = require('../db/employees')

let key_rnd = ''
let acceso = false

let msj = ''
let correo = process.env.MI_EMAIL
let clave = process.env.MI_PASS

router.get('/employees', get_employees)
router.get('/employee/:id', get_employee)
router.put('/update/:id', update_employee)
router.delete('/delete/:id', delete_employee)
// create_employee
router.post('/add/:key', (req, res) => {
  const sql = 'insert into employees set ?'
  const customerObj = {
    name: req.body.name,
    salary: req.body.salary
  }
  if (acceso) {
    acceso = false
    if (key_rnd == req.params.key) {
      mysqlConnection.query(sql, customerObj, (err, rows) => {
        if (!err) {
          res.send('Employeed Saved');
        } else {
          console.log(err);
        }
      });

    } else {
      res.send('not match code');
    }

  } else {
    res.send('not access, get a new key in https://api-mysql-heroku.herokuapp.com/');
  }
})

router.get('/', (req, res) => {
  try {
    res.render('index.html', { msj })
  } catch (error) {
    console.log(error)
  }
})

router.get('/get_key', (req, res) => {
  res.render('get_key.html')
})

router.post('/getkey', async (req, res) => {
  const email = req.body.email
  key_rnd = Math.floor(Math.random() * 16777215).toString(16)
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: correo, //'mbensan.test@gmail.com',
      pass: clave
    }
  })
  await transport.sendMail({
    from: correo, // sender address
    to: email, // list of receivers
    subject: 'Api_MySql', // Subject line
    html: `Access Key: ${key_rnd}`, // html body
  })

  return res.redirect('/check_code')
})

router.get('/check_code', (req, res) => {
  res.render('check_code.html')
})

router.post('/checkcode', (req, res) => {
  const code = req.body.code
  if (code == key_rnd) {
    msj = 'code ok'
    acceso = true
  
  } else {
    msj = 'incorrect code'  
  }
  res.redirect('/')
})

// 404 GET>
router.use((req, res) => {
  res.status(404).send(`
  <html>
    <h2>...ruta no existe o sin access key</h2>
    <a href="/">
      <button>Volver</button>
    </a>
  </html>`)
})
/* router.get('*', (req, res) => { // ver demora carga pag
  res.render('404.html')
}) */

module.exports = router
