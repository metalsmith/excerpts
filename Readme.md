
# metalsmith-excerpts

  A [Metalsmith](http://metalsmith.io) plugin to extract an excerpt from Markdown files.

## Installation

    $ npm install metalsmith-excerpts

## CLI Usage

  Install via npm and then add the `metalsmith-excerpts` key to your `metalsmith.json` plugin, like so:

```json
{
  "plugins": {
    "metalsmith-excerpts": true
  } 
}
```

## Javascript Usage

```js
var excerpts = require('metalsmith-excerpts');

metalsmith.use(excerpts());
```

## Consuming Excerpts From Metadata

  The excerpt HTML will be added to an `excerpt` property on the metadata. Here's sample usage in Jade:
  
```jade
each post in collections.posts
  div!= post.excerpt
```

## Options

### selector

  Passing a `selector` to excerpts will cause it to extract the first element matching that selector
  pattern, instead of the default 'p' selector.
  
```js
var excerpts = require('metalsmith-excerpts');

metalsmith.use(excerpts({
  selector: 'code'
}));
```  

## License

  MIT