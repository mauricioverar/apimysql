const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')

const { get_employees, get_employee, create_employee, update_employee, delete_employee, key_rnd } = require('../db/employees')

let msj = ''
let acceso = true
// console.log('key_rnd es : ', key_rnd)

router.get('/employees', get_employees)
router.get('/employee/:id', get_employee)
router.post('/add/:key', create_employee)  
router.put('/update/:id', update_employee)
router.delete('/delete/:id', delete_employee)

router.get('/', (req, res) => {
  try {
    // console.log('index')
    res.render('index.html', {msj})
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

  // console.log('email ', email)
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { // usar env
      user: process.env.MI_EMAIL, // correo, //'mbensan.test@gmail.com',
      pass: process.env.MI_PASS // clave
    }
  })
  await transport.sendMail({
    from: process.env.MI_EMAIL, //correo, // sender address
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
