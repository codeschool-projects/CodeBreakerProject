let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if(answer.value == "" || attempt.value == "") {
        setHiddenFields();
    }

    //Ensure user input is valid, iterate attempt if valid
    if(!validateInput(input.value)){
        return;
    } else {
        attempt.value++;
    }

    //Check user input against answer and display results
    if(getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if(attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

//function takes user input, check against the answer, and displays results
function getResults(input){
    let correct = 0;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(i = 0; i < input.length; i++)
    {
        if(input.charAt(i) == answer.value.charAt(i))
        {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';

    document.getElementById('results').innerHTML += html;

    if(correct == input.length) {
        return true;
    } else {
        return false;
    }
}

//function sets hidden fields
function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 10000).toString();
    while(answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }
    attempt.value = 0;
}

//function sets the message to supplied string
function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

//function shows the answer and colors based on if the player won or lost
function showAnswer(success){
    let code = document.getElementById('code');
    if(success) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
    code.innerHTML = answer.value;
}

//function hides the guessing-div and shows the replay-div to allow replay
function showReplay(){
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}

//function ensure input was 4 characters long
function validateInput(input) {
    if(input.length != 4) {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    } 
    return true;
}