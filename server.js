const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer();

server.listen(port);