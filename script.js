//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A button for view Highscores  //////////////////////////////////////////
// displays in top left corner. When highscores are being view, dispears
var highschoresEl = document.getElementById('highscores');



//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A timer that counts down  //////////////////////////////////////////////
// displays in top right corner.
// Appears only during quiz

//variables needed for timer function
var timerEl = document.getElementById('timer');

// Timer that counts down by seconds
function timer() {
    // Initial clock in seconds.
    var timeLeft = 55;
    timerEl.textContent = "Time Remaining: " + timeLeft;

    // Time counter
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = "Time Remaining: " + timeLeft;
    
      if(timeLeft === 0) {
        clearInterval(timeInterval);
        timerEl.textContent = "TIMES UP!";
      }
     }, 1000);
  }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Main Content: Questions, /////////////////////////////////////////////////////

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
