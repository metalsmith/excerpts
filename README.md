# metalsmith-excerpts

[![npm version][npm-badge]][npm-url]
[![code style: xo][xo-badge]][xo-url]
[![metalsmith: core plugin][metalsmith-badge]][metalsmith-url]

[![Known Vulnerabilities][snyk-badge]][synk-url]
[![Node CI][action-badge]][action-url]

A [Metalsmith](http://metalsmith.io) plugin to extract an excerpt from HTML files.

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

If you pass a `multipleFormats: true` option to the plugin, it will put store
an excerpt object like `{ html: '...', text: '...' }`;

## License

MIT

[npm-badge]: https://img.shields.io/npm/v/metalsmith-excerpts.svg
[npm-url]: https://www.npmjs.com/package/metalsmith-excerpts
[xo-badge]: https://img.shields.io/badge/code_style-xo-ff69b4.svg?longCache=true
[xo-url]: https://github.com/xojs/xo
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-core_plugin-green.svg?longCache=true
[metalsmith-url]: http://metalsmith.io
[snyk-badge]: https://snyk.io/test/github/segmentio/metalsmith-excerpts/badge.svg?targetFile=package.json
[synk-url]: https://snyk.io/test/github/segmentio/metalsmith-excerpts?targetFile=package.json

[action-url]: https://github.com/segmentio/metalsmith-excerpts/actions?query=workflow%3A%22Node+CI%22
[action-badge]: https://github.com/segmentio/metalsmith-excerpts/workflows/Node%20CI/badge.svg
