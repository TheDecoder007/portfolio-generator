const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generate-site.js');

// const pageHTML = generatePage(name, github);

//Function to write inputs (name, github) into index.html page
// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });


//Function to run inquirer prompts for profile questions
const promptUser = () => {
return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
  //validate that the user enters something
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your Github Username!');
            return false
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
//WHEN - this question will only be asked if confirm is true from the confirmAbout question above
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
  
//Function to run inquirer prompts for project questions
const promptProject = portfolioData => {
  console.log(`
  =============
  Add a New Project
  =============
  `);
  
  
  //if theres no 'projects' array property, create one
  //only happens on first pass, if it happened every time, 
  //it would delete and replace previous project data
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  } 
  //adding project data to projects array (portfolioData)
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('You need to enter a project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the GitHub link!');
          return false
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


//USING PROMISES INSTEAD OF CALLBACK FUNCTIONS. 
//CALLBACK METHOD IS STILL IN mockData
//writeFile and copyFile Promises must be created(in generate-site.js)

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

  //MOCK DATA FOR TESTING (must comment out the promptUser() above)
    // const mockData = {
      
    //     name: 'Lernantino',
    //     github: 'lernantino',
    //     confirmAbout: true,
    //     about:
    //       'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
       
    //       projects: [
    //       {
    //         name: 'Run Buddy',
    //         description:
    //           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
    //         languages: ['HTML', 'CSS'],
    //         link: 'https://github.com/lernantino/run-buddy',
    //         feature: true,
    //         confirmAddProject: true
    //       },
    //       {
    //         name: 'Taskinator',
    //         description:
    //           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
    //         languages: ['JavaScript', 'HTML', 'CSS'],
    //         link: 'https://github.com/lernantino/taskinator',
    //         feature: true,
    //         confirmAddProject: true
    //       },
    //       {
    //         name: 'Taskmaster Pro',
    //         description:
    //           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
    //         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
    //         link: 'https://github.com/lernantino/taskmaster-pro',
    //         feature: false,
    //         confirmAddProject: true
    //       },
    //       {
    //         name: 'Robot Gladiators',
    //         description:
    //           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
    //         languages: ['JavaScript'],
    //         link: 'https://github.com/lernantino/robot-gladiators',
    //         feature: false,
    //         confirmAddProject: false
    //       }
    //     ]
    //   };

      // .then(promptProject)
      //   .then(mockData => {
      //     return generatePage(mockData);
      //   })
      //   .then(pageHTML => {
      //     return writeFile(pageHTML);
      //   })
      //   .then(writeFileResponse => {
      //     console.log(writeFileResponse);
      //     return copyFile();
      //   })
      //   .then(copyFileResponse => {
      //     console.log(copyFileResponse);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });


      // THIS WAS CHANGED INTO THE PROMISE STATEMENTS ABOVE(with generate-site.js)
//       const pageHTML = generatePage(mockData);
// //writes/creates new HTML in dist folder
//       fs.writeFile('./dist/index.html', pageHTML, err => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('Page created! Check out index.html in this directory to see it!');

// //copies style.css and creates file in dist folder      
//         fs.copyFile('./src/style.css', './dist/style.css', err => {
//           if (err) {
//             console.log(err);
//             return;
//           }
//           console.log('Style sheet copied successfully!');
//         });
//       });
 //END MOCK DATA   



//NOTES ON FOR LOOP
// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
