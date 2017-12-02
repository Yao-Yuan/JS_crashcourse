const fs = require('fs')

const DirectionModel = require('../models/direction-model')

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCQZFTZXjwBXhttTQjB2u8LjMZ1cpcde2o',
    Promise:Promise
  });

async function add(direction) {
    return DirectionModel.create(direction)
}

async function findAll() {
    return DirectionModel.find()
}

async function del(id) {
    return DirectionModel.remove({ id })
}

async function clear(id) {
    return DirectionModel.remove({})
}

async function getDirectionOne(From, To){
    return new Promise((resolve, reject) =>{
        googleMapsClient.directions({
             origin: From.Coordinate,
             destination: To.Coordinate,
             mode: 'transit',
             alternatives: true,
             transit_mode: ['subway', 'bus'],
             transit_routing_preference: 'fewer_transfers',
        }).asPromise()
        .then((response) => {
            if(response){
            const directionData =  response.json.routes[0].legs[0]
            const direction = new DirectionModel({start: From, end: To,
                                distance: directionData.distance, duration: directionData.duration,
                                     steps:directionData.steps  })
            resolve(direction);
            }
            else reject("Oops there is no public transport from " + 
                 From.Name + " to " + 
                To.Name);
        })
        .catch((err) => {
           console.log("An error in single direction fetch \n" )
        })
    
    })}



    module.exports = {
        add,
        findAll,
        del,
        clear,
        getDirectionOne
    }
