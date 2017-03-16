var test = require('tape');

const { handlers, getMatchingWordArr } = require('./handlers');


test('Check handlers', function(t) {
  t.pass('a message to print out on success');
  t.end();
});


test('getMatchingWordArr', function(t) {
  const searchQuerySanitized = 'a';

  const file = `
    Piotr
    Martha
    Akin
    Maja
  `;

  const exptected = ['Martha', 'Akin', 'Maja'];

  t.deepEqual(getMatchingWordArr(searchQuerySanitized, file), exptected);
  t.end();
});
