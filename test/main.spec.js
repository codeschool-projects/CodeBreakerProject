// Libraries
const fs = require('fs');
const jsdom = require('jsdom');
const { assert } = require('chai');
const sinon = require('sinon');
const srcScript = fs.readFileSync('./src/assets/main.js', 'utf8');

const scriptRegex = /<\s*script[\s\S]*?>[\s\S]*?<\s*\/\s*script\s*>/ig;

// HTML Page
let srcHtml = fs.readFileSync('./src/index.html', 'utf8');
srcHtml = srcHtml.replace(
  scriptRegex,
  (tag) => !/src\s*=['"][^'"]*assets\//i.test(tag) ? tag : ''
);

// JSDOM Setup
const virtualConsole = jsdom.createVirtualConsole();
virtualConsole.sendTo(console);

// Tests
describe('CodeBreaker :', () => {

  let document;
  let window;
  let spy;
  var array = [];

  // Setup
  before((done) => {

    document = jsdom.jsdom(srcHtml, {
      virtualConsole: virtualConsole,
    });

    window = document.defaultView;

    window.addEventListener('load', () => {
      // Adds script tag
      const scriptEl = window.document.createElement('script');
      scriptEl.appendChild(window.document.createTextNode(srcScript));
      window.document.body.appendChild(scriptEl);
      setTimeout(()=> {
        done();
      }, 2000)
    });

    // don't prepopulate or data unless `setHiddenFields` is a valid function
    if (typeof window.setHiddenFields === "function") {
        for(var i = 0; i < 10; i++)
        {
          window.setHiddenFields();
          array.push(document.getElementById('answer').value);
        }
        array.sort();
    }
  });

  // Tests
  describe('setHiddenFields()', function() {
    it(' should set element `answer` to a random whole number between 0 and 9999',function() {
      assert(typeof window.setHiddenFields === "function",'a fuction named `setHiddenFields` was not found.');
      assert(array.length > 0, '`answer` was not provided a value.');
      var current = null;
      var duplicates = 0;
      for(var i = 0; i < array.length; i++) {
        assert(array[i] >= 0 && array[i] <= 9999, '`answer` was not between 0 and 9999.');
        assert(array[i].indexOf('.') == -1, '`answer` was not a whole number.');
        if(array[i] != current) {
          current = array[i];
        } else {
          duplicates++;
        }
      }
      assert(duplicates < 3,'`answer` does not appear to be random.');
    });

    it(' should set element `answer` to a number exactly 4 characters long.', function() {
      assert(typeof window.setHiddenFields === "function",'a fuction named `setHiddenFields` was not found.');
      assert(array.length > 0, '`answer` was not provided a value.');
      for(var i = 0; i < array.length; i++) {
        assert(array[i].length == 4, '`answer` should have a value exactly 4 characters long.');
      }
    });

    it('should set element `attempt` to 0', function() {
        assert(typeof window.setHiddenFields === "function",'a fuction named `setHiddenFields` was not found.');
        window.setHiddenFields();
        assert(document.getElementById('attempt').value == 0, '`attempt` should have a value of 0.');
    });
  });
});
