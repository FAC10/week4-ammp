
const resultDOM = document.getElementById('js-result');

console.log('app.js started');

// ************************************************************
// HANDLE INPUT
// ************************************************************
/**
 * Module handling input
 */


(function() {
  const searchDOM = document.getElementById('js-search');
  searchDOM.addEventListener('keyup', handleText);
  document.querySelector('.exit_button').addEventListener('click',function(){
    document.querySelector('.hidden-results').style.display = 'none';
  });
  document.querySelector('.hidden-search').addEventListener('click', function(event){
    searchDOM.focus();
  });

  function handleText(e) {
    // if (e.target.value.length === 0) { return; }
    e.target.value = e.target.value.replace(/[^\w\s]/gi, '');
    // fetch('GET', `http://localhost:4000/search?q=${encodeURIComponent(e.target.value)}`, renderResult);
    fetch('GET', `https://ammp.herokuapp.com/search?q=${encodeURIComponent(e.target.value)}`, renderResult);
  }
}());


// ************************************************************
// RENDER
// ************************************************************
/**
 * Render results in DOM
 *
 * @param  {Error object} err The js Error object
 * @param  {json} res JSON response object
 */
function renderResult(err, res) {
  if (err || (res && res.length) === 0) {
    resultDOM.innerHTML = '<li>Sorry, we are unable to find any matching words</li>';
    return;
  }
  // resultDOM.innerHTML = '';

  var hiddenResults = document.querySelector('.hidden-results');
  var searchDOM = document.getElementById('js-search');


  hiddenResults.style.display = 'flex';
  document.querySelector('#hidden-search').value = searchDOM.value;
  console.log(searchDOM.value);

  var ulDOM = document.querySelector('.search_list');
  ulDOM.innerHTML = '';
  res.forEach(item => {
    let liDOM = document.createElement('li');
    liDOM.textContent = item;
    liDOM.className = 'search_list_item';
    ulDOM.appendChild(liDOM);
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
