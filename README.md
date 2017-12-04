# Mappie version 0.0.1

## Devoting to plan your travel

### Quick Start

#### Local
```
git clone https://github.com/Yao-Yuan/JS_crashcourse.git
cd JS_crashcourse
git checkout Project
npm install
node index.js
```
#### On Server

IP address is 159.89.16.186
Currently only accessible by contributor

### Usage

You can visit the following URLs:
-http://localhost:9999

You can search for places and add them to location database.
-http://localhost:9999/location

-http://localhost:9999/location/all

-http://localhost:9999/direction

Giving direction based on location database. The order is sequtial unless you set Type of a place as Start. 
-http://localhost:9999/direction/return

Add direction return to Start or the first place in database.
-http://localhost:9999/direction/flexible

Based on Start of first place, giving direction without order but hopefully route with least travel time.
-http://localhost:9999/direction/flexible/return

Add return route to direction/flexible

#### Multiple operations are supported in http://localhost:9999/location

Example usage
```
//Delete place with ID 12
axios.delete('/location/12').then(res => console.log(res.data))
//Delete all location data
axios.delete('/location/').then(res => console.log(res.data))

//Add Berlin to database    
axios.post('/location', {Name: 'Berlin', Coordinate: '52.52000659999999,13.404953999999975'}).then(res => console.log(res.data))

//Set place's type which has ID 27 as 'Start'
axios.post('/location/set27Start').then(res => console.log(res.data))

//Swap order of two places in database
axios.post('/swap:8;10').then(res => console.log(res.data))
```




