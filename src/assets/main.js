function guess(){
    let answer = document.getElementById('answer').value;
    let attempt = document.getElementById('attempt').value;
    let code = document.getElementById('code');
    let guessingDiv = document.getElementById('guessing-div');
    let input = document.getElementById('user-guess').value;
    let replayDiv = document.getElementById('replay-div');
    let results = document.getElementById('results');

    setMessage('');

    if(answer == "") {
        answer = Math.floor(Math.random() * 10000).toString();
        while(answer.length < 4) {
            answer = "0" + answer;
        }
        document.getElementById('answer').value = answer;
    }
    if(attempt == "") {
        attempt = 0;
    }

    if(input.length != 4) {
        setMessage('Guesses must be exactly 4 characters long.');
        return;
    } else {
        attempt++;
        document.getElementById('attempt').value = attempt;
    }

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

    results.innerHTML += html;

    if(correct == input.length) {
        setMessage('You Win! :)');
        showAnswer(true);
        guessingDiv.style = "display:none";
        replayDiv.style = "display:block";
    } else if(attempt >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        guessingDiv.style = "display:none";
        replayDiv.style = "display:block";
    } else {
        setMessage('Incorrect, try again.');
    }
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function showAnswer(success){
    if(success) {
        document.getElementById('code').className += " success";
    } else {
        document.getElementById('code').className += " failure";
    }
    document.getElementById('code').innerHTML = document.getElementById('answer').value;
}