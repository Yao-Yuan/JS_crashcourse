const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const LocationSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Coordinate: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        enum: ['Start', 'Pass', 'Destination'],
        default: 'Pass'
    }
})


LocationSchema.plugin(AutoIncrement, {inc_field: 'id'})
const LocationModel = mongoose.model('Place', LocationSchema)

module.exports = LocationModel
