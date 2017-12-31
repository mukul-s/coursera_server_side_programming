const express = require('express');
const bodyparser = require('body-parser');


const leaderRouter = express.Router();

// to populate req.body  after parsing
leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res, next) => {
    res.end("Will send all the leaders to you");
})

.post((req, res, next) => {
    res.end("You have tried to add this leader: " + req.body.name + " having description: " 
    + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = '403';
    res.end('PUT operation not supported on /leaders');
})

.delete((req, res, next) => {
    res.end('Deleting all leaders');
})


leaderRouter.route('/:leaderid')
.all((req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end("Sending you the leader details with leaderid:"+req.params.leaderid);
})

.post((req, res, next) => {
    res.statusCode = '403';
    res.end("POST not supported for leaders/" + req.params.leaderid)
})

.put((req, res, next) => {
    res.end('Updated details for leaderid:'+req.params.leaderid+' as with name:'+req.body.name+' and description:'
        +req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting leader with leaderid:'+req.params.leaderid);
})



module.exports = leaderRouter;