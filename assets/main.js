function guess(){
    var input = document.getElementById('user-guess').value;
    var answer = document.getElementById('answer').value;
    var attempt = document.getElementById('attempt').value;
    var message = document.getElementById('message');
    var code = document.getElementById('code');
    var guessingdiv = document.getElementById('guessing-div');
    var replaydiv = document.getElementById('replay-div');

    message.innerHTML = "";

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
        message.innerHTML = 'Guesses must be exactly 4 characters long.';
        return;
    } else {
        attempt++;
        document.getElementById('attempt').value = attempt;
    }

    var correct = 0;
    var html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
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
        message.innerHTML = 'You Win! :)';
        code.className += " success";
        code.innerHTML = answer;
        guessingdiv.style = "display:none";
        replaydiv.style = "display:block";
    } else if(attempt >= 10) {
        message.innerHTML = 'You Lose! :(';
        code.className += " failure";
        code.innerHTML = answer;
        guessingdiv.style = "display:none";
        replaydiv.style = "display:block";
    } else {
        message.innerHTML = 'Incorrect, try again.';
    }
}