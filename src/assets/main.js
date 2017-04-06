let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
  let input = document.getElementById('user-guess');

  if(answer.value === '' || attempt.value === ''){
    setHiddenFields();
  }

  if(!validateInput(input.value)){
    return false;
  }
  attempt.value++
}

//Use JS Math.random function to create a random number
// Multiply by 10000 and then round down using Math.floor method
// Finally, convert to string to confirm 4 digit length and modify if necessary

function setHiddenFields(){
  answer.value = Math.floor(Math.random() * 10000).toString();
  attempt.value = 0;

  while(answer.value.length < 4){
    answer.value += "0";
  }
  return answer.value
}

function setMessage(message){
  document.getElementById('message').innerHTML = message
}

function validateInput(input){
  if(input.length !== 4){
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
  return true;
}
