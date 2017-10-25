const person = require('./src/person');
const Database = require('./src/database');
const chalk = require('chalk');

Database.Init_database();

console.log(chalk.white.bgCyan.bold('                    Welcome to JS Cinema                   '));
console.log(chalk.gray('Waiting for some personnel changes'));

/*     Personnel Change        */
const Miles = new person.Manager('Miles', 29);
const Tom = new person.Worker('Tom', 29);
const Barbara = new person.Worker('Barbara', 34);
const Mary = new person.Worker('Mary', 19);
const Jim = new person.Worker('Jim', 23);

Miles.hire(Tom);
Miles.hire(Barbara);
Miles.hire(Jim);
Miles.hire(Mary);
Miles.assign(Jim, 'ticket seller');
Miles.fire(Tom);
Barbara.resign();
Miles.set_salary(Mary, 3000);

/*     Print Database of Employees and Movies     */
Database.Print_database('Worker_database');
Database.Print_database('Film_database');

Database.Save_database();   //Save current database

//Database.Delete_database();  // Uncomment this line to delete all generated files

console.log(chalk.red('Enjoy your movie!'));
