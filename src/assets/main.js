let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
   if (answer.value == '' || attempt.value == ''){
       setHiddenFields();
   }
   
   if (!validateInput(input.value)){
       return false;
   } else {
       attempt++;
   }

   if ( getResults(input.value) ){
       setMessage("You Win! :)");
       showAnswer(true);
       showReplay();
   } else if (attempt >= 10){
       setMessage("You Lose! :(");
       showAnswer(false);
       showReplay();
   } else {
       setMessage("Incorrect, try again.");
   }
}

//implement new functions here
function setHiddenFields(){
    attempt = 0;
    
    answer.value = Math.floor(Math.random()*10000);
    while (answer.value.toString().length < 4){
        answer.value = "0" + answer.value;
    }
}

//Punto 9 mir no entender

function setMessage(text){
    let element = document.getElementById("message");
    element.innerHTML = text;
}

function validateInput (input){
    if (input.length === 4){
        return true; 
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults (inputStr){
    let div = document.getElementById("results");
    let result = "";
    let position = "";
    let correctCharacters = 0;

    for (let i=0 ; i <= inputStr.length - 1 ; i++ ){
        if ( inputStr.charAt(i) == answer.value.charAt(i) ){
            position = `<span class="glyphicon glyphicon-ok"></span>`;
            correctCharacters++;
        } else if ( answer.value.includes( inputStr.charAt(i) ) ){
            position =  `<span class="glyphicon glyphicon-transfer"></span>`;
        } else{
            position = `<span class="glyphicon glyphicon-remove"></span>`;
        }
        result += position;
    }
    
    div.innerHTML = div.innerHTML + `<div class="row"><span class="col-md-6">${inputStr}</span><div class="col-md-6"> ${result} </div>`;    
    return (correctCharacters === inputStr.length);
}

function showAnswer (param){
    let label = document.getElementById("code");
    let classes = label.getAttribute("class");

    if (param){
        label.setAttribute("class", `${classes} success`);
    } else {
        label.setAttribute("class", `${classes} failure`);;
    }

    label.innerHTML = document.getElementById("answer").value;
}

function showReplay (){
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}

