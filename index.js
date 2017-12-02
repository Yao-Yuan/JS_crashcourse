const express = require("express")
const bodyParser = require('body-parser')
var app = express();
require('./database-connection')

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCQZFTZXjwBXhttTQjB2u8LjMZ1cpcde2o'
});

  app.engine('pug', require('pug').__express)
  app.set('view engine', 'pug')

  app.use(bodyParser.json())

  const location = require('./routes/location')
  const direction = require('./routes/direction')
  
  app.use('/location', location);
  app.use('/direction', direction);
  
  app.get('/', async (req, res, next) => {
    // res.sendFile(__dirname+'/index.html') 
     res.render('index')
      // res.send(await PersonService.findAll());
  })

  app.listen(9999, () => {
    console.log('Server listening.')
  })

// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });

var inOneHour = new Date().getTime() + 60 * 60 * 1000;

// googleMapsClient.directions({
//   origin: '52.544934,13.358144',
//   destination: '52.5696963,13.3013433',
//   //origin: 'Town Hall, Sydney, NSW',
//   //destination: 'Parramatta, NSW',
//   //arrival_time: inOneHour,
//   mode: 'transit',
//   alternatives: true,
//   transit_mode: ['bus', 'rail'],
//   transit_routing_preference: 'fewer_transfers',
// }, function(err, response){
//   if(!err) {
//     console.log(response.json.routes[0].legs[0]);
//   }
// })

// googleMapsClient.distanceMatrix({
//   origins: ['52.544934,13.358144', '52.544934,13.358144'],
//   destinations: ['52.556179,13.341402', '52.556179,13.341402'],
//   arrival_time: inOneHour,
//   mode: 'transit',
//   transit_mode: ['bus', 'rail'],
//   transit_routing_preference: 'fewer_transfers'
// }, function(err, response){
//   if(!err)
//     console.log(JSON.stringify(response.json.rows))
// })
