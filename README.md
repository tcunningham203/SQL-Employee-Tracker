# SQL-Employee-Tracker


## Description
A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

This particular version uses an ESL English learning school company for the placeholder departments, roles, and employees. More information about that in the "Usage" section.


## Table of Contents
- [Video](#video)
- [Usage](#usage)
- [Credits](#credits)


## Video

As per the instructions, there is no link to the deployed application as with the other projects. An instructional/demonstration video has been made to show how to use the application and what it can do. Due to the number of features that need to be demonstrated, the footage has been sped up by 2.5x in order to keep the video under 2 minutes. Click the screenshot to go to the youtube link, or click here: https://youtu.be/hGCKOsDxfIo

[![AppScreenshot1](/assets/screenshots/screenshot.png?raw=true)](https://youtu.be/hGCKOsDxfIo "Demonstration Video")




## Usage

1. Clone the repository to your computer.
2. Open a terminal window in the root folder.
3. Type "node index.js" into your console.
4. You will be greeted with a title logo "Employee Tracker" and a list of options.

You are able to view:

- All departments
- All roles
- All employees
- employees based on their manager
- employees based on their department
- the budget of a selected department

You are able to add:

- a department
- a role
- an employee

You are able to update:

- an employee's role
- an employee's manager

You are able to delete:

- a department
- a role
- an employee

5. After you have made your selection, follow the relevant prompts to view, add, update, or delete the relevant information.

To fill the database with information (so the app's functionality can be demonstrated), this database is filled with information for an ESL English school set in Japan. It features teaching staff for group lessons, 1 to 1 private lessons, Japanese support staff for retaining and obtaining new students, and part time staff for assisting teachers and cleaning. The teachers from both departments are managed by one person, and the Japanese staff and part timers are managed by another person. 



## Credits

Because previous projects also used Inquirer.js, I referenced that code regularly for this project. As the project went on, that code was replaced with code better suited for this project. 

I used various learning resources like Stack Overflow and W3 schools to help with random questions I had.

I used the Inquirer.js documentation a lot for this project to help create my code. 

I used this generator to make the logo: https://patorjk.com/software/taag/#p=display&h=0&v=0&f=Big%20Money-nw&t=Employee%0A%20Tracker

I used DBeaver for the entire project. It was really good at helping to visualize when the writing, updating, and deleting were working. 
