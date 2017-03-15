var handlers = require('../handlers/handlers.js');


module.exports = function(request, response) {
  var url = request.url;
  if (url === '/') {
    handlers.handlersHomepage(request, response);
  }
  else if ((url.indexOf('assets')!== -1)){
    handlers.handleAssets(request, response);

  } else {
    handlers.pageNotFound(request,response);
  }

};
