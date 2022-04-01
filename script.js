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
    
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = "Time Remaining: " + timeLeft;
    
      // Stops execution of action at set interval
      if(timeLeft === 0) {

        clearInterval(timeInterval);
        timerEl.textContent = "TIMES UP!";
        // Calls function to create and append image
        // displayMessage();
      }
     }, 1000);
  }

timer();
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Main Content: Questions, /////////////////////////////////////////////////////

// function that changes the header (this function will also remove the paragraph at the start)

// Display a question with answers


// Output a question and 4 possible answers
// Create an ordered list for the answers

// Be able to select an Answer

// Determine if answer is correct or not, and consequences

// Event listener for selecting buttons







