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
}

exports.Manager = class Manager extends Person{                 // Manager class
    constructor(name, age){
        super(name, age);
        this.position = 'manager';
    }
    hire(worker){
        Database.add_worker(worker);
        console.log(chalk.cyan(worker.name) +chalk.green(' is hired'));
    }

    assign(worker, position){
        Database.delete_worker(worker);
        worker.position = position;
        Database.add_worker(worker);
        console.log(chalk.cyan(worker.name) + chalk.green(' is assigned as ') + chalk.cyan(position));
    }

    fire(worker){
        var a = Database.delete_worker(worker);
        if(a)
        console.log(chalk.cyan(worker.name) + chalk.red(' is fired'));
        else console.log('No such a employee');
    }

    set_salary(worker, salary){
        Database.delete_worker(worker);
        worker.salary = salary;
        Database.add_worker(worker);
    }
}


