const assert = require('assert')
const { it } = require('mocha')
const markdown = require('@metalsmith/markdown')
const metalsmith = require('metalsmith')
const excerpt = require('..')

it('should convert excerpt files', (done) => {
  metalsmith('test/fixtures/basic')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>excerpt</p>', files['index.html'].excerpt)
      done()
    })
})

it('should convert excerpt files that have leading whitespace', (done) => {
  metalsmith('test/fixtures/whitespace')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>excerpt</p>', files['index.html'].excerpt)
      done()
    })
})

it('should convert excerpt files that only have one paragraph', (done) => {
  metalsmith('test/fixtures/one-paragraph')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>excerpt</p>', files['index.html'].excerpt)
      done()
    })
})

it('should convert excerpt files with reference-style links', (done) => {
  metalsmith('test/fixtures/reference-links')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.html'].excerpt)
      done()
    })
})

it('should skip excerpts with leading whitespace', (done) => {
  metalsmith('test/fixtures/indented-paragraph')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>This is the excerpt.</p>', files['index.html'].excerpt)
      done()
    })
})

it('should convert excerpts with multiple formats', (done) => {
  metalsmith('test/fixtures/reference-links')
    .use(markdown())
    .use(excerpt({ multipleFormats: true }))
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.html'].excerpt.html)
      assert.equal('This is a link.', files['index.html'].excerpt.text)
      done()
    })
})

it('should skip excerpts with images', (done) => {
  metalsmith('test/fixtures/first-paragraph-image')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('<p>This is the excerpt.</p>', files['index.html'].excerpt)
      done()
    })
})

it('should skip excerpts that are not html', (done) => {
  metalsmith('test/fixtures/not-html')
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.ok('template: layout', files['file.yaml'].contents.toString().trim())
      done()
    })
})

it('should not mutate an existing excerpts', (done) => {
  metalsmith('test/fixtures/no-mutation')
    .use(markdown())
    .use(excerpt())
    .build((err, files) => {
      if (err) {
        return err
      }

      assert.equal('beans', files['index.html'].excerpt)
      done()
    })
})
