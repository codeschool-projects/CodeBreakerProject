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
    it('should set element `answer` to a random whole number between 0 and 9999',function() {
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

    it('should set element `answer` to a number exactly 4 characters long.', function() {
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

  describe('setHiddenFields()', function(){
    it('should only run if `attempt` or `answer` are empty', function() {
      assert(typeof window.setHiddenFields === "function",'a fuction named `setHiddenFields` was not found.');
      //make sure fields are populated before testing
      window.setHiddenFields();
      var expectedAnswer = document.getElementById('answer').value;
      window.guess();
      assert(expectedAnswer != '','`setHiddenFields` must update `answer` for test to run.')
      assert(expectedAnswer == document.getElementById('answer').value,'the value of `answer` should not change when `answer` is already populated.');
    });
  });

  describe('setMessage()', function(){
    it('should accept one parameter and set the `innerHTML` of element `message` to that parameter.', function(){
      assert(typeof window.setMessage === "function",'a fuction named `setMessage` was not found.')
      window.setMessage('test `setMessage` function.');
      assert(document.getElementById('message').value == 'test `setMessage` function.', '`message`s `innerHTML` did not match the provided value.');
    });
  });

  describe('validateInput()', function(){
    it('should accept one parameter and return `true` only when that parameter\'s length is 4.', function() {
      assert(typeof window.validateInput === "function",'a fuction named `validateInput` was not found.');
      assert(window.validateInput(1234) == true,'did not return `true` when valid input was provided.');
      assert(window.validateInput(123) == false, 'returned `true` when length was not 4.');
    });
  });

  describe('validateInput()', function(){
    it('should run when `guess` runs', function(){
      assert(typeof window.validateInput === "function",'a fuction named `validateInput` was not found.');
      var spy = sinon.spy(window, "validateInput");
      window.guess();
      assert(spy.calledOnce(),'was not run when `guess` ran.');
    });
  });

  describe('showAnswer()', function(){
    it('should accept one parameter and set the `innerHTML` of element `code` to match element `answer`\'s value. If parameter is `true` element `code` should have ` success` added to it\'s `className` otherwise ` failure` should be added to it\`s `className`. (Note: the spaces before ` success` and ` failure` are required).', function(){
      assert(typeof window.showAnswer === "function",'a fuction named `showAnswer` was not found.');
      var code = document.getElementById('code');
      //test true
      window.setHiddenFields();
      window.showAnswer(true);
      assert(document.getElementById('answer').value == code.innerHTML, '`code`\'s `innerHTML` did not match the `awnser`\'s value when parameter was `true`.');
      assert(code.className.indexOf(' success') == 0,'`code`\'s `className` did not have ` success` in it when parameter was `true`.');
      //test false
      code.value = '';
      code.className = '';
      window.showAnswer(false);
      assert(document.getElementById('answer').value == code.innerHTML, '`code`\'s `innerHTML` did not match the `awnser`\'s value when parameter was `false`.');
      assert(code.className.indexOf(' failure') == 0,'`code`\'s `className` did not have ` failure` in it when parameter was `false`.');
    });
  });
});
