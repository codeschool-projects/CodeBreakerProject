let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if ((answer = '') && (attempt = '')) {
        setHiddenFields()
    }
}

function setHiddenFields() {
    answer = Math.random(0, 9999);
    while (answer.toString().length < 4) {
        answer = "0" + answer;
    }
    attempt = 0;
}

function setMessage(param) {
    if (param.length = 4) {
        return true;
    }
    else {
        message = "Guesses must be exactly 4 characters long.";
        return false;
    }
}
