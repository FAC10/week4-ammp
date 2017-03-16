var fs = require('fs');
var path = require('path');
var handlers = module.exports = {};
var querystring = require('querystring');
var url = require('url');

handlers.serveHomepage = function(request, response) {
  fs.readFile(path.join(__dirname, '../..', '/public/index.html'), function(err, file) {
    if (err) console.log(err);
    response.writeHead(200, {
      'content-type': 'text/html'
    });
    response.end(file);
  });
};

handlers.serveAssets = function(request, response) {
  // console.log(request.url);
  fs.readFile(path.join(__dirname, '../../public', request.url), function(err, file) {
    if (err) console.log(err);
    var extension = request.url.split('.')[1];
    var extensionType = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'ico': 'image/x-icon'
    };

    response.writeHead(200, {
      'content-type': extensionType[extension]
    });
    response.end(file);
  });
};



handlers.serveResult = function(request, response) {
  var searchQuery = url.parse(request.url, true).query.search;
  var sanitisedSearchQuery = searchQuery.replace(/[^a-z]/gi, '');


  fs.readFile(path.join(__dirname, '..', 'words.txt'), 'utf8', function(err, file) {
    if (err) console.log('OH GOD !!!error: ', err);



    // var wordsArr = file.slice(0, -1).split('\n');
    // var matchingWordArr = wordsArr.filter(function(word) {
    //   var pattern = new RegExp(searchQuery, 'gi');
    //   return pattern.test(word);
    // });

    // console.log(matchingWordArr.length);

    var pattern = new RegExp(`\\b.*${sanitisedSearchQuery}.*\\b`, 'gi');

    var matchingWordArr = file.match(pattern) || [];
  

    response.writeHead(200, {
      'content-type': 'application/json'
    });

    response.end(JSON.stringify(matchingWordArr.slice(0, 100)));
  });
};





handlers.pageNotFound = function(request, response) {
  response.writeHead(404, {
    'content-type': 'text/html'
  });
  response.write('<h1>404 Page Requested Cannot Be Found</h1>');
  response.end();
};
