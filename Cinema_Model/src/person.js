const fs = require('fs');
const Database = require('./database');
const chalk = require('chalk');

 class Person  {                            
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
}

exports.Worker = class Worker extends Person{                    // employee class
    constructor(name,age,position, salary){
        super(name, age);
        this.position = position;
        this.salary = salary;
    }

    resign(){
        Database.delete_worker(this);
        console.log(chalk.cyan(this.name) + chalk.red(' resigned'));
    }

    static create(obj){
        return new Worker(obj.name, obj.age, obj.position, obj.salary);
    } 
}

exports.Manager = class Manager extends Person{                 // Manager class
    constructor(name, age){
        super(name, age);
        this.position = 'manager';
    }
    async hire(worker){
        var current_workers = await Database.load_personnel();
        current_workers[current_workers.length] = worker; 
        Database.save_personnel(current_workers);
        console.log(chalk.cyan(worker.name) +chalk.green(' is hired'));
        return current_workers;
    }

    async assign(worker, position){
        var current_workers = await Database.load_personnel();
        current_workers.forEach(function Search_assign(workerlist){
            if(workerlist.name.match(worker.name)){workerlist.position = position;}; 
            console.log(workerlist.name)
        });
            Database.save_personnel(current_workers);

        // Database.delete_worker(worker);
        // worker.position = position;
        // Database.add_worker(worker);
         console.log(chalk.cyan(worker.name) + chalk.green(' is assigned as ') + chalk.cyan(position));
    }

    // fire(worker){
    //     var a = Database.delete_worker(worker);
    //     if(a)
    //     console.log(chalk.cyan(worker.name) + chalk.red(' is fired'));
    //     else console.log('No such a employee');
    // }

    // set_salary(worker, salary){
    //     Database.delete_worker(worker);
    //     worker.salary = salary;
    //     Database.add_worker(worker);
    // }
}


