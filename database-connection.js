const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mappie-yuan', {useMongoClient:true})

mongoose.Promise = global.Promise
