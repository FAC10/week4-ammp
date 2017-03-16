var http = require('http');

var router = require('./router/router.js');

var port = process.env.PORT || 4000;

var server = http.createServer(router);
server.listen(port, function() {
  console.log('server is running on port:', port);
});
