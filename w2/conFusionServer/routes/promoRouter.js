const express = require('express');
const bodyparser = require('body-parser');


const promoRouter = express.Router();

// to populate req.body  after parsing
promoRouter.use(bodyparser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end("Will send all the promotions to you");
})

.post((req, res, next) => {
    res.end("You have tried to add this promotion: " + req.body.name + " having description: " + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = '403';
    res.end('PUT operation not supported on /promotions');
})

.delete((req, res, next) => {
    res.end('Deleting all promotions');
})


promoRouter.route('/:promoid')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("Sending you the promotion details with promoid:"+req.params.promoid);
})

.post((req, res, next) => {
    res.statusCode = '403';
    res.end("POST not supported for promotions/" + req.params.promoid)
})

.put((req, res, next) => {
    res.end('Updated details for promoid:'+req.params.promoid+' as with name:'+req.body.name+' and description:'
        +req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promotion with promoid:'+req.params.promoid);
})



module.exports = promoRouter;