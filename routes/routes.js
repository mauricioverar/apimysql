const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')
const mysqlConnection = require('../database.js');

const { get_employees, getEmployeesCount, get_employee, update_employee, delete_employee } = require('../db/employees')

let key_rnd = ''
let acceso = false

let msj = ''
let correo = process.env.MI_EMAIL
let clave = process.env.MI_PASS

router.get('/employees', get_employees)
router.get("/employees/count", getEmployeesCount); // contar
router.get('/employee/:id', get_employee)
router.put('/update/:id', update_employee)
router.delete('/delete/:id', delete_employee)
// create_employee
router.post('/add/:key', (req, res) => {
  console.log('entro add post')
  console.log(req.body)
  console.log(req.get('Origin'))
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
          res.send('Employeed Saved'); // block by cors
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
/* // es lo q hace el navegador
fetch(`https://api-mysql-heroku.herokuapp.com/add`, {
  method: "POST",
})
  .then((res) => console.log(res))
    .catch((err) => console.log(err));
*/
/*
fetch(`http://localhost:3000/employees`, {
    method: "POST",
    headers: {
        'Content-Type': 'aplication/x-www-form-urlencoded',
    },
    body: "texto=desde front",
})
  .then((res) => console.log(res))
    .catch((err) => console.log(err));
*/

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
/* router.get('*', (req, res) => {
  res.render('404.html')
}) */

module.exports = router

// Documentación
// url/docs

/**
 * @swagger
 * components:
 *  schemas:
 *    Employees:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of employee
 *        name:
 *          type: string
 *          description: the employee name
 *        salary:
 *          type: string
 *          description: the employee salary
 * tags:
 *  name: Employees
 *  description: employees endpoint
 */

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/employees:
 *  get:
 *    summary: Get all Employees
 *    tags: [Employees]
 */

//

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/employees/count:
 *  get:
 *    summary: get total employees counter
 *    tags: [Employees]
 */

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/get_key:
 *  get:
 *    summary: get your key code with you email
 *    tags: [Employees]
 */

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/add/{key}:
 *  post:
 *    summary: save a new Employee first get your key code with you email in https://api-mysql-heroku.herokuapp.com/get_key
 *    tags: [Employees]
 */

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/employee/{id}:
 *  get:
 *    summary: Get employee by Id
 *    tags: [Employees]
 */

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/delete/{id}:
 *  delete:
 *    summary: delete a employee by Id
 *    tags: [Employees]
 */

/**
 * @swagger
 * https://api-mysql-heroku.herokuapp.com/update/{id}:
 *  put:
 *    summary: update a employee by Id
 *    tags: [Employees]
 */
