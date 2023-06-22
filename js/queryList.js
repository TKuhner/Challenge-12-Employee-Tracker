
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
    getAllManagers: function (db) {
        return new Promise((resolve, reject) => {
            db.query('SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL', function (err, results) {
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
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [role.title, role.salary, role.department_id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.log('Role added!');
            }
        });
    },
    updateEmployeeRole: function (db, role_id, id) {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, id]);
    },
    viewEmployeesByDepartment: function (db, department_id) {
        console.log("dept id " + department_id);
        db.query('SELECT * FROM employee JOIN department WHERE department.id = ?', [department_id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.table(results);
            }
        });
    },
    viewEmployeesByManager: function (db, manager_id) {
        db.query('SELECT * FROM employee WHERE manager_id = ?', [manager_id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.table(results);
            }
        });
    },
    deleteEmployee: function (db, id) {
        db.query('DELETE FROM employee WHERE id = ?', [id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.log('Employee deleted!');
            }
        });
    },
    deleteDepartment: function (db, id) {
        db.query('DELETE FROM department WHERE id = ?', [id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.log('Department deleted!');
            }
        });
    },
    deleteRole: function (db, id) {
        db.query('DELETE FROM role WHERE id = ?', [id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.log('Role deleted!');
            }
        });
    },
    viewTotalDeptBudget: function (db, department_id) {
        db.query('SELECT SUM(salary) FROM role WHERE department_id = ?', [department_id], function (err, results) {
            if (err) {
                throw err
            } else {
                console.table(results);
            }
        });
    }

};



module.exports = queryList; 