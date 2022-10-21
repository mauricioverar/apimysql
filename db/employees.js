const mysqlConnection  = require('../database.js');

const get_employees = async (req, res) => {
  console.log('into emp')
  mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
}

const getEmployeesCount = async (req, res) => {
  mysqlConnection.query('SELECT COUNT(*) FROM employees', (err, rows, fields) => {
    if(!err) {
      res.json(rows[0]["COUNT(*)"]); // primer obj con key "COUNT(*)" (es el q contiene la cantidad total de trabajadores)
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

const update_employee = async (req, res) => {
  const { name, salary } = req.body; // argumentos
  const { id } = req.params; // parametros

  const sql = `update employees set name='${name}', salary='${salary}' where id=${id}`

  if (id > 2) {
    mysqlConnection.query(sql, [ name, salary ], (err, rows) => {
      if(!err) {  
        res.json({status: 'Employee Updated'});
      } else {
        throw err
        console.log(err);
      }
    });    
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

module.exports = { get_employees, getEmployeesCount, get_employee, update_employee, delete_employee }
