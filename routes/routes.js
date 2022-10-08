const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')
const mysqlConnection = require('../database.js');

const { get_employees, get_employee, update_employee, delete_employee } = require('../db/employees') // , create_employee, key_rnd

let key_rnd = ''
let acceso = false

let msj = ''
let correo = process.env.MI_EMAIL
let clave = process.env.MI_PASS

// console.log('key_rnd es : ', key_rnd) 

router.get('/employees', get_employees)
router.get('/employee/:id', get_employee)
router.put('/update/:id', update_employee)
router.delete('/delete/:id', delete_employee)
// create_employee
router.post('/add/:key', (req, res) => {

  console.log('post add')
  // router.post('/add', create_employee)
  const sql = 'insert into employees set ?'
  const customerObj = {
    name: req.body.name,
    salary: req.body.salary
  }

  console.log('acceso ', acceso)

  if (acceso) {

    console.log('access ok ')
    acceso = false
    if (key_rnd == req.params.key) {

      console.log('code ok ', req.params.key)

      mysqlConnection.query(sql, customerObj, (err, rows) => {
        if (!err) {
          res.send('Employeed Saved');
        } else {
          console.log(err);
        }
      });

    } else {
      // console.log('not match code')
      res.send('not match code');
    }

  } else {
    // console.log('not access')
    res.send('not access');
  }
})


router.get('/', (req, res) => {
  try {
    // console.log('index')
    res.render('index.html', { msj })
  } catch (error) {
    console.log(error)
  }
})

router.get('/get_key', (req, res) => {
  res.render('get_key.html')
})

router.post('/getkey', async (req, res) => {
  // console.log('post get_key ')
  const email = req.body.email

  key_rnd = Math.floor(Math.random() * 16777215).toString(16)
  console.log('key_rnd es : ', key_rnd) 

  // console.log('email ', email)
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { // usar env
      user: correo, //'mbensan.test@gmail.com',
      pass: clave
    }
  })
  await transport.sendMail({
    from: correo, // sender address
    to: email, //correo, // list of receivers
    subject: 'Api_MySql', // Subject line
    html: `Access Key: ${key_rnd}`, // html body
  })

  return res.redirect('/check_code')

})

router.get('/check_code', (req, res) => {
  res.render('check_code.html')
})

router.post('/checkcode', (req, res) => {
  // console.log('checkcode')
  const code = req.body.code
  if (code == key_rnd) {
    msj = 'code ok'
    acceso = true
    // console.log('ok ', msj)
  } else {
    msj = 'incorrect code'
    // console.log('not ok ', msj)
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
