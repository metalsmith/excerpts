const {test} = require('tap');
const markdown = require('metalsmith-markdown');
const metalsmith = require('metalsmith');
const excerpt = require('..');

test('should convert excerpt files', assert => {
  metalsmith('test/fixtures/basic')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
      assert.end();
    });
});

test('should convert excerpt files that have leading whitespace', assert => {
  metalsmith('test/fixtures/whitespace')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
      assert.end();
    });
});

test('should convert excerpt files that only have one paragraph', assert => {
  metalsmith('test/fixtures/one-paragraph')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
      assert.end();
    });
});

test('should convert excerpt files with reference-style links', assert => {
  metalsmith('test/fixtures/reference-links')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.html'].excerpt);
      assert.end();
    });
});

test('should skip excerpts with leading whitespace', assert => {
  metalsmith('test/fixtures/indented-paragraph')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>This is the excerpt.</p>', files['index.html'].excerpt);
      assert.end();
    });
});

test('should convert excerpts with multiple formats', assert => {
  metalsmith('test/fixtures/reference-links')
    .use(markdown())
    .use(excerpt({multipleFormats: true}))
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.html'].excerpt.html);
      assert.equal('This is a link.', files['index.html'].excerpt.text);
      assert.end();
    });
});

test('should skip excerpts with images', assert => {
  metalsmith('test/fixtures/first-paragraph-image')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('<p>This is the excerpt.</p>', files['index.html'].excerpt);
      assert.end();
    });
});

test('should skip excerpts that are not html', assert => {
  metalsmith('test/fixtures/not-html')
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.ok('template: layout', files['file.yaml'].contents.toString().trim());
      assert.end();
    });
});

test('should not mutate an existing excerpts', assert => {
  metalsmith('test/fixtures/no-mutation')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err;
      }

      assert.equal('beans', files['index.html'].excerpt);
      assert.end();
    });
});
