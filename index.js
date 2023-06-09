const inquirer = require('inquirer');
const mysql = require('mysql2');
const { table } = require('console.table');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});



// ASCII logo
const logo = `

$$$$$$$$\\                         $$\\                                         
$$  _____|                        $$ |                                        
$$ |      $$$$$$\\$$$$\\   $$$$$$\\  $$ | $$$$$$\\  $$\\   $$\\  $$$$$$\\   $$$$$$\\  
$$$$$\\    $$  _$$  _$$\\ $$  __$$\\ $$ |$$  __$$\\ $$ |  $$ |$$  __$$\\ $$  __$$\\ 
$$  __|   $$ / $$ / $$ |$$ /  $$ |$$ |$$ /  $$ |$$ |  $$ |$$$$$$$$ |$$$$$$$$ |
$$ |      $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$   ____|$$   ____|
$$$$$$$$\\ $$ | $$ | $$ |$$$$$$$  |$$ |\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$\\ \\$$$$$$$\\ 
\\________|\\__| \\__| \\__|$$  ____/ \\__| \\______/  \\____$$ | \\_______| \\_______|
                        $$ |                    $$\\   $$ |                    
                        $$ |                    \\$$$$$$  |                    
                        \\__|                     \\______/                     
      $$$$$$$$\\                               $$\\                             
      \\__$$  __|                              $$ |                            
         $$ |    $$$$$$\\   $$$$$$\\   $$$$$$$\\ $$ |  $$\\  $$$$$$\\   $$$$$$\\    
         $$ |   $$  __$$\\  \\____$$\\ $$  _____|$$ | $$  |$$  __$$\\ $$  __$$\\   
         $$ |   $$ |  \\__| $$$$$$$ |$$ /      $$$$$$  / $$$$$$$$ |$$ |  \\__|  
         $$ |   $$ |      $$  __$$ |$$ |      $$  _$$<  $$   ____|$$ |        
         $$ |   $$ |      \\$$$$$$$ |\\$$$$$$$\\ $$ | \\$$\\ \\$$$$$$$\\ $$ |        
         \\__|   \\__|       \\_______| \\_______|\\__|  \\__| \\_______|\\__|                                                                        
         
`;

let logoDisplayed = false;

function startPrompt() {

    if (!logoDisplayed) {
        console.log(logo);
        logoDisplayed = true;
    }

    console.log('\n--------------------------------------------------------------------------\n');

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log('Invalid selection');
                    break;
            }
        })
        .catch((error) => {
            console.error(error);
            connection.end();
        });
}

function viewAllDepartments() {
    const query = 'SELECT id, name AS department_name FROM department';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving departments: ', error);
            return;
        }

        console.log('\nAll Departments:\n');
        console.table(results);

        startPrompt();
    });
}

function viewAllRoles() {
    const query = `
      SELECT role.id, role.title AS job_title, department.name AS department_name, role.salary
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving roles: ', error);
            return;
        }

        console.log('\nAll Roles:\n');
        console.table(results);

        startPrompt();
    });
}

function viewAllEmployees() {
    const query = `
      SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title AS job_title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM
        employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving employees: ', error);
            return;
        }

        console.log('\nAll Employees:\n');
        console.table(results);

        startPrompt();
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
                validate: (input) => {
                    if (input.trim() === '') {
                        return 'Please enter a valid department name.';
                    }
                    return true;
                },
            },
        ])
        .then((answers) => {
            const query = 'INSERT INTO department (name) VALUES (?)';
            const departmentName = answers.departmentName;

            connection.query(query, [departmentName], (error, _results) => {
                if (error) {
                    console.error('Error adding department: ', error);
                    return;
                }

                console.log(`\nDepartment '${departmentName}' added successfully.`);
                startPrompt();
            });
        })
        .catch((error) => {
            console.error(error);
            startPrompt();
        });
}

function addRole() {
    const departmentQuery = 'SELECT id, name FROM department';
  
    connection.query(departmentQuery, (error, departments) => {
      if (error) {
        console.error('Error retrieving departments: ', error);
        startPrompt();
        return;
      }
  
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the title of the role:',
            validate: (input) => {
              if (input.trim() === '') {
                return 'Please enter a valid role title.';
              }
              return true;
            },
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the salary for the role:',
            validate: (input) => {
              if (!input.match(/^\d+$/)) {
                return 'Please enter a valid salary (numeric value).';
              }
              return true;
            },
          },
          {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for the role:',
            choices: departments.map((department) => ({
              name: department.name,
              value: department.id,
            })),
          },
        ])
        .then((answers) => {
          const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
          const roleTitle = answers.roleTitle;
          const roleSalary = parseInt(answers.roleSalary);
          const departmentId = answers.departmentId;
  
          connection.query(query, [roleTitle, roleSalary, departmentId], (error, _results) => {
            if (error) {
              console.error('Error adding role: ', error);
              return;
            }
  
            console.log(`\nRole '${roleTitle}' added successfully.`);
            startPrompt();
          });
        })
        .catch((error) => {
          console.error(error);
          startPrompt();
        });
    });
  }
  
  function addEmployee() {
    const rolesQuery = 'SELECT id, title FROM role';
    const employeesQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee';
  
    connection.query(rolesQuery, (error, roles) => {
      if (error) {
        console.error('Error retrieving roles: ', error);
        startPrompt();
        return;
      }
  
      connection.query(employeesQuery, (error, employees) => {
        if (error) {
          console.error('Error retrieving employees: ', error);
          startPrompt();
          return;
        }
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Enter the employee\'s first name:',
              validate: (input) => {
                if (input.trim() === '') {
                  return 'Please enter a valid first name.';
                }
                return true;
              },
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Enter the employee\'s last name:',
              validate: (input) => {
                if (input.trim() === '') {
                  return 'Please enter a valid last name.';
                }
                return true;
              },
            },
            {
              type: 'list',
              name: 'roleId',
              message: 'Select the role for the employee:',
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
            {
              type: 'list',
              name: 'managerId',
              message: 'Select the manager for the employee:',
              choices: [
                { name: 'None', value: null },
                ...employees.map((employee) => ({
                  name: employee.manager,
                  value: employee.id,
                })),
              ],
            },
          ])
          .then((answers) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            const firstName = answers.firstName;
            const lastName = answers.lastName;
            const roleId = answers.roleId;
            const managerId = answers.managerId;
  
            connection.query(query, [firstName, lastName, roleId, managerId], (error, _results) => {
              if (error) {
                console.error('Error adding employee: ', error);
                return;
              }
  
              console.log(`\nEmployee '${firstName} ${lastName}' added successfully.`);
              startPrompt();
            });
          })
          .catch((error) => {
            console.error(error);
            startPrompt();
          });
      });
    });
  }
  
  function updateEmployeeRole() {
    const employeesQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS employee FROM employee';
    const rolesQuery = 'SELECT id, title FROM role';
  
    connection.query(employeesQuery, (error, employees) => {
      if (error) {
        console.error('Error retrieving employees: ', error);
        startPrompt();
        return;
      }
  
      connection.query(rolesQuery, (error, roles) => {
        if (error) {
          console.error('Error retrieving roles: ', error);
          startPrompt();
          return;
        }
  
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employeeId',
              message: 'Select the employee to update:',
              choices: employees.map((employee) => ({
                name: employee.employee,
                value: employee.id,
              })),
            },
            {
              type: 'list',
              name: 'roleId',
              message: 'Select the new role for the employee:',
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
          ])
          .then((answers) => {
            const { employeeId, roleId } = answers;
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  
            connection.query(query, [roleId, employeeId], (error, _results) => {
              if (error) {
                console.error('Error updating employee role: ', error);
                return;
              }
  
              console.log('\nEmployee role updated successfully.');
              startPrompt();
            });
          })
          .catch((error) => {
            console.error(error);
            startPrompt();
          });
      });
    });
  }
  

function init() {
    connection.connect((error) => {
        if (error) {
            console.error('Error connecting to the database: ', error);
            return;
        }
        console.log('Connected to the database');
        startPrompt();
    });
}

init();

