var test = require('tape');

const { handlers, getMatchingWordArr, getLettersOnly } = require('./handlers');


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
