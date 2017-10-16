let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById("message");
let fill = 0;

function guess() {
    let input = document.getElementById('user-guess');
    attempt === ""? setHiddenFields() : fill++;
    if (validateInput(input.value) === true) {attempt++;}
    else {return false;}
    if (getResults() === false){
      if(attempt.value < 10){
        setMessage("Incorrect, try again.");
      }
      else {
        setMessage("You lose! :(");
        showAnswer(false);
      }
    }
    else{
      setMessage("You win!:)");
      showAnswer(true);
    }
}

function setHiddenFields() {
  answer = Math.floor(Math.random() * 1000);
  answer.toString();
  while(answer.length < 4){
    answer = "0" + answer;
  }
  attempt = 0;
}

function setMessage(message){
  message.innerHTML = message;
}

function validateInput(input){
  if (input.length === 4) {return true;}
  else {
    message.innerHTML = "Guesses must be exactly 4 characters long.";
    return false;
  }
}

function getResults(){
  let results = input;
  let isHere = function(input){
    for(let index = 0; index < answer.length; index++){
      let answer2 = answer.charAt(index);
      if( answer2 == input) {
        return true;
      }
    }
  }
  for (let i = 0, input = results.value; i < 5; i++) {
    let num = results.value.charAt(i);
    if(num == answer.charAt(i)){
      results += `\n\t<span class="glyphicon glyphicon-ok"></span>`;
    }
    else if (isHere(num)){
      results += `\n\t<span class="glyphicon glyphicon-transfer"></span>`
    }
    else{
      results += `\n\t<span class="glyphicon glyphicon-remove"></span>`;
    }
  }
}
function showAnswer(victory){
  let code = document.getElementByClass("code");
  code.innerHTML = answer;
  code.class += victory === false? ` failure` : ` success` ;
}
function showReplay(){
  getElementById("guessing-div").style.display = none;
  getElementById("replay-div").style.display = block;
}
