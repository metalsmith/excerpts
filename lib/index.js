
var debug = require('debug')('metalsmith-excerpts');
var extname = require('path').extname;
var marked = require('marked');

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
      // remove leading whitespace on each line
      var str = data.contents.toString().replace(/^\s+/g, '');
      var i = str.indexOf('\n\n');
      debug('storing excerpt: %s', file);

      data.excerpt = (i != -1)
      ? marked(str.substring(0, i))
      : marked(str.substring(0, str.length));
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
