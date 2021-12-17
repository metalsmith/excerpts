const { extname } = require('path')
const debug = require('debug')('@metalsmith/excerpts')
const cheerio = require('cheerio')

/**
 * Check if a `file` is HTML.
 *
 * @param {String} file
 * @return {Boolean}
 */
const html = (file) => /\.html?/.test(extname(file))

/**
 * A Metalsmith plugin to extract an excerpt from HTML files.
 *
 * @return {Function}
 */
const plugin = (options) => (files, metalsmith, done) => {
  options = options || {}
  setImmediate(done)
  Object.keys(files).forEach((file) => {
    debug('checking file: %s', file)
    if (!html(file)) {
      return
    }

    const data = files[file]

    if (typeof data.excerpt === 'string' && data.excerpt.length > 0) {
      return // Don't mutate data
    }

    debug('storing excerpt: %s', file)
    const $ = cheerio.load(data.contents.toString())
    let p = $('p').first()
    while (p.children('img').length > 0) {
      p = p.next()
    }

    if (options.multipleFormats) {
      data.excerpt = {
        html: $.html(p).trim(),
        text: $.text(p).trim()
      }
    } else {
      data.excerpt = $.html(p).trim()
    }
  })
}

// Expose `plugin`
module.exports = plugin
