# Challenge-12-Employee-Tracker

## Description

The Employee Tracker System is a command-line application that allows users to manage employees, departments, and roles in a company. It provides various functionalities such as viewing employees, departments, and roles, adding new employees, departments, and roles, updating employee roles, and more.

## Installation

1. Clone the repository:

2. Navigate to the project directory:
3. Install the dependencies:
4. Set up the database:

- Make sure you have MySQL installed and running.
- Update the database configuration in the `server.js` file with your MySQL credentials.

5. Start the application: `node server.js`

## Usage

Upon starting the application, you will be presented with a list of options to choose from. Use the arrow keys to navigate through the options and press Enter to select an option. Here are the available options:

- View All Employees: Display a table of all employees in the company.
- View All Departments: Display a table of all departments in the company.
- View All Roles: Display a table of all roles in the company.
- Add Employee: Add a new employee to the system.
- Add Department: Add a new department to the system.
- Add Role: Add a new role to the system.
- Update Employee Role: Update the role of an existing employee.
- Exit: Quit the application.

Follow the on-screen prompts to input the required information for each operation.

## Dependencies

The Employee Management System is built using the following dependencies:

- [Inquirer.js](https://www.npmjs.com/package/inquirer): For interactive command-line user interface.
- [MySQL2](https://www.npmjs.com/package/mysql2): MySQL database driver.
- [console.table](https://www.npmjs.com/package/console.table): Display data in a table format on the console.

## Contributing

Contributions to the Employee Management System are welcome! If you find any bugs or want to suggest enhancements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).