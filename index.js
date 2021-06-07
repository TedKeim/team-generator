const generate_html = require('./src/generate_html')

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
    
}