var test = require('tape');

const { handlers, getMatchingWordArr, getLettersOnly, getContentType } = require('./handlers');


test('handlers - getMatchingWordArr', function(t) {
  const searchQuerySanitized = 'a';
  const file = `
    Piotr
    Martha
    Akin
    Maja
  `;
  const expected = ['Martha', 'Akin', 'Maja'];

  t.deepEqual(getMatchingWordArr(searchQuerySanitized, file), expected);
  t.end();
});


test('handlers - getLettersOnly', function(t) {
  const searchQuery = 'abc-function(){}';
  const expected = 'abcfunction';

  t.equal(getLettersOnly(searchQuery), expected);
  t.end();
});

test('handlers - getContentType', function(t){
  const url= '/assets/app.js';
  const expected = 'application/javascript';
  t.equal(getContentType(url), expected);
  t.end();
});
