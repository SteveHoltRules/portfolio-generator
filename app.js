const inquirer = require('inquirer');

const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template.js');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      //validate creates a new variable that has a name. 
      //what this means is that this section is expecting a value before
      //the user can move past it. If nothing is received the code is stalled`
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: gitHubUserNameInput => {
        if (gitHubUserNameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub User Name');
          return false;
        }
      }
    },
    {
      //type is confirm: confirm answer type automatically turns y to true and n to false
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      //default true means that the code returns true so that it can contine to the next line. The user input is evaluated in the next section.
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }

    }
  ]);
};


const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Please enter a project description');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: gitHublink => {
        if (gitHublink) {
          return true;
        } else {
          console.log('Please enter a gitHub link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    //generate page is the export of page-template
    return generatePage(portfolioData);
  })
  .then(pageHtml => {
    //writeFile comes from the generate-site
    return writeFile(pageHtml);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    //copyFile comes from the generate-site
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });


// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     console.log(portfolioData);
//     // const pageHTML = generatePage(profileName, github);
//     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) {
//         console.log(err);
//         return;
//       }

//       console.log('Page created! Check out the index.html to see the output!')


//       fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('Style sheet copied successfully!');
//       });
//     });
//   });