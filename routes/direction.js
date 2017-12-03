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

    if(!places) {const response ='Please input addresses you want to go.'
                  res.send(response)}
   

       else if(places.length === 1){                        //Check no. of places   
         const response = 'Just stay there, you do not need me.'
         console.log('only one place')
         res.send(response)
          }

        else if(places.length === 2){                    //Simple fetch direction
           direction = await DirectionService.getDirectionOne(places[0], places[1])             
           direction.steps.forEach(function(element){
                res.write(element.html_instructions + '\n')
                })
           res.write("You now have reached " + places[1].Name)
           res.send()
        }
          
          else if(places.length > 2){               //Fetch directions along the given path  
            const placeStack = LocationService.sortbyType(places);      

            for(i = 0; i<placeStack.length-1; i++){    //Fetch direction in order
               direction[i] = await DirectionService.getDirectionOne(placeStack[i], placeStack[i+1])
              direction[i].steps.forEach(function(element){
                res.write (element.html_instructions + '\n');
              })
              res.write ('You have now reached ' + placeStack[i+1].Name + '!\n\n' );
            }       
            res.send()
       }
    });
        
router.get('/flexible', async(req, res, next) =>{
    const places = await LocationService.findAll()

    if(!places) res.send('Please add places that you want to go!')
      else if(places.length == 2) res.send('Only two places are in the list. Flexible route not needed here.')
        else{
          const sorting = DirectionService.getFlexDirection(places)
          res.send(sorting)
        }


})






module.exports = router
