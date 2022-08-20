let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArr = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
lettersArr.forEach((letter) => {
  let span = document.createElement("span");
  let spanLetter = document.createTextNode(letter);
  span.appendChild(spanLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Oject Of Words + Categories

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memnto",
    "coco",
    "up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Object keys
let propName = Object.keys(words);
// Random Name Depend On Keys Length
let randomPropName = propName[Math.floor(Math.random() * propName.length)];
// Get Value Of Random Name
let randomPropValue = words[randomPropName];
// Random Number Depend On Value Length
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Add The Keys To Word From:
document.querySelector(".game-info span").innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue.toLowerCase());

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  // emptySpan.appendChild(letter);
  lettersGuessContainer.appendChild(emptySpan);
});

// Get All Guess Letter Box
let letterBox = document.querySelectorAll(".letters-guess span");

//  Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set Default Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    // Loop On Chosen Word
    for (let i = 0; i < lettersAndSpace.length; i++) {
      // Check If Chosen letter Has The Clicked Letter
      if (lettersAndSpace[i] == clickedLetter) {
        // Set Status To Correct
        theStatus = true;
        // Loop On Guess Letter's Box
        for (let j = 0; j < letterBox.length; j++) {
          // Check If The Index Of Letter's Box Equal to Index Of Chosen Word
          if (j == i) {
            // Add Clicked Letter To Letter's Box
            letterBox[j].innerHTML = clickedLetter;
          }
        }
      }
    }
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail soun
      document.getElementById("fail").play();
      if (wrongAttempts === 10) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("succsess").play();
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over,
    The Word is "${randomValueValue}"`
  );
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
  document.getElementById("fail2").play();
}
