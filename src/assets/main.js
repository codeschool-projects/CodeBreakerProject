let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;

function guess(){
    let input = document.getElementById('user-guess').value;

    setMessage('');

    if(answer == "" || attempt == "") {
        setHiddenFields();
    }

    if(!validateInput(input)){
        return;
    }

    if(getResults(input)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if(attempt >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

function getResults(input){
    let correct = 0;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(i = 0; i < input.length; i++)
    {
        if(input.charAt(i) == answer.charAt(i))
        {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.indexOf(input.charAt(i)) > -1) {
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

function setHiddenFields() {
    answer = Math.floor(Math.random() * 10000).toString();
    while(answer.length < 4) {
        answer = "0" + answer;
    }
    attempt = 0;
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function showAnswer(success){
    let code = document.getElementById('code');
    if(success) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
    code.innerHTML = answer;
}

function showReplay(){
    document.getElementById('guessing-div').style = "display:none";
    document.getElementById('replay-div').style = "display:block";
}

function validateInput(input) {
    if(input.length != 4) {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    } else {
        attempt++;
        return true;
    }
}