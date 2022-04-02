// intializes the program, pulls highscores from storage.
function init() {
    // Loads highscores from local dat
    var storedHighscores = JSON.parse(localStorage.getItem("Highscores"))

    // Determines if there was anything in local storage. And if not, then do nothing.
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }

}

init();

// Starts the quiz
var startQuiz = document.querySelector(".startQuiz")

startQuiz.addEventListener("click", function() {
    //Remove the <p> element describing the game
    var introParagraph = document.getElementById("introParagraph");
    if (introParagraph !== null){
        introParagraph.remove();
    }
    // Starts the timer
    timer();
    // Hide Start Button
    startQuiz.remove();
    // Change the header to "Question:1"
    // Display the answers 
    // Display the submit button

});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A button for view Highscores  //////////////////////////////////////////
// displays in top left corner. When highscores are being view, dispears
var highscores = {};
var highschoresEl = document.getElementById('highscores');

// // Submit highscore 
// function submitHighscore () {
//     event.preventDefault();
// }

// // Store highscore locally
// function storeHighscore () {

// }

// // display highscore list
// function displayHighscore () {

// }

// When highscores button is selected, before game starts, player can view highscores

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A timer that counts down  //////////////////////////////////////////////
// displays Timer

// Timer displays in top right corner.
// Appears only during quiz

//variables needed for timer function
var timerEl = document.getElementById('timer');

// Timer that counts down by seconds
function timer() {
    // Initial clock in seconds.
    var timeLeft = 20;
    timerEl.textContent = "Time Remaining: " + timeLeft;

    // Time counter
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = "Time Remaining: " + timeLeft;
    
      if(timeLeft === 0) {
        clearInterval(timeInterval);
        timerEl.textContent = "TIMES UP!";
        gameEnd();
      }
     }, 1000);
  }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Main Content: Questions, /////////////////////////////////////////////////////
// Ends the game. displays 
function endGame () {
    // Removes the option to question and answer
    // Displays the form to submit highscore
}


//varibles needed for main quiz function
var mainHeader = document.getElementById('mainHeader');

// function that changes the header (this function will also remove the paragraph at the start)

//pull a question from the question bank

// Display a question with possible answers

// Take in the user selection

// Be able to select an Answer

// Determine if answer is correct or not, and consequences



// \\\\\\\\\\\\\\\\\\\\\\\QUESTION BANK///////////////////////////////

// Stores questions
var questionBank = {
    question1: {
        question: 'This is a Question#1?',
        answers: {
            choice1: ["This is a answer #1?", false],
            choice2: ["This is a answer #2?", false],
            choice3: ["This is a answer #3?", true],
            choice4: ["This is a answer #4?", false],
        }
    },
    question2: {
        question: 'This is a Question#2?',
        answers: {
            choice1: ["This is a answer #1?", false],
            choice2: ["This is a answer #2?", false],
            choice3: ["This is a answer #3?", true],
            choice4: ["This is a answer #4?", false],
        }
    }
}

// variable with the requested question#
var questionNumber = 1;

// Retrieves the question and puts value to the question and answer variables
// To use: answer is an array. answer[0]=the text for the answer, answer[1]=if the answer is correct or not
function getQuestion(questionNumber) {
    var questionChooser = 'question'+questionNumber;
    // gets all variables of the question: Question, Answer, Correct/Wrong
    var question = questionBank[questionChooser].question;
    var answer1 = questionBank[questionChooser].answers.choice1;
    var answer2 = questionBank[questionChooser].answers.choice2;
    var answer3 = questionBank[questionChooser].answers.choice3;
    var answer4 = questionBank[questionChooser].answers.choice4;

    // TODO; need to attach to global elements that link to the quetion
}
