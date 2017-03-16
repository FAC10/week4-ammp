const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');



const handlers = {};


handlers.serveHomepage = (request, response) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'index.html'), (err, file) => {
    if (err) console.log(err);
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(file);
  });
};


handlers.serveAssets = (request, response) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', request.url), (err, file) => {
    if (err) console.log(err);
    const extension = request.url.split('.')[1];
    const extensionType = {
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'ico': 'image/x-icon'
    };

    response.writeHead(200, { 'content-type': extensionType[extension] });
    response.end(file);
  });
};


function getMatchingWordArr(searchQuerySanitized, file) {
  const pattern = new RegExp(`\\b.*${searchQuerySanitized}.*\\b`, 'gi');
  return file.match(pattern) || [];
}


function getLettersOnly(searchQuery) {
  return searchQuery.replace(/[^a-z]/gi, '');
}

handlers.serveResult = (request, response) => {
  const searchQuery = url.parse(request.url, true).query.q;
  const searchQuerySanitized = getLettersOnly(searchQuery);

  fs.readFile(path.join(__dirname, '..', 'words.txt'), 'utf8', (err, file) => {
    if (err) console.log('OH GOD !!!error: ', err);

    const matchingWordArr = getMatchingWordArr(searchQuerySanitized, file);

    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(matchingWordArr.slice(0, 100)));
  });
};


handlers.pageNotFound = (request, response) => {
  response.writeHead(404, {
    'content-type': 'text/html'
  });
  response.write(`<h1>404: The requested URL ${request.url} was not found on this server.</h1>`);
  response.end();
};


module.exports = {handlers, getMatchingWordArr, getLettersOnly};
