let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer === '' || attempt === '') {
      setHiddenFields();
    }

    if (validateInput(input.value) === false){
      return false;
    }
    else {
      attempt++;
    }

    getResults() {
      if(return true) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
      }
      elseif (!return true && attempt === 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
      }
      else {
        setMessage("Incorrect, try again");
      }
    }
}

//implement new functions here
function setHiddenFields () {
  attempt = 0;
  answer = Math.floor((Math.random() * 9999) + 1);
  answer = answer + '';
  while (answer.length < 4) {
    answer = '0'.concat(answer);
  }
}

function setMessage(message) {
  document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
  if (input.length === 4) {
    return true;
  }
  else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(result) {
  let initial = '<div class="row"><span class="col-md-6">';
  let count = 0;
  for (let i = 0; i <= input.length; i++) {
    if (result[i] === answer[i]) {
      result[i] = '<span class="glyphicon glypicon-ok">' + result[i];
      count++;
    }
    else if (answer.match(result[i])) {
      result[i] = '<span class="glyphicon glyphicon-transfer">' + result[i];
    }
    else {
      result[i] = '<span class="glyphicon glyphicon-remove">' + result[i];
    }
    result[i] = result[i] + '</span>';
  }

  result[i] = result[i] + '</span></div>';
  document.getElementById('results').innerHTML = result;
  if (count === 4) {
    return true;
  }
  else {
    return false;
  }
}

function showAnswer(showMe) {
  document.getElementById('code').innerHTML = answer;

  if (getResults() return true) {
    document.getElementsByClassName('code').innerHTML = answer + " success";
  }
  else {
    document.getElementsByClassName('code').innerHTML = answer + " failure";
  }
}

function showReplay() {
  document.getElementById('guessing-div').sytle.display = "none";
  document.getElementById('replay-div').sytle.display = "block";
}
