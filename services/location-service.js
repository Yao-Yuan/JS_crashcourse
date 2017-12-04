const fs = require('fs')

const LocationModel = require('../models/location-model')

async function findAll() {
    return LocationModel.find()
}

async function add(location) {
    return LocationModel.create(location)
}

async function find(Name) {
    return LocationModel.findOne({Name})
}

async function del(id) {
    return LocationModel.remove({ id })
}

async function clear() {
    return LocationModel.remove({})
}

async function importAll(places) {
    if(places){
        const placeDB = [];
        if(places.constructor ===Array){
            places.forEach(function(place){
                placeDB.push = LocationModel.create(place)
            })
        }
        else {placeDB.push = LocationModel.create(place)}
        return placeDB
    }
    else console.log('Import from nothing!')
}

function sortbyType(places) {
    var placeStack = []; 
    places.forEach(function(element){       //Order adresses based on its Type
        if(element.Type === 'Start'){
          
          placeStack.splice(0, 0, element);
        }
        else if(element.Type ==='Destination'){
          placeStack.push(element);
        }
        else {
            if(placeStack.length>0){
                if(placeStack[placeStack.length-1].Type === 'Destination')
                    placeStack.splice(placeStack.length-2, 0, element )
                else placeStack.push(element);}
            else placeStack.push(element);
        }
      })
      return placeStack;
}

function swapOrder(indexA, indexB) {            //* further: add condition to prevent error
    const places = findAll();
    var temp = places[indexA];
    places[indexA] = places[indexB];
    places[indexB] = temp;
    console.log(JSON.stringify(places))
    clear();
    importAll(places);
}

async function setType(id, type){
    return LocationModel.findOneAndUpdate({id: id}, {Type: type})
}

module.exports = {
    findAll,
    add,
    find,
    del,
    clear,
    importAll,
    sortbyType,
    swapOrder,
    setType
}
