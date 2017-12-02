const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const DirectionSchema = mongoose.Schema({
    start: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    },        
    end: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    },  
    distance:{
        text: String,
        value: Number
    },
    duration:{
        text: String,
        value: Number
    },
    steps:[]
})

DirectionSchema.plugin(AutoIncrement, {inc_field: 'Id'})
const DirectionModel = mongoose.model('Direction', DirectionSchema)
 module.exports = DirectionModel
