
const mysqlConnection  = require('../database.js');

const get_employees = async (req, res) => {
  mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
    if(!err) {
      console.log('res ',rows)
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
  const sql = 'insert into employees set ?'
  const customerObj = {
    name: req.body.name,
    salary: req.body.salary
  }
  mysqlConnection.query(sql, customerObj, (err, rows) => {
    if(!err) {
      res.send('Employeed Saved');
    } else {
      console.log(err);
    }
  });
}

const update_employee = async (req, res) => {
  const { name, salary } = req.body; // argumentos
  const { id } = req.params; // parametros
  /* const customerObj = {
    name: req.body.name,
    salary: req.body.salary
  } */
  console.log('nmae ', name, 'salary ', salary) // ok
  const sql = `update employees set name='${name}', salary='${salary}' where id=${id}`
  mysqlConnection.query(sql, [ name, salary ], (err, rows) => {
    if(!err) {
      res.send('Employeed Saved');
    } else {
      throw err
      console.log(err);
    }
  });
  res.send('Update employee')
}

const delete_employee = async (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Deleted'});
    } else {
      console.log(err);
    }
  });
}

module.exports = { get_employees, get_employee, create_employee, update_employee, delete_employee }