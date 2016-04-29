const http = require('http');

const hostname = '127.0.0.1';
const portS1 = 3000;
const portS2 = 3001;

const array = []; // Our array that will live in RAM until the server restarts

// Reuse the processing request for each server
const app = function(req, res, time) {

    array.push(""); // appending a new entry in to our array
    const arraySize = array.length; // counting how many items do we have in the array

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(arraySize.toString()); // displaying the size of our array

};

// Reuse the log for each server
const serverListentLog = function(port) {
    console.log(`Server running at http://${hostname}:${port}/`);
}


// Create 2 servers
const server1 = http.createServer(app);
const server2 = http.createServer(app);

// Start listening on the same host but on different ports
server1.listen(portS1, hostname, serverListentLog(portS1));
server2.listen(portS2, hostname, serverListentLog(portS2));
