// ************************************************************
// HANDLE INPUT
// ************************************************************
/**
 * Module handling input
 */
(function() {
  const searchDOM = document.getElementById('js-search');
  searchDOM.addEventListener('keyup', handleText);

  function handleText(e) {
    if (e.target.value.length === 0) { return; }
    fetch('GET', `http://localhost:4000/?search=${encodeURIComponent(e.target.value)}`, renderResult);
  }
}());



// ************************************************************
// RENDER
// ************************************************************

const resultDOM = document.getElementById('js-result');


/**
 * Render results in DOM
 *
 * @param  {Error object} err The js Error object
 * @param  {json} res JSON response object
 */
function renderResult(err, res) {
  resultDOM.innerHTML = '';
  res = ['a', 'b', 'c'];
  res.forEach(item => {
    let liDOM = document.createElement('li');
    liDOM.textContent = item;
    resultDOM.appendChild(liDOM);
  });
}



// ************************************************************
// FETCH
// ************************************************************

/**
 * A generic fetch request
 *
 * @param {string} method The request method e.g 'GET'
 * @param {string} url A URL string
 * @param {a function} callback a callback function
 * @returns {function} A callback called with err or parsed response
 */
function fetch(method, url, callback) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var parsedResponse = JSON.parse(xhr.responseText);
      callback(null, parsedResponse);
    } else if (xhr.readyState === 4 && xhr.status === 404) {
      callback(new Error('Resource not found'));
    }
  };
  xhr.onerror = function() {
    callback(new Error('server not found'));
  };
  xhr.open(method, url, true);
  xhr.send();
}
