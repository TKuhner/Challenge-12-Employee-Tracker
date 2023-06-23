// db connection
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const controller = require('./js/control.js');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // Add Your MySQL Password Here
    password: '1234',
    database: 'employeetracker_db'
});

const init = async () => {
    console.log('Welcome to the Employee Tracker!');
    try {
        await controller.startPrompt(db);
    }catch (err){
        console.log(err);
    }
}; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    init();
});