// Global variables relating to HTML
var main = document.getElementById("main");
var startQuiz = document.querySelector(".startQuiz")
var timerEl = document.getElementById('timer');

// Other variables
var currentScore = 0;
var timeLeft = 20;

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

startQuiz.addEventListener("click", function() {
    //Remove the <p> element describing the game
    var introParagraph = document.getElementById("introParagraph");
    if (introParagraph !== null){
        introParagraph.remove();
    }
    // Resets the question value to the starting question
    questionNumber = 1;
    // Resets the score
    currentScore = 0;

    // Starts the timer
    timer();

    // Hide Start Button
    startQuiz.remove();

    // displays questions and answers
    displayQuestion();
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

// Timer that counts down by seconds
function timer() {
    // Initial clock in seconds. Always use 1 value less than what you want
    timeLeft = 19;
    // +1 accounts for the lag at the start due to the timeInterval
    timerEl.textContent = "Time Remaining: " + (timeLeft+1) + " seconds";

    // Time counter
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time Remaining: " + timeLeft + " seconds";
        timeLeft--;

        if(timeLeft < 9) {
            timerEl.setAttribute("style", "color: red");
        }

        if(timeLeft < 0) {
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

//pull a question from the question bank

// Display a question with possible answers
function displayQuestion () {

    // Gets question and displays answers
    getQuestion();
    loadAnswers();
    
    mainHeader.textContent = question;


}
// Take in the user selection
main.addEventListener("click", function(event) {
    var element = event.target;
    var isCorrect = element.getAttribute("data-correct");

    // Determines if the selected element was one of the answers from the list
    if (element.matches("li") === true) {
        // Determine if answer correct
        if (isCorrect === 'true') {
            console.log('answer correct!');
            currentScore ++;
        }
        else {
            console.log('answer wrong :(');
            timeLeft = timeLeft-2;
            
        }
    questionNumber ++;
    clearAnswers();
    displayQuestion();    
    }
});


// \\\\\\\\\\\\\\\\\\\\\\\QUESTION BANK///////////////////////////////
// Global variables ideally to only be used within the "Question Bank" scope.
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
            choice1: ["This is a answer #21?", false],
            choice2: ["This is a answer #22?", false],
            choice3: ["This is a answer #23?", true],
            choice4: ["This is a answer #24?", false],
        }
    }
}

// Array to Store Answers
var answerArray = [];
// variable with the requested question#
var questionNumber = 1;

// creates global variables for the Question functions without a null value
var question = 'Question: ';
var answer1 = 'Answer 1';
var answer2 = 'Answer 2';
var answer3 = 'Answer 3';
var answer4 = 'Answer 4';

// Retrieves the question and puts value to the question and answer variables
// To use: answer is an array. answer[0]=the text for the answer, answer[1]=if the answer is correct or not

function getQuestion () {
    var questionChooser = 'question' + questionNumber;
    // Dictates what happens when there are no more questions left in the question bank
    if (Object.keys(questionBank).length < questionNumber) {
        question = 'No more questions to choose from!';
        answerArray = [];
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
function loadAnswers() {
    // Sets up an ordered list for the answers to display
    var ol = document.createElement("ol");
    ol.setAttribute("id", "answerList");

    // Loads answers into the list
    for(var i = 0; i < answerArray.length;  i++) {
        var li = document.createElement("li");
        li.textContent = answerArray[i][0];
        li.setAttribute('data-correct', answerArray[i][1]);

        ol.appendChild(li);
    }

    // Adds completed list to the main tag
    main.appendChild(ol);
}

// removes the current answer list from HTML
function clearAnswers () {
    var list = document.getElementById("answerList");
    list.remove();
}

// init();
