var { handlers } = require('../handlers/handlers.js');


function router (request, response) {
  const url = request.url;

  if (url === '/') {
    handlers.serveHomepage(request, response);

  } else if ((url.indexOf('assets') !== -1)) {
    handlers.serveAssets(request, response);

  } else if ((url.indexOf('?search=') !== -1)) {
    handlers.serveResult(request, response);

  // } else if ((url.indexOf('/assets') === 0)) {
  //   handlers.serveAssets(request, response);
  //
  // } else if ((url.indexOf('/search') === 0)) {
  //   handlers.serveResult(request, response);

  } else {
    handlers.pageNotFound(request, response);
  }
}

module.exports = router;
