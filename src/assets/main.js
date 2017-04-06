let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
   if (answer == '' || attempt == ''){
       setHiddenFields();
   }
   
   if (!validateInput(input.value)){
       return false;
   } else {
       attempt++;
   }

   if ( getResults ){
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
    
    answer = Math.floor(Math.random()*10000);
    while (answer.toString().length < 4){
        answer = "0" + answer;
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

function getResults (input){
    let div = document.getElementById("results");
    let result = "";
    let position = "";
    let correctCharacters = 0;

    for (let i=0 ; i <= input.length ; i++ ){
        if ( input.charAt(i) == answer.charAt(i) ){
            position = `<span class="glyphicon glyphicon-ok"></span>`;
            correctCharacters++;
        } else if ( answer.includes( input.charAt(i) ) ){
            position =  `<span class="glyphicon glyphicon-transfer"></span>`;
        } else{
            position = `<span class="glyphicon glyphicon-remove"></span>`;
        }
        result += position;
    }
        div.innerHTML = `<div class="row"><span class="col-md-6">${input}</span><div class="col-md-6"> ${result} </div>`;    
    
    return (correctCharacters === input.length);
}

function showAnswer (param){
    let label = document.getElementById("code");
    let classes = label.getAttribute("class");

    if (param){
        label.innerHTML = document.getElementById("answer").val;
        label.setAttribute(`${classes} success`);
    } else {
        label.setAttribute(`${classes} failure`);;
    }
}

function showReplay (){
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("reply-div").style.display = "block";
}

