
const express = require('express')
const router = express.Router()

const LocationService = require('../services/location-service')
const DirectionService = require('../services/direction-service')

router.get('/all', async (req, res, next) => {
  const direction = await DirectionService.findAll()
  console.log(direction)
  res.render('direction-list', {direction})
})

router.delete('/:id', async (req, res, next) => {
  await DirectionService.del(req.params.id)
  res.send('ok!')
})

router.delete('/', async (req, res, next) => {
  await DirectionService.clear()
  res.send('ok!')
})

router.get('/', async(req, res, next) =>{
    const places = await LocationService.findAll()
    var routes = [];
    var time = 0;

    if(!places) res.send('Please input addresses you want to go.')

       else if(places.length === 1) res.send('Just stay there, you do not need me.')      //Check no. of places

        else if(places.length === 2){                    //Simple fetch direction
          const direction = await DirectionService.getDirectionOne(places[0], places[1])
          time = direction.duration.text;
          routes.push (direction)   
          res.render('direction', {routes, time})
        }
          
          else if(places.length > 2){               //Fetch directions along the given path  
            const placeStack = LocationService.sortbyType(places);    
            for(i = 0; i<placeStack.length-1; i++){    //Fetch direction in order
                 const direction = await DirectionService.getDirectionOne(placeStack[i], placeStack[i+1])
                 routes.push (direction)
                 time += direction.duration.value;
            }
            time = calculatTime(time)
            res.render('direction', {routes, time})
          }
});

router.get('/return', async(req, res, next) =>{
  const places = await LocationService.findAll()
  var routes = [];
  var time = 0;

  if(!places) res.send('Please input addresses you want to go.')

     else if(places.length === 1) res.send('Just stay there, you do not need me.')      //Check no. of places

      else if(places.length === 2){                    //Simple fetch direction
        const direction = await DirectionService.getDirectionOne(places[0], places[1])
        time = direction.duration.text;
        routes.push (direction)   
        res.render('direction', {routes, time})
      }
        
        else if(places.length > 2){               //Fetch directions along the given path  
          const placeStack = LocationService.sortbyType(places);    
          for(i = 0; i<placeStack.length-1; i++){    //Fetch direction in order
               const direction = await DirectionService.getDirectionOne(placeStack[i], placeStack[i+1])
               routes.push (direction)
               time += direction.duration.value;
          }
          const direction = await DirectionService.getDirectionOne(placeStack[placeStack.length-1], placeStack[0]);
          routes.push(direction)
          time += direction.duration.value;
          time = calculatTime(time)
          res.render('direction', {routes, time})
        }
});

router.get('/flexible', async(req, res, next) =>{
  const places = await LocationService.findAll()
  var time = 0;
  if(!places || places === 1) res.send('Please add places that you want to go!')
    else if(places.length === 2) res.send('Only two places are in the list. Flexible route not needed here.')
      else{
        const placeStack = await LocationService.sortbyType(places);
        const routes = await DirectionService.getFlexDirection(places)
        routes.forEach(function(route){
          time += route.duration.value
        })
        time = calculatTime(time)
        res.render('direction', {routes, time})
      }
})

router.get('/flexible/return', async(req, res, next) =>{
  const places = await LocationService.findAll()
  var time = 0;
  if(!places || places === 1) res.send('Please add places that you want to go!')
    else if(places.length === 2) res.send('Only two places are in the list. Flexible route not needed here.')
      else{
        const placeStack = await LocationService.sortbyType(places);
        const routes = await DirectionService.getFlexDirection(places, 1)

        routes.forEach(function(route){
          time += route.duration.value
        })
        time = calculatTime(time)
        res.render('direction', {routes, time})
      }
})

function calculatTime(time){
    var minute = Math.floor(time/60);
    const seconds = time % 60;
    const hour = Math.floor(minute/60)
    if(hour) minute = minute - hour * 60;
    const timeText = hour + " h " + minute +" m " + seconds + "s";
    return timeText
}
module.exports = router
