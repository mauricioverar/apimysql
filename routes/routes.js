const { Router } = require('express')
const router = Router()

const { get_employees, get_employee, create_employee, update_employee, delete_employee } = require('../db/employees')

router.get('/', (req, res) => {
  res.send('Api')
})
router.get('/employees', get_employees)
router.get('/employee/:id', get_employee)
router.post('/add', create_employee)
router.put('/update/:id', update_employee)
router.delete('/delete/:id', delete_employee)

module.exports = router
