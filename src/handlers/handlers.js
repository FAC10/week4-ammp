const fs = require('fs');
const path = require('path');
const handlers = module.exports = {};
const querystring = require('querystring');
const url = require('url');

handlers.serveHomepage = function(request, response) {
  fs.readFile(path.join(__dirname, '../..', '/public/index.html'), (err, file) => {
    if (err) console.log(err);
    response.writeHead(200, {
      'content-type': 'text/html'
    });
    response.end(file);
  });
};

handlers.serveAssets = function(request, response) {
  // console.log(request.url);
  fs.readFile(path.join(__dirname, '../../public', request.url), (err, file) => {
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



// handlers.serveResult = (request, response) => {
//   const searchQuery = url.parse(request.url, true).query.search;
//
//   fs.readFile(path.join(__dirname, '..', 'words.txt'), 'utf8', (err, file) => {
//     if (err) console.log('OH GOD !!!error: ', err);
//
//     const wordsArr = file.slice(0, -1).split('\n');
//     const matchingWordArr = wordsArr.filter(function(word) {
//       const pattern = new RegExp(searchQuery, 'gi');
//       return pattern.test(word);
//     });
//
//     console.log(matchingWordArr.length);
//
//     response.writeHead(200, { 'content-type': 'application/json' });
//
//     response.end(JSON.stringify(matchingWordArr.slice(0, 100)));
//   });
// };
//
//
//
//


function getResultArray(str, searchQuery) {

  const wordsArr = str.slice(0, -1).split('\n');


  const matchingWordArr = wordsArr.filter(function(word) {
    const pattern = new RegExp(searchQuery, 'gi');
    return pattern.test(word);
  });

  return matchingWordArr;
}



handlers.serveResult = (request, response) => {
  const searchQuery = url.parse(request.url, true).query.search;

  const readableStream = fs.createReadStream(path.join(__dirname, '..', 'words.txt'));
  readableStream.setEncoding('utf8');

  let data = '';

  readableStream.on('data', (chunk) => {
    // console.log(chunk);
    const resultArr = getResultArray(chunk, searchQuery);
    // console.log(resultArr);

    response.writeHead(200, { 'content-type': 'application/json' });

    // console.log('typeof', typeof JSON.stringify(resultArr));

    response.write(JSON.stringify(resultArr));

    // console.log('chunk', chunk.length);
  });

  readableStream.on('end', () => {
    // response.end(JSON.stringify(['a', 'b']));
    response.end();
  });



  // console.log(matchingWordArr.length);

  // response.writeHead(200, { 'content-type': 'application/json' });
  //
  // response.end(JSON.stringify(['a', 'b']));

};




handlers.pageNotFound = function(request, response) {
  response.writeHead(404, {
    'content-type': 'text/html'
  });
  response.write('<h1>404 Page Requested Cannot Be Found</h1>');
  response.end();
};
