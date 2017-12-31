// importing http core module
const http = require('http');
const fs = require('fs')
const path = require('path')


// some other required variable
const hostname = "localhost";

// default port
const port = '8080';

// creating server 
const server = http.createServer((req, res) => {
    console.log("Requested url is"+req.url+" and request method is "+req.method);

    if(req.method == 'GET'){
        
        // checking if user requested a specific resource
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        // getting the absolute path of file
        var filepath = path.join(process.cwd(), './public', fileUrl);
        const fileExt = path.extname(filepath);

        console.log(filepath);
        // checking if the file requested have correct html
        if(fileExt == '.html'){

            // check if file exists
            fs.exists(filepath, (exists) => {
                if(!exists){
                    res.statusCode = '404';
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body> Erorr: 404 <br>'+ fileUrl +
                        ' not found</body></html>');

                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                // piping requested resource in resonse object
                fs.createReadStream(filepath).pipe(res);
            });

        }
        
        else{
            res.statusCode = '404';
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body> Erorr: 404 <br>'+ fileUrl +
                ' file requested is not an HTML file</body></html>');
        }
        
    }
    else{
        res.statusCode = '404'
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body> Erorr: 404 <br>'+ req.method +
            ' is not supported</body></html>');
    }
    
})

// start the server
server.listen(port, hostname, () => {
    console.log(`Our Url is https://${hostname}:${port}`);
});