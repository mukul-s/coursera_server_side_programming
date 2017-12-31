const express = require('express');
const bodyparser = require('body-parser');


const dishRouter = express.Router();

// to populate req.body  after parsing
dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end("Will send all the dishes to you");
})

.post((req, res, next) => {
    res.end("You have tried to add this dish with dishname: " + req.body.name + 
    " and having description: " + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = '403';
    res.end('PUT operation not supported on /dishes');
})

.delete((req, res, next) => {
    res.end('Deleting all dishes');
})


dishRouter.route('/:dishid')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("Sending you the dish details with dishid:"+req.params.dishid);
})

.post((req, res, next) => {
    res.statusCode = '403';
    res.end("POST not supported for dishes/" + req.params.dishid)
})

.put((req, res, next) => {
    res.end('Updated details for dishid:'+req.params.dishid+' as with name:'+req.body.name+' and description:'
        +req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting dish with dishid:'+req.params.dishid);
})



module.exports = dishRouter;