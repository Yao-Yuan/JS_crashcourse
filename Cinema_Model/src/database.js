const fs = require('fs');
const input_persondir = './database/ini_person.json' 
const Person_datadir = './database/person_data.json' 
const Person_outdir = './database/saved_data'
const Film_datadir = './database/filmdata.json'  
const exec = require('child_process').exec;
const chalk = require('chalk');

/*            Database Operation        */
exports.Init_database = function Init_database(){           //Load data from initial personnel list;
    var input = load_data(input_persondir);
    fs.copyFileSync(input_persondir, Person_datadir);

    if(input == null)   return;
        else  fs.writeFileSync(Person_datadir, JSON.stringify(input));
}

exports.Save_database = function Save_database(){           // Rename filename to prevent overwrite in next execution
    fs.renameSync(Person_datadir, Person_outdir + getTime() + '.json');
}

exports.Delete_database = function Delete_database(){       // Delete all saved files
    exec('find ./database | grep saved_data | xargs rm');
}

exports.Print_database = function Print_database(arg){      // Print worker list or film list    arg = 'Worker_database' or else
    if(arg == 'Worker_database')
    {
        console.log(chalk.white.bgGreen('                   Current Personnel                 '));
    var data = load_data(Person_datadir);
    }
    else 
    {
        console.log(chalk.bgMagenta('                          Movie List                     '));
        var data = load_data(Film_datadir);
    }
    console.log(data);
}

/*           Operation of worker list         */
exports.add_worker = function add_worker(worker){          // Add a worker to database
    var workerlist = load_data(Person_datadir);
    if(workerlist == null) 
        fs.writeFileSync(Person_datadir, '['+JSON.stringify(worker)+']');
    else { 
    workerlist[workerlist.length] = worker;   
    fs.writeFileSync(Person_datadir, JSON.stringify(workerlist));
    }
}

exports.delete_worker = function delete_worker(worker){   // Delete a worker from database
    var workerlist = load_data(Person_datadir);
    for (var i = workerlist.length-1; i>-1; i--){
     if(workerlist[i].name.match(worker.name))
     {
         workerlist.splice(i,1);
         fs.writeFileSync(Person_datadir, JSON.stringify(workerlist));
         return 1;
     }
    }   
    return 0;
}

/*          Film list operation       */
exports.load_film = function load_film(){                // Load film list from database
    return load_data(Film_datadir);
}

/*         Local function             */

load_data= function load_data(database){                // General load data from database, return null if empty
    var data = fs.readFileSync (database, 'utf8');
   if (!data.length)
         return null;
     else 
         return JSON.parse(fs.readFileSync (database, 'utf8'));
}

function getTime(){                                    // Get system time for naming saved files.
    var date = new Date();
    var current_hour = date.getHours();
    var current_min = date.getMinutes();
    var current_second = date.getSeconds();
    return current_hour + ':' + current_min + ':' + current_second;
}