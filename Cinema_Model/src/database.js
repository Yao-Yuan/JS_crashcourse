const fs = require('fs');
const chalk = require('chalk');
const person = require('./person');
const exec = require('child_process').exec;

const input_persondir = './database/ini_person.json' 
const Person_datadir = './database/person_data.json' 
const Person_outdir = './database/saved_data'
const Film_datadir = './database/filmdata.json'  


/*            Database Operation        */
exports.init_personnel = async () => {           //Load data from initial personnel list;
    var loaded_person ;
    loaded_person = await load_data(input_persondir);
    loaded_person = loaded_person.map(person.Worker.create);
     create_list = await create_record();
    return loaded_person;
}

exports.load_personnel = async () => {           //Load data from initial personnel list;
    var loaded_person ;
    loaded_person = await load_data(Person_datadir);
    loaded_person = loaded_person.map(person.Worker.create);
    return loaded_person;
}

exports.save_personnel = async (workers) => {
    var saved_person = await save_data(Person_datadir, workers);
    return saved_person;
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
        load_data(Person_datadir)
            .then(console.log);
    }
    else 
    {
        console.log(chalk.bgMagenta('                          Movie List                     '));
        load_data(Film_datadir)
            .then(console.log)
    }
}

/*           Operation of worker list         */
// exports.add_worker = function add_worker(worker){          // Add a worker to database
//     var workerlist = load_data(Person_datadir);
//     if(workerlist == null) 
//         fs.writeFileSync(Person_datadir, '['+JSON.stringify(worker)+']');
//     else { 
//     workerlist[workerlist.length] = worker;   
//     fs.writeFileSync(Person_datadir, JSON.stringify(workerlist));
//     }
// }

// exports.delete_worker = function delete_worker(worker){   // Delete a worker from database
//     var workerlist = load_data(Person_datadir);
//     for (var i = workerlist.length-1; i>-1; i--){
//      if(workerlist[i].name.match(worker.name))
//      {
//          workerlist.splice(i,1);
//          fs.writeFileSync(Person_datadir, JSON.stringify(workerlist));
//          return 1;
//      }
//     }   
//     return 0;
// }

/*          Film list operation       */
exports.load_film = function load_film(){                // Load film list from database
    return load_data(Film_datadir);
}

/*         Local function             */
const load_data = async (database) => {                // General load data from database, return null if empty
   return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf8', (err, contents) =>{
           if(err) return reject(err);
           resolve(JSON.parse(contents));
       });
   });
}

const save_data = async (database, workers) => {
    return new Promise((resolve, reject) =>{
        fs.writeFile(database, JSON.stringify(workers), (err, contents) =>{
            if (err) return reject(err);
            resolve(contents);
        })
    })
}

const create_record = async () => {
    return new Promise((resolve, reject) => {
        fs.copyFile(input_persondir, Person_datadir, (err) => {
            if(err) return reject(err);
            resolve();
        });
    });
}
   

 /*  
    var data = fs.readFileSync (database, 'utf8');
   if (!data.length)
         return null;
     else 
         return JSON.parse(fs.readFileSync (database, 'utf8'));
}*/

function getTime(){                                    // Get system time for naming saved files.
    var date = new Date();
    var current_hour = date.getHours();
    var current_min = date.getMinutes();
    var current_second = date.getSeconds();
    return current_hour + ':' + current_min + ':' + current_second;
}

