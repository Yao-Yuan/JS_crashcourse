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
    var direction = [];

    if(!places) {const response ='Please input addresses you want to go.'}
   

       else if(places.length === 1){                        //Check no. of places   
         const response = 'Just stay there, you do not need me.'
         console.log('only one place')
          }

        else if(places.length === 2){                    //Simple fetch direction
          console.log('I am here')
           direction = await DirectionService.getDirectionOne(places[1], places[2], function(err,result){
             if(!err){
             result.steps.forEach(function(element){
                res.write(element.html_instructions + '\n')
                })
             }
           });
          }

          else if(places.length > 2){               //Fetch directions along the given path     
            var response = '';     
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
            });

            for(i = 0; i<placeStack.length-1; i++){    //Fetch direction in order

               direction[i] = await DirectionService.getDirectionOne(placeStack[i], placeStack[i+1])
              direction[i].steps.forEach(function(element){
                  response+= (element.html_instructions + '\n');
              })
              response += ('You have now reached ' + placeStack[i+1].Name + '!\n\n' );
            }       
            console.log(response)
           // res.render('direction', {direction, placeStack, response})
            res.send(response)
       }
    });
        
router.get('/flexible', async(req, res, next) =>{})






module.exports = router
