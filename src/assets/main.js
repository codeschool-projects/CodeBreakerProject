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

function getResults (guess){
    let div = document.getElementById("results");
        
}



