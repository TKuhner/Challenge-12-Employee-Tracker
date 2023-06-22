// const db = require('');

const path = require('path');
const fs = require('fs');

const queryList = {
    viewAllEmployees: function(db) {
        db.query('SELECT * FROM employee', function(err, results) {
            console.table(results);
        });
    },
    viewAllDepartments: function(db) {
        db.query('SELECT * FROM department', function(err, results) {
            console.table(results);
        });
    },
    viewAllRoles: function(db) {
        db.query('SELECT * FROM role', function(err, results) {
            console.table(results);
        });
    }
};



module.exports = queryList; 