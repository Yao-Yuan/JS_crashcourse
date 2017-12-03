const fs = require('fs')

const LocationModel = require('../models/location-model')

async function findAll() {
    return LocationModel.find()
}

async function add(location) {
    return LocationModel.create(location)
}

async function find(id) {
    return LocationModel.findOne({id})
}

async function del(id) {
    return LocationModel.remove({ id })
}

async function clear(id) {
    return LocationModel.remove({})
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

module.exports = {
    findAll,
    add,
    find,
    del,
    clear,
    sortbyType
}
