# Challenge-12-Employee-Tracker

## Description

The Employee Tracker System is a command-line application that allows users to manage employees, departments, and roles in a company. It provides various functionalities such as viewing employees, departments, and roles, adding new employees, departments, and roles, updating employee roles, and more.

## Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install the dependencies and initialze the package manager:

- `npm install inquirer`
- `npm install mysql2`
- `npm install express`
- `npm i`

4. Set up the database:

- Make sure you have MySQL installed and running.
- Update the database configuration in the `server.js` file with your MySQL credentials.
- login to MySQL shell and run the following commands:

```source ./db/schema.sql;```

```source ./db/seeds.sql;```

```SET FOREIGN_KEY_CHECKS=0;```

5. Close sql shell and navigate to the project directory in the terminal.

6. Start the application: `node server.js` or 

## Usage

Upon starting the application, you will be presented with a list of options to choose from. Use the arrow keys to navigate through the options and press Enter to select an option. Here are the available options:

- Add Department: Add a new department to the system.
- Add Employee: Add a new employee to the system.
- Add Role: Add a new role to the system.
- Delete Department: Delete an existing department from the system.
- Delete Employee: Delete an existing employee from the system.
- Delete Role: Delete an existing role from the system.
- Update Employee Role: Update the role of an existing employee.
- View All Departments: Display a table of all departments in the company.
- View All Employees: Display a table of all employees in the company.
- View All Roles: Display a table of all roles in the company.
- View Employees by Department: Display a table of all employees in a department.
- View Employees by Manager: Display a table of all employees under a manager.
- View Total Utilized Budget by Department: Display the total utilized budget of a department.
- Exit: Quit the application.

Follow the on-screen prompts to input the required information for each operation.

## Dependencies

The Employee Management System is built using the following dependencies:

- [Inquirer.js](https://www.npmjs.com/package/inquirer): For interactive command-line user interface.
- [MySQL2](https://www.npmjs.com/package/mysql2): MySQL database driver.
- [console.table](https://www.npmjs.com/package/console.table): Display data in a table format on the console.

## License

This project is licensed under the [MIT License](LICENSE).