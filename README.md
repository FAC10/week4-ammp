# week4-ammp

Pluralsight search engine clone by the ammp team

## User Story

![pluralsight screenshot](./demo/pluralsight-screenshot.png)

As a user I can start typing in the input box and:
- results will be overlayed in full screen
- I can see updated results and I continue typing
- results page can be closed by clicking on the 'x' button



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
