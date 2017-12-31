const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const dishRouter = require('./routes/dishRouter')

// server configurartions
const hostname = 'localhost';
const port = '8080'

// We are going to use express in our app
const app = express();

// user morgan for logging, dev provide additional information
app.use(morgan('dev'));

// use body parser to parse the request body to json and insert into the req.body attribute
app.use(bodyparser.json());

// mounting dishRouter for '/dishes' api endpoints
app.use('/dishes', dishRouter);


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