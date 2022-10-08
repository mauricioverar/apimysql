const mysqlConnection  = require('../database.js');

// console.log('basedatos')
const key_rnd = Math.floor(Math.random() * 16777215).toString(16)
let acceso = true
/* let num = '8b38afwid'
let acceso = true */


const get_employees = async (req, res) => {
  mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
    if(!err) {
      // console.log('res ',rows)
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

const get_employee = async (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows) => {
    if (!err) {
      if (rows.length < 1) {
        res.send('Not result')
      } else res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
}

const create_employee = async (req, res) => {
  const { key } = req.params;

  // console.log('create ')
  // console.log('create rnd y key  ', key_rnd, key)
  // console.log('create name = ', req.body.name)


  const sql = 'insert into employees set ?'
  const customerObj = {
    name: req.body.name,
    salary: req.body.salary
  }

  // console.log('acceso ', acceso)

  if (acceso) {

    // console.log('access ok ')
    acceso = false
    if (key_rnd == req.params.key) {

      // console.log('code ok ', req.params.key)
      

      mysqlConnection.query(sql, customerObj, (err, rows) => {
        if(!err) {
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

  
}

const update_employee = async (req, res) => {

  
  const { name, salary } = req.body; // argumentos
  const { id } = req.params; // parametros

  /* const customerObj = {
    name: req.body.name,
    salary: req.body.salary
  } */
  // console.log('name ', name, 'salary ', salary) // ok
  const sql = `update employees set name='${name}', salary='${salary}' where id=${id}`

  if (id > 2) {
    mysqlConnection.query(sql, [ name, salary ], (err, rows) => {
      if(!err) {
        // res.send('Employeed Updated');
        res.json({status: 'Employee Updated'});
      } else {
        throw err
        console.log(err);
      }
    });
    // res.send('Update employee')
  }
}

const delete_employee = async (req, res) => {
  const { id } = req.params;

  if (id > 5) {
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employee Deleted'});
      } else {
        console.log(err);
      }
    });
  }
}

module.exports = { get_employees, get_employee, create_employee, update_employee, delete_employee, key_rnd }
