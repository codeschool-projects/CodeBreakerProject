var jsdom = require('jsdom'),
    fs = require('fs'),
    assert = require('chai').assert,
    file = fs.readFileSync('../src/assets/main.js').toString();

describe('Your HTML Page', function() {
  var window;
  before(function(next) {
    jsdom.env(
      file,
      ["http://code.jquery.com/jquery.js"],
      function (err, w) {
        if(err) { next(err); }
        window = w;
        next();
      }
    );
  });

  // Example Test
  it('should have a title @title', function() {
    assert.equal(window.$('title').length, 1, 'Make sure to create a `title` element.');
  });
});
