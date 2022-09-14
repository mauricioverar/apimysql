const express = require('express') // body parser lo trae incluido
const router = express.Router()

const mysqlConnection = require('../database')

router.get('/', (req,res) => {
  mysqlConnection.query('select * from employees', (err, rows, fields) => {
    if(!err) {
      res.json(rows)
    } else {
      console.log(err);
    }
  })
})

router.get('/:id', (req,res) => {
  // const id = req.params.id
  const {id} = req.params // obtener parametro id

  console.log('id ', id);
  mysqlConnection.query('select * from employees where id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows[0]) // solo el objeto
    } else {
      console.log(err);
    }
  })
})

router.post('/', (req,res) => {
  const { id, name, salary } = req.body
  const query = `
  CALL employeeAddOrEdit(?, ?, ?)
  `
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({Status: 'Employeed saved'})
    } else {
      console.log(err);
    }
  })
})

router.put('/:id', (req,res) => { // con params id
  // const id = req.params.id
  const {name, salary} = req.body // obtener datos de campos 
  const {id} = req.params // obtener parametro id
  const query = `CALL employeeAddOrEdit(?, ?, ?)`

  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if(!err) {
      res.json({satus: 'Employee Updated'})
    } else {
      console.log(err);
    }
  })
})

router.delete('/:id', (req,res) => { // con params id
  const {id} = req.params // obtener parametro id
  const query = `CALL employeeAddOrEdit(?, ?, ?)`

  mysqlConnection.query('delete from employees where id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({satus: 'Employee Deleted'})
    } else {
      console.log(err);
    }
  })
})

module.exports = router