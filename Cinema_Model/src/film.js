const fs = require('fs');

module.exports = class Film {
    constructor(no, name,date,time,room){
        this.No = no;
        this.name = name;
        this.time = time;
        this.room = room;
    }
}