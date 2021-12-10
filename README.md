# @metalsmith/excerpts

A Metalsmith plugin to extract an excerpt from HTML files.

[![metalsmith: core plugin][metalsmith-badge]][metalsmith-url]
[![npm: version][npm-badge]][npm-url]
[![ci: build][ci-badge]][ci-url]
[![code coverage][codecov-badge]][codecov-url]
[![license: MIT][license-badge]][license-url]

## Installation

NPM:

```
npm install @metalsmith/excerpts
```

Yarn:

```
yarn add @metalsmith/excerpts
```

## Usage

The excerpt is scraped from the first paragraph (`<p>` tag) of the rendered HTML `contents` of a file and added to its metadata `excerpt` key.

```js
const excerpts = require('@metalsmith/excerpts')

metalsmith.use(excerpts()) // default -> file.excerpt
metalsmith.use(excerpts({ multipleFormats: true })) // -> file.excerpt.html & file.excerpt.text
```

### Custom excerpts

You can define a custom `excerpt` in the front-matter of specific files:

```md
---
excerpt: This will be the excerpt
---

This would be the excerpt if none was specified in the front-matter
```

### Excerpts with tags stripped

Sometimes you may need access to the text content of the excerpt without HTML tags.
Pass the `multipleFormats: true` option to store an excerpt object with both HTML and text excerpts `{ html: '...', text: '...' }`:

```js
metalsmith.use(excerpts({ multipleFormats: true }))
```

### CLI usage

Add the `@metalsmith/excerpts` key to your `metalsmith.json` plugins key:

```json
{
  "plugins": [{ "@metalsmith/excerpts": { "multipleFormats": false } }]
}
```

## License

[MIT](LICENSE)

[npm-badge]: https://img.shields.io/npm/v/@metalsmith/excerpts.svg
[npm-url]: https://www.npmjs.com/package/@metalsmith/excerpts
[ci-badge]: https://app.travis-ci.com/metalsmith/excerpts.svg?branch=master
[ci-url]: https://app.travis-ci.com/github/metalsmith/excerpts
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-core_plugin-green.svg?longCache=true
[metalsmith-url]: https://metalsmith.io
[codecov-badge]: https://img.shields.io/coveralls/github/metalsmith/excerpts
[codecov-url]: https://coveralls.io/github/metalsmith/excerpts
[license-badge]: LICENSE
[license-url]: https://img.shields.io/github/license/metalsmith/excerpts
