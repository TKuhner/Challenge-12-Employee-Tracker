// db connection
const db = require('./public/js/connect.js');

// inquirer prompts
const controller = require('./public/js/control.js');


const init = async () => {
    console.log("Welcome to the Employee Tracker!");
    try {
        await db.connect();
    } catch (err) {
        console.log(err);
    } 
};

