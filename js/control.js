
const inquirer = require('inquirer');
const inputList = require('./inputList.js');
const queryList = require('./queryList.js');
const { start } = require('repl');
const delay = ms => new Promise(res => setTimeout(res, ms));

async function startPrompt (db){ 
    await delay(100);
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
                    startPrompt(db);
                    break;
                case 'View All Departments':
                    queryList.viewAllDepartments(db);
                    startPrompt(db);
                    break;
                case 'View All Roles':
                    queryList.viewAllRoles(db);
                    startPrompt(db);
                    break;
                default:
                    console.log('Error');
            }
        })
       
};
module.exports = { startPrompt };