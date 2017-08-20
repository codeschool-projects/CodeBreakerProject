let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');
let guessingDiv = document.getElementById('guessing-div');
let replayDiv = document.getElementById('replay-div');
function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (!answer.value && !attempt.value) {
      setHiddenFields();
    }
    if (!validateInput(input.value)) {
      return false;
    } else {
      attempt.value++; 
    }

    getResults(input.value) === true ? 
      ( setMessage('You Win! :)'), showAnswer(true), showReplay() ) : 
      ( attempt.value >= 10 ? (setMessage('You Lose! :('), showAnswer(false), showReplay()) : setMessage("Incorrect, try again.") );
};

//implement new functions here
function setHiddenFields () {
  let myValue = Math.floor(Math.random() * 10000).toString();
  let myValueLength = myValue.length;
  if (myValueLength < 4) {
    while (myValueLength < 4) {
      myValue = '0' + myValue;
      myValueLength++;
    }
  }
  console.log(myValue);
  answer.value = myValue;
  attempt.value = '0';
};

function setMessage (data) {
  message.innerHTML = data;
};

function validateInput (input) {
  return input.length === 4 ? 
    true : 
    (
      message.innerHTML = 'Guesses must be exactly 4 characters long.',  
      false
    );
};
// Create a getResults function that has one parameter. In this function, we need to add the results of the user's guess to our results div's innerHTML. Each result should begin with <div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6"> where input is the value the user guessed. Then for each character, you should add <span class="glyphicon glyphicon-ok"></span> if the character is in the correct position in the answer, a <span class="glyphicon glyphicon-transfer"></span> if the character is in the answer but isn't in the right position, and <span class="glyphicon glyphicon-remove"></span> if the number isn't in the answer at all. Don't forget to close your divs!
function getResults (guess) {
  let showAnswer = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">',
      count = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer.value[i]) {
      showAnswer += '<span class="glyphicon glyphicon-ok"></span>';
      count++;
    } else if (answer.value.indexOf(guess[i]) !== -1) {
      showAnswer += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      showAnswer += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  return count === 4 ? true : (
    showAnswer += '</div>',
    results.innerHTML += showAnswer,
    false
  )
}


function showAnswer (truthy) {
  code.innerHTML = answer.value;
  truthy ? code.className += ' success' : code.className += ' failure';
}

function showReplay () {
  guessingDiv.style.display = 'none';
  replayDiv.style.display = 'block';
}







