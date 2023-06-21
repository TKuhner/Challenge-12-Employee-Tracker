const mysql = require('mysql12');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker'
});

module.exports = db;