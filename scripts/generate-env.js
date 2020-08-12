import Mustache from '../node-modules/mustache';
import fs from '../node_modules/fs'
export function generateEnv() {
  fetch('/tmp/environment.txt')
    .then((env) => {
      env.text()
    })
    .then((env) => {
      fetch('../src/environments/environment.mustache')
        .then((template) => {
        template.text()
      })
        .then((template) => {
          var output = Mustache.render(template, env);

          fs.writeFile('file.txt', output, (err) => {
            if(err) {
              throw err;
            }
            console.log("Data has been written to file successfully.");
          });

        })

  })
}

