
var assert = require('assert');
var excerpt = require('..');
var markdown = require('metalsmith-markdown');
var Metalsmith = require('metalsmith');

describe('metalsmith-excerpts', function(){
  it('should convert excerpt files', function(done){
    Metalsmith('test/fixtures/basic')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should convert excerpt files that have leading whitespace', function(done){
    Metalsmith('test/fixtures/whitespace')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should convert excerpt files that only have one paragraph', function(done){
    Metalsmith('test/fixtures/one-paragraph')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should convert excerpt files with reference-style links', function(done) {
    Metalsmith('test/fixtures/reference-links')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should skip excerpts with leading whitespace', function(done) {
    Metalsmith('test/fixtures/indented-paragraph')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('<p>This is the excerpt.</p>', files['index.html'].excerpt);
        done();
      });
  });

  describe('options', function() {
    it('should use the given tag selector when provided', function(done) {
      Metalsmith('test/fixtures/options/selector-code')
        .use(markdown())
        .use(excerpt({
          selector: 'code'
        }))
        .build(function(err, files) {
          if (err) return done(err);
          assert.equal('<code>This is code.\n</code>', files['index.html'].excerpt);
          done();
        });
    });

    it('should use the given class selector when provided', function(done) {
      Metalsmith('test/fixtures/options/selector-class')
        .use(markdown())
        .use(excerpt({
          selector: '.spotlight'
        }))
        .build(function(err, files) {
          if (err) return done(err);
          assert.equal('<p class="spotlight">This is the second paragraph.</p>', files['index.html'].excerpt);
          done();
        });
    });
  });
});
