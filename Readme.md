# metalsmith-excerpts

  A [Metalsmith](http://metalsmith.io) plugin to extract an excerpt from Markdown files.

  The excerpt is scraped from first paragraph (`<p>` tag) of the rendered HTML.

  If a file already has an `excerpt` value, that value will be returned.

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

## License

  MIT
