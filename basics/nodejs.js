const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const array = []; // Our array that will live in RAM untill the server restarts

const server = http.createServer((req, res) => {

  array.push(""); // appendign a new entry in to our array
  const arraySize = array.length; // countign how many items do we have in the array

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(arraySize.toString()); // displaying the size of our array

});

server.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);

});
