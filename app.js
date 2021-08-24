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

console.log(generatePage(profileName, github));

