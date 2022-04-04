// Global variables relating to HTML
var main = document.getElementById("main");
var startQuiz = document.querySelector(".startQuiz")
var timerEl = document.getElementById('timer');
var mainHeader = document.getElementById('mainHeader');
var buttonHighscores = document.getElementById("highscores");
var footer = document.getElementById("footer");

var initialsInput = null;
var submitButton = null;

// Other variables
var currentScore = 0;
var timeLeft = 0;
// Initial clock in seconds. Always use 1 value less than what you want
var timeLeft = 19;


// highscores array will hold player data as objects. Each player's data will look like: {initials: , score: }
var highscoresArray = [];
var highschoresEl = document.getElementById('highscores');

// intializes the program, pulls highscores from storage.
function init() {
    getHighscores();
}

init();

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
    buttonHighscores.remove();
    footer.remove();

    // displays questions and answers
    displayQuestion();
});

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A button for view Highscores  //////////////////////////////////////////
// Allows viewing of highscores before game starts.
buttonHighscores.addEventListener("click", function () {
    // Hides the intro paragraph and Start button
    introParagraph.remove();
    startQuiz.remove();

    // displays highscores
    displayHighscores();
});


// Generates highscore form 
function formHighscore () {
    // creates the submission form for high scores
    console.log(highscoresArray);
    var form = document.createElement("form");
    form.setAttribute('id', 'form');
    form.setAttribute('method', 'POST');

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "your intials...");
    input.setAttribute("name", "initialsText");
    input.setAttribute("id", "initialsText");

    var button = document.createElement("button");
    button.setAttribute('id', 'submitButton');
    button.textContent = 'Submit';

    form.appendChild(input);
    form.appendChild(button);
    main.appendChild(form);

    initialsInput = document.getElementById('initialsText');
    submitButton = document.getElementById('submitButton');

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        var initials = initialsInput.value.trim();
        var data = {};
        
        if (initials === "") {
            return;
        }
        
        data.initials = initials;
        data.score = currentScore;

        highscoresArray.push(data);

        initialsInput.value = "";
        
        storeHighscores();
        form.remove();
        displayHighscores();
    })
 }

// Store highscore locally
function storeHighscores() {
    localStorage.setItem("highscores", JSON.stringify(highscoresArray));
}

// Gets locally stored highscores
function getHighscores () {
    if (JSON.parse(localStorage.getItem("highscores")) !== null) {
    highscoresArray = JSON.parse(localStorage.getItem("highscores"));
    }
}

// // display highscore list
function displayHighscores () {
    getHighscores();

    // Clears the heading
    buttonHighscores.remove();
    timerEl.remove();

    // Display the highscores
    var colorHeader = mainHeader.textContent = "HIGHSCORES";

    randomColorHighscoreLetters(colorHeader);

    // Refreshes Highscore letters with random colors
    window.setInterval(function () {
        // Adds color to each letter and outputs them into mainHeader
        randomColorHighscoreLetters(colorHeader);
    }, 1000);

    // Creates a table for high scores
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    table.setAttribute("class", "highscoresList");

    // creates the table header
    var thPlayer = document.createElement("th");
    var thScores = document.createElement("th");
    thPlayer.textContent = "Players:";
    tr.appendChild(thPlayer);

    thScores.textContent = "Scores:";
    tr.appendChild(thScores);

    // adds header to table
    table.appendChild(tr);


    // // Arrange highscores by...score
    if (highscoresArray.length > 1) {
        highscoresArray.sort((a, b) => b.score - a.score)
    }

    if (highscoresArray.length > 0) {

        // Loads highscores into the table
        for(var i = 0; i < highscoresArray.length;  i++) {
            tr = document.createElement("tr");
            tdPlayer = document.createElement("td");
            tdScore = document.createElement("td");

            tdPlayer.textContent = highscoresArray[i].initials;
            tr.appendChild(tdPlayer);

            tdScore.textContent = highscoresArray[i].score;
            tr.appendChild(tdScore);

            table.appendChild(tr);
        }
    }

    // Adds completed table to the main tag
    main.appendChild(table);

     var button = document.createElement("button");
     button.textContent = "ok";

     main.appendChild(button);

    //  I want to cause an "event Default" to reset the game to the starting page
     button.addEventListener("click", function() {
        location.reload();
     });

}

// Adds a random color to each letter of the header
function randomColorHighscoreLetters (colorHeader) {
    mainHeader.textContent = "";
    for (var i = 0; i < colorHeader.length; i++) {
        // creates span variable for a single letter
        var letter = document.createElement("span");
        letter.textContent = colorHeader[i];

        //Generates a random color for the variable
        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

        letter.setAttribute("style", "color:" + randomColor);
        mainHeader.appendChild(letter);
    }
}

// When highscores button is selected, before game starts, player can view highscores

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ A timer that counts down  //////////////////////////////////////////////
// Timer that counts down by seconds
function timer() {
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
            endGame();
        }  
     }, 1000);
  }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Main Content: Questions, /////////////////////////////////////////////////////
// Ends the game. displays 
function endGame () {
    // Removes the option to question and answer
    mainHeader.textContent = "Enter your intials to save your highscore!";
    clearAnswers();

    // Displays the form to submit highscore
    formHighscore();
}

// Display a question with possible answers
function displayQuestion () {

    // Gets question and displays answers
    getQuestion();
    loadAnswers();
    
    mainHeader.textContent = question;


}
// Processes user selection
main.addEventListener("click", function(event) {
    event.preventDefault();

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
        question: 'What are HTML semantic elements?',
        answers: {
            choice1: ["A semantic element clearly describes its meaning to both the browser and the developer.", true],
            choice2: ["A semantic element reveals nothing about its content to the browser or the developer.", false],
            choice3: ["Semantic elements are outdated and are no longer used in HTML.", false],
            choice4: ["Semantic elements, like `<div>`, hold the important content together so it's easy to understand.", false],
        }
    },
    question2: {
        question: 'What CSS declaration could you add to `<div style="width: 50%;">` to center it?',
        answers: {
            choice1: ["align: center", false],
            choice2: ["float: center", false],
            choice3: ["text-align: center", false],
            choice4: ["margin: 0 auto", true],
        }
    },
    question3: {
        question: 'Which of the following statements are NOT true?',
        answers: {
            choice1: ["Inline elements are elements that only take up as much width as needed.", false],
            choice2: ["Block elements take all the possible width, regardless of its actual size.", false],
            choice3: ["Inline elements automatically start a new line.", true],
            choice4: ["Block elements are elements that always start on a new line.", false],
        }
    },
    question4: {
        question: 'What is one advantage of Responsive Design for a developer?',
        answers: {
            choice1: ["Faster page loading time", false],
            choice2: ["Faster development", true],
            choice3: ["More social sharing", false],
            choice4: ["Improved SEO", false],
        }
    },
    question5: {
        question: 'How do you declare a custom property or \'CSS variable\'?',
        answers: {
            choice1: ["var root-my-color = green;", false],
            choice2: [":root { var my-color = green; }", false],
            choice3: ["var my-color = green;", false],
            choice4: [":root { --my-color: green; }", true],
        }
    },
    question6: {
        question: 'Which attribute selector would you use if you wanted to target all <a> elements that have an href value that ends with \'.png\' to change the color? What would this look like in style.css?',
        answers: {
            choice1: ["a.href { color: green }", false],
            choice2: [".href$'.png' { color: green }", false],
            choice3: ["a[href$='.png']{ color: green }", true],
            choice4: ["a[href.png] { color: green }", false],
        }
    },
    question7: {
        question: 'Inside the HTML document, where do you place your JavaScript code?',
        answers: {
            choice1: ["Inside the <link> element", false],
            choice2: ["In the <footer> element", false],
            choice3: ["Inside the <head> element", false],
            choice4: ["Inside the <script> element", true],
        }
    },
    question8: {
        question: 'What are the six primitive data types in JavaScript?',
        answers: {
            choice1: ["string, num, falsy, bigInt, symbol, undefined", false],
            choice2: ["string, number, boolean, bigInt, symbol, undefined", true],
            choice3: ["sentence, int, truthy, bigInt, symbol, undefined", false],
            choice4: ["sentence, float, data, bigInt, symbol, undefined", false],
        }
    },
    question9: {
        question: 'From the given array which index is the letter \'b\' on? [\'a\', \'b\', \'c\', \'d\']',
        answers: {
            choice1: ["1", true],
            choice2: ["3", false],
            choice3: ["2", false],
            choice4: ["0", false],
        }
    },
    question10: {
        question: 'Which of the following would change an element\'s background to red?',
        answers: {
            choice1: ["element.setAttribute(\"red\");", false],
            choice2: ["element.setAttribute(\"style\", \"red\");", false],
            choice3: ["element.setAttribute(\"class\", \"background: red\");", false],
            choice4: ["element.setAttribute(\"style\", \"background-color: red\");", true],
        }
    },
    question11: {
        question: '\"How would you append the following to the DOM? var myDiv = document.createElement(\"div\");',
        answers: {
            choice1: ["myDiv.appendChild.document.body;", false],
            choice2: ["document.body.appendChild = myDiv;", false],
            choice3: ["document.body.appendChild(\"div\");", false],
            choice4: ["document.body.appendChild(myDiv);", true],
        }
    },
    question12: {
        question: 'Which statement best describes what is happening to data when it is persisted to local storage.',
        answers: {
            choice1: ["The data is stored in the client or browser.", true],
            choice2: ["The data is stored under the Applications tab in Chrome Dev Tools.", false],
            choice3: ["The data is stored in the database in the backend.", false],
            choice4: ["The data is stored in the window called localStorage.", false],
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
        li.textContent = (i + 1) + ". " + answerArray[i][0];
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
