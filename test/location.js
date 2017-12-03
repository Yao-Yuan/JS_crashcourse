import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Get list of addresses', async t=> {
    const locationToCreate = {Name: 'School', Coordinate: '52.5129789,13.3189357'}

    const create = await request(app)
        .post('/location')
        .send(locationToCreate)

    const res = await request(app)
        .get('/location')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length >0)
});

test('Add a new location', async t=>{
    const locationToCreate = {Name: 'School', Coordinate: '52.5129789,13.3189357'}

    const res = await request(app)
        .post('/location')
        .send(locationToCreate)

    t.is(res.status, 200)
    t.is(res.body.Name, locationToCreate.Name)
    t.is(res.body.Coordinate, locationToCreate.Coordinate)
});

test('Delete a location', async t => {
    t.plan(3)

    const location = (await request(app)
        .post('/location')
        .send({Name: 'School', Coordinate: '52.5129789,13.3189357'}))
        .body

    const del = await request(app)
        .delete(`/location/${location.id}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
    .get(`/location/${location.id}`)

    t.is(fetch.status, 404)
})

//clear function not tested
