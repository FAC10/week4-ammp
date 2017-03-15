var fs = require('fs');
var path = require('path');
var handlers = module.exports = {};
var querystring = require('querystring');
var url = require('url');

handlers.serveHomepage = function (request, response) {
  fs.readFile(path.join(__dirname, '../..', '/public/index.html'), function (err, file) {
    if (err) throw err;
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(file);
  });
};

handlers.serveAssets = function (request, response) {
  // console.log(request.url);
  fs.readFile(path.join(__dirname, '../../public', request.url), function (err, file) {
    if (err) throw err;
    var extension = request.url.split('.')[1];
    var extensionType = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'ico': 'image/x-icon'
    };

    response.writeHead(200, {'content-type': extensionType[extension]});
    response.end(file);
  });
};



handlers.serveResult = function (request, response) {
  // console.log('handler', request.url);

  var searchQuery = url.parse(request.url, true).query.search;
  console.log(searchQuery);

  // fs.readFile(path.join(__dirname, '../../public', request.url), function (err, file) {
  //   if (err) throw err;
  //
  //   response.writeHead(200, {'content-type': extensionType[extension]});
  //   response.end(file);
  // });
};





handlers.pageNotFound = function(request, response) {
  response.writeHead(404, { 'content-type': 'text/html' });
  response.write('<h1>404 Page Requested Cannot Be Found</h1>');
  response.end();
};
