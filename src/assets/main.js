let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let answerValue= answer.value;

function guess() {
    let input = document.getElementById('user-guess');
    let inputValue= input.value;
    //add functionality to guess function here
    if (answerValue == ""){
      setHiddenFields();
    }

    console.log(answerValue);

    if(validateInput(inputValue) == true) {
      attempt++;
    } else {
      return;
    }

    getResults(inputValue);
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

function getResults(inputValue){
let NewDiv= document.getElementById('results').appendChild(document.createElement("div")),
    NewDivFormatted= NewDiv.className= "row",
    GuessSpan= NewDiv.appendChild(document.createElement("span")),
    GuessSpanFormatted= GuessSpan.classList.add("col-md-6"),
    GuessSpanWithInput= GuessSpan.innerHTML= inputValue,              //this will write down player guess
    ResultSpan= NewDiv.appendChild(document.createElement("span")),
    ResultSpanFormatted= ResultSpan.classList.add("glyphicon");

for(let i=0; i < answerValue.length; i++){
  if (inputValue.charAt(i) === answerValue.charAt(i)) {               //this is adding OK mark if character in guess matches character in answer
    let ResultSpan= NewDiv.appendChild(document.createElement("span")),
        ResultSpanFormatted= ResultSpan.classList.add("glyphicon", "glyphicon-ok");
  } else if (answerValue.includes(inputValue.charAt(i))){
    let ResultSpan= NewDiv.appendChild(document.createElement("span")),
        ResultSpanFormatted= ResultSpan.classList.add("glyphicon", "glyphicon-transfer");
  } else {
    let ResultSpan= NewDiv.appendChild(document.createElement("span")),
        ResultSpanFormatted= ResultSpan.classList.add("glyphicon", "glyphicon-remove");
  }
}

  if(inputValue == answerValue){
      setMessage("You Win! :)");
      showAnswer(true);
      showReply();
  } else if (inputValue !== answerValue && attempt> 10) {
    setMessage("You Lose! :(");
    showAnswer(false);
    showReply();
  } else {
    setMessage("Incorrect, try again.");
  }

}

function showAnswer(result){
  document.getElementById('code').innerHTML= answerValue;
  if(result == true){
  document.getElementById('code').classList.add("success");
} else {
  document.getElementById('code').classList.add("failure");
}
}

function showReply(){
  document.getElementById('guessing-div').style.display= "none";
  document.getElementById('replay-div').style.display= "block";
}
