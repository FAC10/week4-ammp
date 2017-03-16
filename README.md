# week4-ammp

The spectacular ammp autocompletion engine



## Performance of generating an array using `filter` vs regex `match`

```javascript
// Option 1: filter
const wordsArr = file.slice(0, -1).split('\n');
const matchingWordArr = wordsArr.filter(word => {
  const pattern = new RegExp(searchQuery, 'i');
  return pattern.test(word);
});
// Average search time 200 ms

// Option 2: match
const pattern = new RegExp(`\\b.*${searchQuery}.*\\b`, 'gi');
const matchingWordArr = file.match(pattern) || [];
// Average search time 50 ms
```

## Sanitizing the input text

 ```javascript
 // Extract the search query from the request url
 const searchQuery = url.parse(request.url, true).query.search;

 // Remove all non-letters
 const searchQuerySanitized = searchQuery.replace(/[^a-z]/gi, '');
 ```
