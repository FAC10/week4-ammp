const fs = require('fs');
const path = require('path');
const handlers = module.exports = {};
const querystring = require('querystring');
const url = require('url');


handlers.serveHomepage = (request, response) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'index.html'), (err, file) => {
    if (err) console.log(err);
    response.writeHead(200, {
      'content-type': 'text/html'
    });
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

    response.writeHead(200, {
      'content-type': extensionType[extension]
    });
    response.end(file);
  });
};


handlers.serveResult = (request, response) => {
  const searchQuery = url.parse(request.url, true).query.q;
  const searchQuerySanitized = searchQuery.replace(/[^a-z]/gi, '');


  fs.readFile(path.join(__dirname, '..', 'words.txt'), 'utf8', (err, file) => {
    if (err) console.log('OH GOD !!!error: ', err);

    const t0 = Date.now();
    // const wordsArr = file.slice(0, -1).split('\n');
    // const matchingWordArr = wordsArr.filter(function(word) {
    //   const pattern = new RegExp(searchQuerySanitized, 'i');
    //   return pattern.test(word);
    // });
    const pattern = new RegExp(`\\b.*${searchQuerySanitized}.*\\b`, 'gi');
    const matchingWordArr = file.match(pattern) || [];

    const t1 = Date.now();
    // console.log('duration', t1-t0, 'ms');
    // console.log(matchingWordArr.length, 'elements');

    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(matchingWordArr.slice(0, 100)));
  });
};






// function getResultArray(str, searchQuery) {
//   const pattern = new RegExp(`\\b.*${searchQuery}.*\\b`, 'gi');
//   return str.match(pattern) || [];
// }

// handlers.serveResult = (request, response) => {
//   const searchQuery = url.parse(request.url, true).query.search;
//
//   const t0 = Date.now();
//   const readableStream = fs.createReadStream(path.join(__dirname, '..', 'words.txt'));
//   readableStream.setEncoding('utf8');
//
//   let matchingWordArr = [];
//
//   readableStream.on('data', (chunk) => {
//     matchingWordArr = [ ...matchingWordArr, ...getResultArray(chunk, searchQuery)];
//   });
//
//   readableStream.on('end', () => {
//     const t1 = Date.now();
//     console.log('duration', t1-t0, 'ms');
//     console.log(matchingWordArr.length, 'elements');
//     response.writeHead(200, { 'content-type': 'application/json' });
//     response.end();
//   });
// };





handlers.pageNotFound = (request, response) => {
  response.writeHead(404, {
    'content-type': 'text/html'
  });
  response.write(`<h1>404: The requested URL ${request.url} was not found on this server.</h1>`);
  response.end();
};
