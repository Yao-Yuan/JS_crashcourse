const fs = require('fs')

const LocationModel = require('../models/location-model')

async function findAll() {
    return LocationModel.find()
}

async function add(location) {
    return LocationModel.create(location)
}

async function del(id) {
    return LocationModel.remove({ id })
}

async function clear(id) {
    return LocationModel.remove({})
}

module.exports = {
    findAll,
    add,
    del,
    clear
}
