
const inquirer = require('inquirer');
const inputList = require('./inputList.js');
const queryList = require('./queryList.js');

const startPrompt = (db) => {
    inquirer
        .prompt([{
            name: 'userInput',
            type: 'list',
            message: 'What would you like to do?',
            choices: inputList.inputList
        }])
        .then((userInput) => {
            switch (userInput.userInput) {
                case 'View All Employees':
                    queryList.viewAllEmployees(db);
                    break;
                case 'View All Departments':
                    queryList.viewAllDepartments(db);
                    break;
                case 'View All Roles':
                    queryList.viewAllRoles(db);
                    break;
                default:
                    console.log('Error');
            }

        })

}

module.exports = { startPrompt };