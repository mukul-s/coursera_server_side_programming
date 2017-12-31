const express = require('express');
const http = require('http');
const morgan = require('morgan')

// server configurartions
const hostname = 'localhost';
const port = '8080'

// We are going to use express in our app
const app = express();

// user morgan for logging, dev provide additional information
app.use(morgan('dev'));

// serving html files using express
app.use(express.static(__dirname+'/public'));

// Our app
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