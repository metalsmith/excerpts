
var debug = require('debug')('metalsmith-excerpts');
var extname = require('path').extname;
var marked = require('marked');
var cheerio = require('cheerio');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to extract an excerpt from Markdown files.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      if (!markdown(file)) return;
      var data = files[file];

      var html = marked(data.contents.toString());

      var $ = cheerio.load(html, {
        normalizeWhitespace: true
      });
      var firstParagraph = $('p').first();

      debug('storing excerpt: %s', file);
      data.excerpt = $.html(firstParagraph).trim();
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}
