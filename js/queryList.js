
const queryList = {
    viewAllEmployees: function (db) {
        db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
        });
    },
    getAllEmployees: function (db) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM employee', function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    viewAllDepartments: function (db) {
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
        });
    },
    getAllDepartments: function (db) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM department', function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    viewAllRoles: function (db) {
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
        });
    },
    getAllRoles: function (db) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM role', function (err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    addEmployee: function (db, employee) {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], function (err, results) {
            if (err) throw err;
        });
        
    },
    addDepartment: function (db, departmentName) {
        db.query('INSERT INTO department (department_name) VALUES (?)', [departmentName], function (err, results) {
            if (err) throw err;
        });
    },
    addRole: function (db, role) {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [role.title, role.salary, role.department_id], function(err, results) {
            if (err) {
                throw err
            } else {
                console.log('Role added!');
            }

        });
    },
    updateEmployeeRole: function (db) {
        // db.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, id], function (err, results) {
        //     if (err) throw err;
        // });
    }
};



module.exports = queryList; 