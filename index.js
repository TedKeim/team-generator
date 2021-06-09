const generate_html = require('./src/generate_html')
const Manager = require('./lib/manager')
const engineer = require('./lib/engineer')
const intern = require('./lib/intern')

const inquirer = require('inquirer')
const fs = require('fs')

const teamArray = [];


// inquirer questions
// start team with manager, then enginner + intern

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'who is the manager of this team?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter the managers name");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'please enter the managers ID number.',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log ('enter the managers id number')
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'enter the managers email'
            // if possible add validate function to check email
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('enter an office number')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then (managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager);
        console.log(manager);
    })
};

const addEmployee = () => {
    console.log('Add another employee to your team!');

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'what is this employees job?',
            choices: ['engineer', 'intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'what is this employees name',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('enter an employees name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            meesage: 'what is this employees ID',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('enter the employees id')
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'enter this employees email'
            // add function to validate email
        },
        {
            type: 'input',
            name: 'github',
            message: 'enter this employees github username',
            when: (input) => input.role === "engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('enter the employees github username')
                }
            }
        },
        {
            type:'input',
            name: 'school',
            message: 'enter what school this employee attended',
            when: (input) => input.role === 'intern',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('enter the employees school')
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'would you like to add more team members?'
        }
    ])
    .then(employeeData => {
        let { name, id, email, role, github, confirmAddEmployee } = employeeData;
        let employee;

        if (role === 'engineer') {
            employee = new engineer (name, id, email, github);
            console.log(employee);

        } else if (role === 'intern') {
            employee = new intern (name, id, email);
            console.log(employee);
        }

        teamArray.push(employee);

        if (confirmAddEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray;
        }
    })
};

// function to generate HTML page

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('your team has been successfully created!')
        }
    })
};

addManager()
.then(addEmployee)
.then(teamArray => {
    return generate_html(teamArray);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.catch(err => {
    console.log(err);
});