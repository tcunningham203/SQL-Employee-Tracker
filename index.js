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

