let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let answerValue= answer.value;

function guess() {
    let input = document.getElementById('user-guess');
    let inputValue= document.getElementById('user-guess').value;

    //add functionality to guess function here
    if (answerValue == ""){
      setHiddenFields();
    }

    if(validateInput(inputValue) == true) {
      attempt++;
    } else {
      return;
    }

    getResults();
}

//implement new functions here
function setHiddenFields(){
attempt= attempt.value=0;
answerValue= answer.value="";
while(answerValue.length<4){
  let partialAnswer; //this is one number in between 0-9
  (function setPartialAnswer(){
    partialAnswer= Math.floor(Math.random()*10);
  })();
  answerValue += partialAnswer;
  }
}

function setMessage(message){
document.getElementById('message').innerHTML= message;
}

function validateInput(inputValue){
if(inputValue.length == 4){
  return true;
}else {
  setMessage("Guesses must be exactly 4 characters long.");
  return false;
  }
}

function getResults( inputValue ){
  if(inputValue == answerValue){
      setMessage("You Win! :)");
  } else if (inputValue !== answerValue && attempt> 10) {
    setMessage("You Lose! :(");
  } else {
    setMessage("Incorrect, try again.");
  }


}
