const fs = require('fs');

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [profileName, github] = profileDataArgs;

const generatePage = (userName, githubName) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Demo</title>
  </head>
  <body>
    <h1>${userName}
    <h2><a href="https://github.com/${githubName}">Github</a></h2>
    
  </body>
  </html>
  `;

};


fs.writeFile('index.html', generatePage(profileName, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out teh index.html to see the output!')
});

