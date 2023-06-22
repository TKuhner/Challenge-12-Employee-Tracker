
const inquirer = require('inquirer');
const inputList = require('./inputList.js');
const queryList = require('./queryList.js');
const { start } = require('repl');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function startPrompt(db) {
    await delay(100);
    const userInput = await inquirer.prompt([
      {
        name: 'userInput',
        type: 'list',
        message: 'What would you like to do?',
        choices: inputList.inputList
      }
    ]);
  
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
          queryList.addEmployee(db);
          break;
        case 'Add Department':
          const deptName = await addDepartment();
          queryList.addDepartment(db, deptName);
          break;
        case 'Add Role':
          const role = await addRole(db);
          queryList.addRole(db,role);
          break;
        default:
          console.log('Error');
      }
      startPrompt(db); // Recursive call
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

async function addRole(db) {
    try {
        const depts = queryList.getAllDepartments(db);
        console.table(depts);
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'What is the department id of the role?', 
                name: 'department_id'
            }
        ]);
        if (typeof response.title !== 'string'&& typeof response.salary !== 'number' && typeof response.department_id !== 'number') {
            throw new Error('Please enter a valid input');
            startPrompt();
        }
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}



module.exports = { startPrompt };