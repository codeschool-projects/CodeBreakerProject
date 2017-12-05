let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
   if (answer || attempt == '') {
   	call setHiddenFields();
   }

   if (!validateInput(input.valie) == flase ) {
	return false;
}
else {
	attempt ++;
 }
 if (getResults()==true) {
 	setMessage("You Win! :)");
 }
 else if (getResults()==flase && attempt.value >= 10  ) {
    setMessage("You Lose! :(");
 }
 else {
 	setMessage("Incorrect, try again.");
 }
}

function getResults(input) {
var countRight = 0;
let html = 	<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6"> ;
for(i=0; i<input.length;i++){
	if(input.charAt(i) == answer.charAt(i)) {
		html = html + "<span class="glyphicon glyphicon-ok"></span>";
		Count++;
	} 
	else if(answer.indexOf(input.charAt(i)) > -1) {
		html = html + "<span class="glyphicon glyphicon-transfer"></span>";
	}
	else {
		html = html + <span class="glyphicon glyphicon-remove"></span>;
	}
  }
if (Count == 4) {
	return true;
}
else {
	return false;
}
}

//implement new functions here
function setHiddenFields() {
   var attempt = 0;
   var answer = (Math.floor(Math.random()*9999)).toString();
if (answer.length<4) {
   answer = answer+0;
   return answer;
  }
else {
return answer;
  }
}

function setMessage (message) {
 document.getElementById('message').innerHTML = message;
}

function validateInput ("input") {
	if (input.length == 4) {
		return true;
	}
else {
	setMessage ("Guesses must be exactly 4 characters long.");
	return false;

	}
 }
}

function showAnswer (code) {
	document.getElementById('code').innerHTML = answer.value;
 if (code == ture) {
 	code.className = code + " success" ;
  }
 else {
 	code.className = code + " failure" ;
  }
}