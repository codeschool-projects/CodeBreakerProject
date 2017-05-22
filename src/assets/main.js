var answer = document.getElementById('answer');
var attempt = document.getElementById('attempt');

function guess() {
    var input = document.getElementById('user-guess');
    if (answer.value == "" || attempt.value == "") {
        setHiddenFields();
    }
    if(!validateInput(input.value)){
        return false;
    }
    attempt.value++;
    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
        } else {
            setMessage("Incorrect, try again.");
        }
}
function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 10000).toString();
    while (answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }
    attempt.value = "0";
}
function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}
function validateInput(input) {
    if(input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}
function getResults(input) {
    var html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    var i;
    for (i = 0; i < input.length; i++) {
        if(input.charAt(i) == answer.value.charAt(i)) {
            html += '<span class="glyphicon glyphicon-ok"></span>';
        } else if(answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += "</div></div>";
    document.getElementById('results').innerHTML += html;
    if (input == answer.value) {
        return true;
    }
    return false;
}
function showAnswer(success) {
    var code = document.getElementById("code");
    if (success) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
    code.innerHTML = answer.value;
}
function showReplay() {
    var guessingDiv = document.getElementById("guessing-div");
    var replayDiv = document.getElementById("replay-div");
    guessingDiv.style.display = "none";
    replayDiv.style.display = "block";
}