const express = require('express')
const router = express.Router()

const LocationService = require('../services/location-service')

router.get('/', async (req, res, next) => {
    res.send(await LocationService.findAll())
})

router.get('/all', async (req, res, next) => {
    const places = await LocationService.findAll()
    res.render('location-list', {places})
})

router.post('/', async (req, res, next) => {
    const place = await LocationService.add(req.body)
    res.send(place)
})

router.get('/:id', async (req, res, next) => {
    const place = await LocationService.find(req.params.id)
    if(!place) res.status(404)
    res.send(place)
})

router.delete('/:id', async (req, res, next) => {
    await LocationService.del(req.params.id)
    res.send('ok!')
})

router.delete('/', async (req, res, next) => {
    await LocationService.clear()
    res.send('ok!')
})

router.post('/swap:idA:idB', async(req,res, next) => {
    await LocationService.swapOrder(req.params.idA, req.params.idB)
    res.send('ok!')
})

router.post('/set:id:type', async(req,res, next) =>{
    await LocationService.setType(req.params.id, req.params.type)
    res.send('ok!')
})

module.exports = router

    
