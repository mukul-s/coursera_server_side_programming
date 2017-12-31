const express = require('express');
const http = require('http');


// server configurartions
const hostname = 'localhost';
const port = '8080'

// We are going to use express in our app
const app = express()

// Our app
app.use((req, res, next) => {
    console.log(req.headers);

    res.statusCode = '200';
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body>this is express server</body></html>');
});


// build the callback for our server
const server = http.createServer(app);


server.listen(port, hostname, () => {
    console.log(`our server is running at https://${hostname}:${port}`);
});