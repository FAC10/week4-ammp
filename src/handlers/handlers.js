var fs = require('fs');
var path = require('path');
var handlers = module.exports = {};

handlers.handlersHomepage = function (request, response) {
  fs.readFile(path.join(__dirname, '../..', '/public.index.html')) function (err, file) {
    if (err) throw err;
    response.writeHead(200, {"content-type": "text/html"});
    response.end(file);
  });
}
