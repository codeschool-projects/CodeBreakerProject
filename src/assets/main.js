let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById("message");
let fill = 0;
function setHiddenFields() {
  answer.value = Math.floor(Math.random() * 10000);
  answer.value = answer.value.toString();
  while(answer.value.length < 4){
    answer.value = "0" + answer.value;
  }
  attempt = 0;
}

function setMessage(input){
  message.innerHTML = input;
}

function validateInput(input){
  if (input.length === 4) {return true;}
  else {
    message.innerHTML = "Guesses must be exactly 4 characters long.";
    return false;
  }
}

function getResults(input){
  let results = input;
  let isHere = function(input){
    for(let index = 0; index < answer.value.length; index++){
      let answer2 = answer.value.charAt(index);
      if( answer2 == input) {
        return true;
      }
    }
  }
  for (let i = 0, inputValue = results.value; i < 5; i++) {
    let num = inputValue.charAt(i);
    if(num == answer.value.charAt(i)){
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
  let code = document.getElementsByClassName("code");
  code.innerHTML = answer;
  code.class += victory === false? ` failure` : ` success` ;
}
function showReplay(){
  document.getElementById("guessing-div").style.display = "none";
  document.getElementById("replay-div").style.display = "block";
}

function guess() {
    let input = document.getElementById('user-guess');
    attempt === ""? setHiddenFields() : fill++;
    if (validateInput(input.value) === false) {return false;}
    else {attempt.value++}
    if (getResults(input) === false){
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
      showReplay();
    }
    console.log(attempt.value);
}
