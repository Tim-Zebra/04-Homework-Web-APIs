// intializes the program, pulls highscores from storage.
function init() {
    // Loads highscores from local dat
    var storedHighscores = JSON.parse(localStorage.getItem("Highscores"))

    // Determines if there was anything in local storage. And if not, then do nothing.
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }

    displayHighscores();
}

// Starts the quiz
var startQuiz = document.querySelector(".startQuiz")

startQuiz.addEventListener("click", function() {
    //Remove the <p> element describing the game
    var introParagraph = document.getElementById("introParagraph");
    if (introParagraph !== null){
        introParagraph.remove();
    }
    // Resets the question value to the starting question
    questionNumber = 1;

    // Starts the timer
    timer();

    // Hide Start Button
    startQuiz.remove();

    // displays questions and answers
    displayQuestion();
    // Display the answers 

    // Display the submit button

});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A button for view Highscores  //////////////////////////////////////////
// displays in top left corner. When highscores are being view, dispears

// highscores object inplies stored key: values as name: score
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
      if(timeLeft < 0) {
        clearInterval(timeInterval);
        timerEl.textContent = "TIMES UP!";
        gameEnd();
      }
      timerEl.textContent = "Time Remaining: " + timeLeft + " seconds";
    

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

//pull a question from the question bank

// Display a question with possible answers
function displayQuestion () {
    // Gets question and displays answers
    getQuestion();
    loadAnswers();

    mainHeader.textContent = question;
}
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

var answerArray = [];
// variable with the requested question#
var questionNumber = 1;

// Retrieves the question and puts value to the question and answer variables
// To use: answer is an array. answer[0]=the text for the answer, answer[1]=if the answer is correct or not

var question = 'Question: ';
var answer1 = 'Answer 1';
var answer2 = 'Answer 2';
var answer3 = 'Answer 3';
var answer4 = 'Answer 4';

function getQuestion () {
    var questionChooser = 'question' + questionNumber;

    // Dictates what happens when there are no more questions left in the question bank
    if (Object.keys(questionBank).length < questionNumber) {
        question = 'No more questions to choose from!';
        console.log(question);
        return;
    }

    // gets all variables of the question: Question, Answer, Correct/Wrong
    question = questionBank[questionChooser].question;
    answer1 = questionBank[questionChooser].answers.choice1;
    answer2 = questionBank[questionChooser].answers.choice2;
    answer3 = questionBank[questionChooser].answers.choice3;
    answer4 = questionBank[questionChooser].answers.choice4;

    // Stores answers into an array;
    answerArray = [answer1, answer2, answer3, answer4];
}

// Loads answers as button functions
var main = document.getElementById("main");

function loadAnswers() {
    // Sets up an ordered list for the answers to display
    var ol = document.createElement("ol");
    // list.setAttribute("id", "answerList");

    // Loads answers into the list
    for(var i = 0; i < answerArray.length;  i++) {
        var li = document.createElement("li");
        li.textContent = answerArray[i][0];
        li.setAttribute('data-correct', answerArray[i][1])
        ol.appendChild(li);
    }

    // Adds completed list to the main tag
    main.appendChild(ol);
}

// removes the current answer list from HTML
// function clearAnswers () {
//     var list = getElementById("answerList");
//     list.remove();
// }

// init();
