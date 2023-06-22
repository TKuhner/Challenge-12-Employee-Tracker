
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
    getAllDepartments: function(db) {
        db.query('SELECT * FROM department', function(err, results) {
            return results;
        });
    },
    viewAllRoles: function(db) {
        db.query('SELECT * FROM role', function(err, results) {
            console.table(results);
        });
    },
    addEmployee: function(db) {

        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) ', function(err, results) {
            console.table(results);
        });
    },
    addDepartment: function(db, departmentName) {
        db.query('INSERT INTO department (department_name) VALUES (?)', [departmentName], function(err, results) {
            if (err) throw err;
        });
    },
    addRole: function(db, role) {
        // db.query('INSERT INTO role (title, salary, department_id) VALUES (?)', [role], function(err, results) {
        //     if (err) throw err;
        // });
    }
};



module.exports = queryList; 