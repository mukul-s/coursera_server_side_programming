const express = require('express');
const bodyparser = require('body-parser');

// importing dishrouter to easily handle large number of api endpoints
const dishRouter = express.Router();

// to populate req.body  after parsing
dishRouter.use(bodyparser.json());

// chaining all rest methods in one api endpoint
dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');

    // going to next method having addressable api endpoint(GET)
    next();
})

// serving get request
.get((req, res, next) => {
    res.end("Will send all the dishes to you");
})

// serving post request
.post((req, res, next) => {
    // Here we are assuming after parsing our json (used for post), will have name and description 
    // which will be parse in request body by "bodyparser"
    res.end("You have tried to add this dish " + req.body.name + " having description " + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = '403';
    res.end('PUT operation not supported on /dishes');
})

.delete((req, res, next) => {
    res.end('Deleting all dishes');
});


// exporting disRouter, so it can be used in index.js
module.exports = dishRouter;