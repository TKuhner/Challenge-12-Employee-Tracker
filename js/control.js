
const inquirer = require('inquirer');
const inputList = require('./inputList.js');
const queryList = require('./queryList.js');
const { start } = require('repl');
const { query } = require('express');
const delay = ms => new Promise(res => setTimeout(res, ms));

// async function to handle main prompt and call appropriate functions
async function startPrompt(db) {
    await delay(100);
    const userInput = await inquirer.prompt([
        {
            name: 'userInput',
            type: 'list',
            message: 'What would you like to do?',
            // inputList is an array of possible inputs for inquirer prompts
            choices: inputList.inputList
        }
    ]);

    // switch statement to handle user input
    const handleUserInput = async (userInput) => {
        switch (userInput) {
            case 'View All Employees':
                queryList.viewAllEmployees(db);
                break;
            case 'View All Departments':
                queryList.viewAllDepartments(db);
                break;
            case 'View All Roles':
                queryList.viewAllRoles(db);
                break;
            case 'Add Employee':
                const employee = await addEmployee(db);
                queryList.addEmployee(db, employee);
                break;
            case 'Add Department':
                const deptName = await addDepartment();
                queryList.addDepartment(db, deptName);
                break;
            case 'Add Role':
                const role = await addRole(db);
                queryList.addRole(db, role);
                break;
            case 'Update Employee Role':
                const updateEmployee = await updateEmployeeRole(db);
                queryList.updateEmployeeRole(db, updateEmployee.role_id, updateEmployee.id);
                break;
            case 'View Employees by Department':
                const depts = await viewEmployeesByDepartment(db);
                const queryDepts = queryList.viewEmployeesByDepartment(db, depts);
                console.table(queryDepts);
                break;
            case 'View Employees by Manager':
                const managers = await viewEmployeesByManager(db);
                queryList.viewEmployeesByManager(db, managers);
                break;
            case 'Delete Employee':
                const deleteEmp = await deleteEmployee(db);
                queryList.deleteEmployee(db, deleteEmp);
                break;
            case 'Delete Department':
                const deleteDept = await deleteDepartment(db);
                queryList.deleteDepartment(db, deleteDept);
                break;
            case 'Delete Role':
                const roleDel = await deleteRole(db);
                queryList.deleteRole(db, roleDel);
                break;
            case 'View Total Utilized Budget of Department':
                const deptBudget = await viewTotalDeptBudget(db);
                queryList.viewTotalDeptBudget(db, deptBudget);
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
            default:
                console.log('Error');
                break;
        }
        // Recursive call to startPrompt to continue asking user for input
        startPrompt(db); 
    };
    await handleUserInput(userInput.userInput);
}

async function addDepartment() {
    try {
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'departmentName'
            }
        ]);
        return response.departmentName;
    } catch (error) {
        console.error(error);
    }
}

async function addEmployee(db) {
    try {
        const roles = await queryList.getAllRoles(db);
        const rolesIds = roles.map(role => role.id);
        const employees = await queryList.getAllEmployees(db);
        const employeesIds = employees.map(employee => employee.id);
        console.log("Please note, that the ID of the role you select must be a corresponding number to this table.")
        console.table(roles);
        console.table(employees);
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'first_name'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'last_name'
            },
            {
                type: 'number',
                message: 'What is the role id of the employee?',
                name: 'role_id'
            },
            {
                type: 'number',
                message: 'What is the manager id of the employee?',
                name: 'manager_id'
            }
        ]);
        if (isNaN(response.role_id)) {
            console.log('Please enter a valid input');
            return;
        }
        if (isNaN(response.manager_id) === true) {
            response.manager_id = null;
        }

        if (!rolesIds.includes(response.role_id)) {
            console.log('Please enter a valid role id');
            return;
        } else {
            console.log('Employee added!');
            return response;
        }

    } catch (error) {
        console.error(error);
    }
}

async function addRole(db) {
    try {

        const depts = await queryList.getAllDepartments(db);
        const deptsIds = depts.map(dept => dept.id);
        console.log("Please note, that the ID of the department you select must be a corresponding number to this table.")
        console.table(depts);
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'title'
            },
            {
                type: 'number',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'number',
                message: 'What is the department id of the role?',
                name: 'department_id'
            }
        ]);
        if (isNaN(response.salary) || isNaN(response.department_id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!deptsIds.includes(response.department_id)) {
            console.log('Please enter a valid department id');
            return;
        } else {
            return response;
        }

    } catch (error) {
        console.error(error);
    }
}

async function deleteDepartment(db) {
    try {
        const departments = await queryList.getAllDepartments(db);
        const departmentsIds = departments.map(department => department.id);
        console.table(departments);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the department you would like to delete?',
                name: 'id'
            }
        ]);
        if (isNaN(response.id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!departmentsIds.includes(response.id)) {
            console.log('Please enter a valid department id');
            return;
        } else {
            return response.id;
        }

    } catch (error) {
        console.error(error);
    }
}

async function deleteEmployee(db) {
    try {
        const employees = await queryList.getAllEmployees(db);
        const employeesIds = employees.map(employee => employee.id);
        console.table(employees);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the employee you would like to delete?',
                name: 'id'
            }
        ]);
        if (isNaN(response.id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!employeesIds.includes(response.id)) {
            console.log('Please enter a valid employee id');
            return;
        } else {
            return response.id;
        }

    } catch (error) {
        console.error(error);
    }
}

async function deleteRole(db) {
    try {
        const roles = await queryList.getAllRoles(db);
        const rolesIds = roles.map(role => role.id);
        console.table(roles);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the role you would like to delete?',
                name: 'id'
            }
        ]);
        if (isNaN(response.id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!rolesIds.includes(response.id)) {
            console.log('Please enter a valid role id');
            return;
        } else {
            return response.id;
        }

    } catch (error) {
        console.error(error);
    }
}

async function viewEmployeesByDepartment(db) {
    try {
        const departments = await queryList.getAllDepartments(db);
        const departmentsIds = departments.map(department => department.id);
        console.table(departments);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the department you would like to view?',
                name: 'id'
            }
        ]);
        console.log(response.id);
        if (isNaN(response.id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!departmentsIds.includes(response.id)) {
            console.log('Please enter a valid department id');
            return;
        } else {
            console.log('Employees by department!');
            return response.id;
        }

    } catch (error) {
        console.error(error);
    }

}

async function viewEmployeesByManager(db) {
    try {
        const managers = await queryList.getAllManagers(db);
        const managersIds = managers.map(manager => manager.manager_id);
        console.table(managers);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the manager you would like to view?',
                name: 'id'
            }
        ]);
        if (isNaN(response.id)) {
            console.log('Please enter a valid input');
            return;
        }
        if (!managersIds.includes(response.id)) {
            console.log('Please enter a valid manager id');
            return;
        } else {
            return response.id;
        }

    } catch (error) {
        console.error(error);
    }
}

async function updateEmployeeRole(db) {
    try {
        const employees = await queryList.getAllEmployees(db);
        const employeesIds = employees.map(employee => employee.id);
        const roles = await queryList.getAllRoles(db);
        const rolesIds = roles.map(role => role.id);
        console.table(employees);
        console.table(roles);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the employee you would like to update?',
                name: 'id'
            },
            {
                type: 'number',
                message: 'What is the id of the role you would like to update the employee to?',
                name: 'role_id'
            }
        ]);
        if (isNaN(response.id) || isNaN(response.role_id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!employeesIds.includes(response.id)) {
            console.log('Please enter a valid employee id');
            return;
        } else if (!rolesIds.includes(response.role_id)) {
            console.log('Please enter a valid role id');
            return;
        } else {
            console.log('Employee role updated!');
            return response;
        }

    } catch (error) {
        console.error(error);
    }
}

async function viewTotalDeptBudget(db) {
    try {
        const departments = await queryList.getAllDepartments(db);
        const departmentsIds = departments.map(department => department.id);
        console.table(departments);
        const response = await inquirer.prompt([
            {
                type: 'number',
                message: 'What is the id of the department you would like to view?',
                name: 'id'
            }
        ]);
        if (isNaN(response.id)) {
            console.log('Please enter a valid input');
            return;
        }

        if (!departmentsIds.includes(response.id)) {
            console.log('Please enter a valid department id');
            return;
        } else {
            return response.id;
        }

    } catch (error) {
        console.error(error);
    }
}


module.exports = { startPrompt };