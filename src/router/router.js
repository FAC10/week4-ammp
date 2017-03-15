var handlers = require('../handlers/handlers.js');


module.exports = function(request, response) {
  var url = request.url;
  console.log('request', request.url);
  if (url === '/') {
    handlers.serveHomepage(request, response);

  } else if ((url.indexOf('assets') !== -1)) {
    handlers.serveAssets(request, response);

  } else if ((url.indexOf('?search=') !== -1)) {
    handlers.serveResult(request, response);

  } else {
    handlers.pageNotFound(request, response);
  }

};
