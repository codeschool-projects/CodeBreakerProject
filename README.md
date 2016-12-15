# Work in progress

Please note, at this time this project is not yet complete. While you are welcome to watch this project grow, at this point it's not yet ready for use. Thank you for your interest in Codeschool Projects!

# Use Javascript to Create a "Code Breaker" Game

You'll build a Code Breaker game using Javascript. The game will randomly generate a hidden code and the player gets 10 attempts to guess that code based on provided feedback. (based of the Mastermind board game)

<!-- Place Screen Shot of game here -->

# Getting Started

To get started with this project, head over to the [Link to Repository](https://www.codeschool.com/projects/CodeBreaker) project on Code School, and begin! It'll walk you through all of the steps below. They're included here in the readme in case you work better locally, or want to try working on this project offline.

To get setup locally, run the following commands:

```npm install
npm start```

# What You'll Use

- Javascript
- DOM elements
- Loops
- Conditions
- Expressions

# What You'll Learn

You will further your Javascript skills, as well as become more comfortable writing Javascript code to create an entertaining game.

# Live Demo

[Check out this link] (https://codeschool-projects.github.io/CodeBreakerProject/) to see a working version of this project. Feel free to alter and expand on this project to make your own twist on the Code Breaker game once you've completed the steps.

You'll build a Code Breaker game that you can play and show off to others as an example of your abilities in Javascript.

# Setup Instructions

Once you have cloned the forked repository, go into the directory containing the project and look for the `/src` directory. This is the directory where you will be making changes when you start the following step-by-step instructions. You can simply open those files in a text editor to get started.

In this project, all of your changes will happen in the file called `/src/assets/main.js`.

# Tasks

Complete the following tasks to finish this project.

## Set the hidden input "answer" element

The element answer needs to be set to randomly generated number (between 0 and 9999). Hint: `Math.round()` can be used to randomly generate a number between 0 and 1 (up to 18 decimal points) and `Math.floor(input)`, `Math.ceiling(input)`, or `Math.round(input)` to round.

## Make sure the "answer" element is exactly 4 characters long

The element answer needs to be exactly 4 characters long. Hint: In order to add a zero to the front of answer it must be a string not a number, you can convert numbers to strings with `.toString()`. We can create a `while` loop that runs while `answer.length` is less than 4 that puts a `0` before answer's current value.

## Only set the "answer" element when it's not already set

If the element answer already has a 4 character number value we shouldn't reset it. Hint: we can use an `if` condition to only run our code when answer isn't set.

## Set the hidden input "attempt" element

When the element attempt isn't set, then set it to `0`.

## Validate user input is a 4 character number

Check the value provided from the `user-guess` element to see if it has a length of 4, if not return an error message `Guesses must be exactly 4 characters long.` to the element `message` and stop the function. Hint: The element message is a label, so you'll want to set it's `.innerHTML` not it's `.value`. You can stop the function using `return`.

## Increment attempt element

Increment the attempt element to keep count for when the user has made all 10 of their permitted attempts.

## Respond with results of a guess

Every guess we need to add the results to our `results` element. The added results should be `<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">` where input is the value the user guessed. Followed by a `<span class="glyphicon glyphicon-ok"></span>` if a character is correct, a `<span class="glyphicon glyphicon-transfer"></span>` if a character is in the answer, but isn't in the right place, and a `<span class="glyphicon glyphicon-remove"></span>` if the number isn't in the answer at all. HINT: You can create a variable to hold the initial div, then add each character's results to that variable in a `for` loop' then add the closing `div` tags after the loop. After which you can just set the `results` element's `innerHTML` to that variable.

## Respond with Win, Lose, or Try again

Our `message` element's `innerHTML` should say `You win! :)` if the user gets the answer correct, `You Lose! :(` if the user doesn't guess correctly after 10 guesses, or `Incorrect, try again.` if they didn't guess correctly but have more guesses left.

## Show the answer on Win or Lose

When the user wins or lose we need to show the answer in our `code` element's `innerHTML`. If the user wins we should also add the `success` class to `code`, if the user loses we should add the `failure` class to `code`. Hint: You can add classes to an element using `.className`, but you'll need to put a space before whatever class you're adding.

## Hide Guessing div, Show Replay div

When a user wins or loses we need to hide the div `guessing-div` and show the div `replay-div` so the player start over after winning or losing. This can be done by setting their `.style` to `display:none` to hide the div and `display:block` to show a div.

# Next Steps

Now that you've completed this project, you should make it available online so you can share your progress with others! One way to do this is by using GitHub Pages.

To deploy your `/src` directory to GitHub Pages, be sure to commit all of your changes and make a new branch called `gh-pages`. Once you are checked into the `gh-pages` branch, run the following command:

```git subtree push --prefix src origin gh-pages```

This will push the `src` folder up to GitHub on the `gh-pages` branch. After that, you hsould be able to open up `http://username.github.io/CodeBreakerProject`, where `username` is your GitHub username.