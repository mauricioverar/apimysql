const { Router } = require('express')
const router = Router()

const { get_employees, get_employee, create_employee, update_employee, delete_employee } = require('../db/employees')

router.get('/', (req, res) => {
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
router.get('/employees', get_employees)
router.get('/employee/:id', get_employee)
router.post('/add', create_employee)
router.put('/update/:id', update_employee)
router.delete('/delete/:id', delete_employee)

// 404 GET>
router.use((req, res) => {
  res.status(404).send(`
  <html>
    <h2>...ruta no existe</h2>
    <a href="/">
      <button>Volver</button>
    </a>
  </html>`)
})

module.exports = router
