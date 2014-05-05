
var assert = require('assert');
var excerpt = require('..');
var Metalsmith = require('metalsmith');

describe('metalsmith-excerpts', function(){
  it('should convert excerpt files', function(done){
    Metalsmith('test/fixtures/basic')
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.md'].excerpt);
        done();
      });
  });

  it('should convert excerpt files that have leading whitespace', function(done){
    Metalsmith('test/fixtures/whitespace')
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.md'].excerpt);
        done();
      });
  });

  it('should convert excerpt files that only have one paragraph', function(done){
    Metalsmith('test/fixtures/one-paragraph')
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.md'].excerpt);
        done();
      });
  });

  it('should convert excerpt files with reference-style links', function(done) {
    Metalsmith('test/fixtures/reference-links')
      .use(excerpt())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.md'].excerpt);
        done();
      });
  });

  it('should skip excerpts with leading whitespace', function(done) {
    Metalsmith('test/fixtures/indented-paragraph')
      .use(excerpt())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('<p>This is the excerpt.</p>', files['index.md'].excerpt);
        done();
      });
  });
});
