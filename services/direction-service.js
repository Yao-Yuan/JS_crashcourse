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

async function getDirectionOne(From, To){           //Get direction from A to B. Further: implement other transport mode and have option of preferences
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
            else reject("Oops, there is no public transport from " + 
                 From.Name + " to " + To.Name);
        })
        .catch((err) => {
           console.log("An error in single direction fetch from " + From.Name + " to " + To.Name )
        })
    
    })}

async function getFlexDirection(places,returnFlag) {        //Naive implementation: local optimal path -- always find the nearest one
    return new Promise(async (resolve, reject) => {
        var duration = [];
        var direction = [];
        var route = [];
        const placesNum = places.length;
        const startBase = places[0];
        for(i=0; i<placesNum - 1; i++){
            for(j=0; j<places.length-1; j++)
            {
                direction[j] = await getDirectionOne(places[0], places[j+1]);
                duration.push({index: j, value: direction[j].duration.value, end: direction[j].end.Name});
            }
    
            duration.sort(function(durationA, durationB){
                return durationA.value - durationB.value
            })
    
            const index = duration[0].index;
           route.push(direction[index])
            const buffer = places[index+1];
    
            places.splice(index+1, 1);      //delete itself from places array
            places.splice(0, 1, buffer);    //replace first place by the last closest place
            duration = [];
        }
        if(returnFlag){
        const backRoute = await getDirectionOne(places[0], startBase);   //route back to places[0]
        route.push(backRoute)
        }
        resolve(route)
        })
}

    module.exports = {
        add,
        findAll,
        del,
        clear,
        getDirectionOne,
        getFlexDirection
    }
