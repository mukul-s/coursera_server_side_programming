const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyparser = require('body-parser');

// server configurartions
const hostname = 'localhost';
const port = '8080'

// We are going to use express in our app
const app = express();

// user morgan for logging, dev provide additional information
app.use(morgan('dev'));

// use body parser to parse the request body to json and insert into the req.body attribute
app.use(bodyparser.json());

// now serving api endpoints, api all executed first and for all requests
app.all('/dishes', (req, res, next) => {
    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/plain');

    // going to next method having addressable api endpoint(GET)
    next();
});

// serving get request
app.get('/dishes', (req, res, next) => {
    res.end("Will send all the dishes to you");
});

// serving post request
app.post('/dishes', (req, res, next) => {
    // Here we are assuming after parsing our json (used for post), will have name and description 
    // which will be parse in request body by "bodyparser"
    res.end("You have tried to add this dish " + req.body.name + " having description " + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = '403';
    res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});


// serving for specific dishes
app.get('/dishes/:dishid', (req, res, next) => {
    res.end("Getting you the details of "+req.params.dishid);
});


app.post('/dishes/:dishid', (req, res, next) => {
    res.statu = '403';
    res.end("POST operation is not supported for dishes/" + req.params.dishid)
});

app.put('/dishes/:dishid', (req, res, next) => {
    res.end('Updating details of for following dish '+ req.params.dishid + " and setting it to name:"+req.body.name
        +"description:"+req.body.description);
});

app.delete('/dishes/:dishid', (req, res, next) => {
    res.end('Deleting dish:'+req.params.dishid);
});



// serving html files using express
app.use(express.static(__dirname + '/public'));

// our app
app.use((req, res, next) => {

    // now we don't need to log the whole request, morgna will provide
    // us relevant looging 
    /*console.log(req.headers);*/

    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body>this is express server</body></html>');
});




// build the callback for our server
const server = http.createServer(app);


server.listen(port, hostname, () => {
    console.log(`our server is running at https://${hostname}:${port}`);
});