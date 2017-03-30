let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
   if (answer == '' || attempt == ''){
       setHiddenFields();
   }
   
   if (validateInput(input.value == false){
       // Hint punto 11
        return false;
   } else {
       attempt++;
   }
}

//implement new functions here
function setHiddenFields(){
    answer = Math.floor(Math.random()*1000);
    while (answer.toString().length < 4){
        answer = "0" + answer;
    }
    attempt = 0;
}

//Punto 9 mir no entender

function setMessage(param){
    message = param.innerHTML;
}

function validateInput (input){
    if (input.length = 4){
        return true; 
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults (input){
   let div = <div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">;
   
   for (let i = 0; input.toString().length < 4; i++){
        if (input.toString().i == answer.toString().i){
            div = div + <span class="glyphicon glyphicon-ok"></span>;
        } else {
            div = div + 
        }
    }
}