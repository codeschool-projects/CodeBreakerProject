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
  });

  // Tests
  describe('setHiddenFields()', function() {
    it('should set the `value` of element `answer` to a random whole number between 0 and 9999. @randomNumber',function() {
      assert(typeof window.setHiddenFields === "function",'a function named `setHiddenFields` was not found.');

      var array = [];
      if (typeof window.setHiddenFields === 'function') {
        for(var i = 0; i < 10; i++)
        {
          window.setHiddenFields();
          array.push(document.getElementById('answer').value);
        }
        array.sort();
      }

      assert(array.length > 0, '`setHiddenFields` didn\'t change the `value` of the `answer` hidden field. `setHiddenFields` should change the `answer.value` variable.');
      var current = null;
      var duplicates = 0;
      for(var i = 0; i < array.length; i++) {
        assert(array[i] >= 0 && array[i] <= 9999, '`answer.value` was ' + array[i] + ' which is not between 0 and 9999.');
        assert(array[i].indexOf('.') == -1, '`answer.value` was ' + array[i] + ' which is not a whole number.');
        if(array[i] != current) {
          current = array[i];
        } else {
          duplicates++;
        }
      }
      assert(duplicates < 3,'`setHiddenFields` was run 10 times and `answer.value` was the same more than 3 times. `answer.value` does not appear to be random.');
    });

    it('should set the `value` of element `answer` to a number exactly 4 characters long. @answerLength', function() {
      assert(typeof window.setHiddenFields === "function",'a function named `setHiddenFields` was not found.');

      var array = [];
      if (typeof window.setHiddenFields === 'function') {
        for(var i = 0; i < 10; i++)
        {
          window.setHiddenFields();
          array.push(document.getElementById('answer').value.toString());
        }
        array.sort();
      }

      assert(array.length > 0, '`setHiddenFields` didn\'t change the `value` of the `answer` hidden field. `setHiddenFields` should change the `answer.value` variable.');
      for(var i = 0; i < array.length; i++) {
        assert(array[i].length == 4, 'The `value` of the element `answer` was ' + array[i] + ' which is not exactly 4 characters long.');
      }
    });

    it('should set the `value` of element `attempt` to 0. @setAttempt', function() {
        assert(typeof window.setHiddenFields === "function",'a function named `setHiddenFields` was not found.');
        window.setHiddenFields();
        assert(document.getElementById('attempt').value == 0, 'The `value` of element `attempt` was "' + document.getElementById('attempt').value + '" which is not 0.');
    });

    it('should only run if the `value` of elements `attempt` or `answer` are empty. @preventClearing', function() {
      assert(typeof window.setHiddenFields === "function",'a function named `setHiddenFields` was not found.');
      //make sure fields are populated before testing
      window.setHiddenFields();
      var expectedAnswer = document.getElementById('answer').value;
      window.guess();
      assert(expectedAnswer != '','`setHiddenFields` didn\'t change the `value` of the `answer` hidden field. `setHiddenFields` should change the `answer.value` variable.');
      assert(expectedAnswer == document.getElementById('answer').value,'the `value` of element `answer` was changed even though `answer` had already been provided a `value`. Only update the `value` of `answer` when answer is empty; `(\'\')`');
    });
  });

  describe('setMessage()', function(){
    it('should accept one parameter and set the `innerHTML` of element `message` to that parameter. @setMessage', function(){
      assert(typeof window.setMessage === "function",'a function named `setMessage` was not found.');
      window.setMessage('test `setMessage` function.');
      assert(document.getElementById('message').innerHTML == 'test `setMessage` function.', '`message`s `innerHTML` did not match the provided value.');
    });
  });

  describe('validateInput()', function(){
    it('should accept one parameter and return `true` only when that parameter\'s `length` is 4. @validateInput', function() {
      assert(typeof window.validateInput === "function",'a function named `validateInput` was not found.');
      assert(window.validateInput('1234') == true,'`validateInput` did not return `true` when the `length` of `input` was 4. `validateInput` should return `true` when `input`\'s `length` is 4.');
      assert(window.validateInput('123') == false, 'When the input\'s `length` was not 4 `validateInput` did not return `false`. `validateInput` should return `false` anytime `input` has a length that isn\'t 4.');
    });

    it('should run when `guess` runs @runValidation', function(){
      assert(typeof window.validateInput === "function",'a function named `validateInput` was not found.');
      document.getElementById('user-guess').value = "12345";
      document.getElementById('attempt').value = "0";
      var spy = sinon.spy(window, "validateInput");
      window.guess();
      assert(window.validateInput.calledOnce,'`validateInput` was not run when `guess` ran.');
      assert(document.getElementById('message').innerHTML == "Guesses must be exactly 4 characters long.",'When `validateInput` returns `false` the `innerHTML` of `message` should be set to "Guesses must be exactly 4 characters long."');
      assert(document.getElementById('attempt').value == 0, 'The `value` of `attempt` increased when `validateInput` returned `false`, this should only iterate when `validateInput` returns `true`.');
      document.getElementById('user-guess').value = "1234";
      document.getElementById('attempt').value = "0";
      document.getElementById('message').innerHTML = "";
      window.guess();
      assert(document.getElementById('message').innerHTML != "Guesses must be exactly 4 characters long.",'The `innerHTML` of `message` should only be set to "Guesses must be exactly 4 characters long." when `validateInput` returns `false`, however; this message was set when `validateInput` returned `true`.');
      assert(document.getElementById('attempt').value == 1, 'The `value` of `attempt` should increase by 1 when `validateInput` returns `true`.');
    });
  });

  describe('getResults() @getResults', function(){
    it('should accept one parameter and add to the `results` element\'s `innerHTML` based on how close the parameter is to the value of element `answer`. Each result should begin with `<div class="row"><span class="col-md-6">\' + input + \'</span><div class="col-md-6">` where `input` is the function\'s parameter. Foreach character in `input`: add `<span class="glyphicon glyphicon-ok"></span>` if the character is in the element `answer`\s `value` and in the correct position, add `<span class="glyphicon glyphicon-transfer"></span>` if the character is in element `answer`\`s `value`, but is not in the correct position, and add `<span class="glyphicon glyphicon-remove"></span>` if the character is not in `answer`\'s `value` at all. @getResults',function(){
      assert(typeof window.getResults === "function",'a function named `getResults` was not found.');
      //Setup
      document.getElementById('results').innerHTML = '';
      document.getElementById('answer').value = '1234';
      //first character correct, second wrong place, third and fouth wrong
      window.getResults('1300');
      //add tests for starting and stopping divs?
      //add tests for each result?

      var oks = (document.getElementById('results').innerHTML.match(/glyphicon-ok/g) || []).length;
      var transfers = (document.getElementById('results').innerHTML.match(/glyphicon-transfer/g) || []).length;
      var removes = (document.getElementById('results').innerHTML.match(/glyphicon-remove/g) || []).length;

      assert(oks > 0, 'correct characters are not being marked as correct.');
      assert(oks < 2, 'some characters are being incorrectly marked as correct.');
      assert(transfers > 0, 'characters that were present in the answer, but not in the right position are not getting marked correctly.');
      assert(transfers < 2, 'some characters are being incorrectly marked as in the answer, but not in the right position.');
      assert(removes > 1, 'characters not present in the answer are not being marked as wrong.');
      assert(removes < 3, 'some characters are being incorrectly marked as not in the anwser.');
    });

    it('should return `true` if element `answer`\'s `value` and parameter match, otherwise return `false` @correctGuess', function(){
      assert(typeof window.getResults === "function",'a function named `getResults` was not found.');
      document.getElementById('answer').value = '1234';
      assert(window.getResults('1234'), 'did not return `true` when parameter matched element `answer`\'s `value`.');
      assert(!window.getResults('0000'), 'did not return `false` whene parameter did not match element `answer`\'s `value`.');
    });
  });

  describe('guess()', function(){
    it('should call `setMessage` with value "You Win! :)" when `getResults` returns `true`. @winCondition', function(){
      assert(typeof window.getResults === "function",'a function named `getResults` was not found.');
      document.getElementById('answer').value = '1234';
      document.getElementById('attempt').value = '1';
      document.getElementById('user-guess').value = '1234';
      window.guess();
      assert(document.getElementById('message').innerHTML == 'You Win! :)', 'didn\'t set the message to "You Win! :)" when user input matched element `answer`\'s `value`');
    });

    it('should call `setMessage` with the value "You Lose! :(" when element `attempt`\'s `value` is 10 or more and `getResurts` returns false. @loseCondition', function(){
      assert(typeof window.getResults === "function",'a function named `getResults` was not found.');
      document.getElementById('answer').value = '1234';
      document.getElementById('attempt').value = '10';
      document.getElementById('user-guess').value = '4321';
      window.guess();
      assert(document.getElementById('message').innerHTML == 'You Lose! :(', 'didn\'t set the message to "You Lose! :(" when user input did not match element `answer`\'s `value` and `attempt`\'s `value` was 10 or more.');
    });

    it('should call `setMessage` with the value "Incorrect, try again." when element `answer`\'s `value` does not match user input, but `attempt`\'s `value` is less than 10. @tryAgain', function(){
      assert(typeof window.getResults === "function",'a function named `getResults` was not found.');
      document.getElementById('answer').value = '1234';
      document.getElementById('attempt').value = '1';
      document.getElementById('user-guess').value = '4321';
      window.guess();
      assert(document.getElementById('message').innerHTML == 'Incorrect, try again.', 'didn\'t set the message to "Incorrect, try again." when user input did not match element `answer`\'s `value` and `attempt`\'s `value` was less than 10.');
    });
  });

  describe('showAnswer()', function(){
    it('should accept one parameter and set the `innerHTML` of element `code` to match element `answer`\'s value. If parameter is `true` element `code` should have ` success` added to it\'s `className` otherwise ` failure` should be added to it\`s `className`. (Note: the spaces before ` success` and ` failure` are required) @showAnswer', function(){
      assert(typeof window.showAnswer === "function",'a function named `showAnswer` was not found.');
      var code = document.getElementById('code');
      //test true
      window.setHiddenFields();
      window.showAnswer(true);
      assert(document.getElementById('answer').value == code.innerHTML, '`code`\'s `innerHTML` did not match the `answer`\'s value when parameter was `true`.');
      assert(code.className.indexOf(' success') != -1,'`code`\'s `className` did not have ` success` in it when parameter was `true`.');
      //test false
      code.value = '';
      code.className = '';
      window.showAnswer(false);
      assert(document.getElementById('answer').value == code.innerHTML, '`code`\'s `innerHTML` did not match the `answer`\'s value when parameter was `false`.');
      assert(code.className.indexOf(' failure') != -1,'`code`\'s `className` did not have ` failure` in it when parameter was `false`.');
    });
  });

  describe('showReplay()', function(){
    it('should set element `guessing-div`\'s `style` to "display:none" element `replay-div`\'s `style` to "display:block". @showReplay', function(){
      assert(typeof window.showReplay === "function",'a function named `showReplay` was not found.');
      window.showReplay();
      assert(document.getElementById('guessing-div').style.display == "none", '`guessing-div`\'s `style` was not set to "display:none".');
      assert(document.getElementById('replay-div').style.display == "block", '`replay-div`\'s `style` was not set to "display:block".');
    });
  });

  describe('guess()', function(){
    it('should call `showAnswer` and `showReplay` when either the player guesses correctly, or runs out of attempts. If player wins provide `true` to the `showAnswer` call, otherwise `false`. @winLoseConditions', function(){
      assert(typeof window.showAnswer === "function",'a function named `showAnswer` was not found.');
      assert(typeof window.showReplay === "function",'a function named `showReplay` was not found.');
      //win outcome
      document.getElementById('answer').value = '1234';
      document.getElementById('attempt').value = '1';
      document.getElementById('user-guess').value = '1234';
      window.guess();
      assert(document.getElementById('guessing-div').style.display == "none", '`showReplay` was not run when game win condition was met.');
      assert(document.getElementById('message').innerHTML == 'You Win! :)','`showAnswer` was not run when game win condition was met.');
      //lose outcame
      document.getElementById('answer').value = '1234';
      document.getElementById('attempt').value = '10';
      document.getElementById('user-guess').value = '4321';
      window.guess();
      assert(document.getElementById('guessing-div').style.display == "none", '`showReplay` was not run when game lose condition was met.');
      assert(document.getElementById('message').innerHTML == 'You Lose! :(','`showAnswer` was not run when game lose condition was met.');
    });
  });
});
