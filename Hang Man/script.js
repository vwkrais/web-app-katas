const words2Guess = [
  "flexbox",
  "background-color",
  "restful backend",
  "coding-bootcamp",
  "hotpink",
  "dogerblue",
  "accent-color",
  "for-in-loop",
  "hidden attribute",
  "web-app",
  "frontend-developer",
  "schatzyline",
];

let word2Guess = "";
let alreadyGuessed = [];
const keyboard = document.querySelectorAll(".key");
const span = document.querySelector("span");
let fails = 0;
const newGameButton = document.querySelector("#new-game");
newGameButton.addEventListener("click", startNewGame);
const winner = document.querySelector("#winner");
const active = document.querySelector("#active");
const guessContainer = document.querySelector("#guess");

//get word
function getWord() {
  const max = words2Guess.length;
  const randomNum = Math.floor(Math.random() * max);
  word2Guess = words2Guess[randomNum];
  return word2Guess;
}

// build guess section

function buildGuessContainer() {
  let numberLettersGuessed = 0;

  guessContainer.innerHTML = "";
  for (let i = 0; i < word2Guess.length; i++) {
    const div = document.createElement("div");
    if (word2Guess[i] === "-") {
      numberLettersGuessed++;
      const txt = document.createTextNode(`\u00A0 - \u00A0 `);
      div.appendChild(txt);
    } else if (alreadyGuessed.includes(word2Guess[i])) {
      const txt = document.createTextNode(
        `\u00A0 ${word2Guess[i]}\u00A0 \u00A0`
      );
      div.appendChild(txt);
      numberLettersGuessed++;
      if (numberLettersGuessed === word2Guess.length) {
        guessContainer.appendChild(div);
        winner.hidden = false;
        active.innerText = "Inactive";
        guessContainer.style.height = "40vh";
      }
    } else if (word2Guess[i] !== " ") {
      const txt = document.createTextNode(`___\u00A0 `);
      div.appendChild(txt);
    } else if (word2Guess[i] === " ") {
      numberLettersGuessed++;
      const txt = document.createTextNode(`\u00A0 \u00A0 \u00A0 \u00A0 `);
      div.appendChild(txt);
    }
    guessContainer.appendChild(div);
  }
}

//pick letter
//if won or lost all keys add class disable

for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  let button = document.querySelector(`#button${letter}`);
  const buzzer = document.getElementById("buzzer");
  button.addEventListener("click", () => {
    button.disabled = true;
    button.classList.add("disabled");
    if (word2Guess.includes(letter.toLowerCase())) {
      alreadyGuessed.push(letter.toLowerCase());
      buildGuessContainer();
      if (winner.hidden === false) {
        keyboard.forEach((element) => {
          element.disabled = true;
        });
      }
    } else {
      buzzer.play();
      fails++;
      span.innerText = ` ${fails}/10`;
      if (fails === 10) {
        document.getElementById("loser").hidden = false;
        guessContainer.style.height = "40vh";
        keyboard.forEach((element) => {
          element.disabled = true;
        });
      }
    }
  });
}

function startNewGame() {
  keyboard.forEach((element) => {
    element.disabled = false;
    element.classList.remove("disabled");
  });
  fails = 0;
  span.innerText = ` ${fails}/10`;
  winner.hidden = true;
  loser.hidden = true;
  active.innerText = "Active";
  guessContainer.style.height = "50vh";
  playGame();
}

//========overall function========
function playGame() {
  word2Guess = "";
  alreadyGuessed = [];
  getWord();
  buildGuessContainer();
}

playGame();

// const words2Guess = [
//   "flexbox",
//   "background-color",
//   "restful backend",
//   "coding-bootcamp",
//   "hotpink",
//   "dogerblue",
//   "accent-color",
//   "for-in-loop",
//   "hidden attribute",
// ];

// let word2Guess = "";
// let alreadyGuessed = [];
// const keyboard = document.querySelectorAll(".key");
// const span = document.querySelector("span");
// let fails = 0;
// const newGameButton = document.querySelector("#new_game");
// newGameButton.addEventListener("click", startNewGame);

// //get word
// function getWord() {
//   const max = words2Guess.length;
//   const randomNum = Math.floor(Math.random() * max);
//   word2Guess = words2Guess[randomNum];
//   return word2Guess;
// }

// // build guess section

// function buildGuessContainer() {
//   let numberLettersGuessed = 0;
//   const guessContainer = document.querySelector("#guess");
//   guessContainer.innerHTML = "";
//   for (let i = 0; i < word2Guess.length; i++) {
//     const div = document.createElement("div");
//     if (word2Guess[i] === "-") {
//       numberLettersGuessed++;
//       const txt = document.createTextNode(`\u00A0 - \u00A0 `);
//       div.appendChild(txt);
//     } else if (alreadyGuessed.includes(word2Guess[i])) {
//       const txt = document.createTextNode(
//         `\u00A0 ${word2Guess[i]}\u00A0 \u00A0`
//       );
//       div.appendChild(txt);
//       numberLettersGuessed++;
//       if (numberLettersGuessed === word2Guess.length) {
//         guessContainer.appendChild(div);
//         const keyboard = document.querySelector("key");
//         document.getElementById("winner").hidden = false;
//         keyboard.forEach((element) => {
//           button.disabled = false;
//           classList.remove("disabled");
//         });
//       }
//     } else if (word2Guess[i] !== " ") {
//       const txt = document.createTextNode(`___\u00A0 `);
//       div.appendChild(txt);
//     } else if (word2Guess[i] === " ") {
//       numberLettersGuessed++;
//       const txt = document.createTextNode(`\u00A0 \u00A0 \u00A0 \u00A0 `);
//       div.appendChild(txt);
//     }
//     guessContainer.appendChild(div);
//   }
// }

// //pick letter
// //if won or lost all keys add class disable

// function pickLetter() {
//   for (let letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
//     let button = document.querySelector(`#button${letter}`);
//     const buzzer = document.getElementById("buzzer");
//     button.addEventListener("click", () => {
//       if (word2Guess.includes(letter.toLowerCase())) {
//         alreadyGuessed.push(letter.toLowerCase());
//         buildGuessContainer();
//         button.disabled = true;
//         button.classList.add("disabled");
//       } else if (!word2Guess.includes(letter.toLowerCase())) {
//         buzzer.play();
//         button.disabled = true;
//         button.classList.add("disabled");
//         fails++;
//         console.log(fails);
//         span.innerText = ` ${fails}/10`;
//         if (fails === 10) {
//           document.getElementById("loser").hidden = false;
//           keyboard.classList.add("disabled");
//         }
//       }
//     });
//   }
// }
// // //const keyboard = document.querySelector("key");
// // function newGame() {
// //   const newGameButton = document.querySelector("#new_game");

// //   // Remove any existing event listeners before adding a new one
// //   newGameButton.removeEventListener("click", startNewGame);

// //   // Add the event listener for starting a new game
// //   newGameButton.addEventListener("click", startNewGame);
// // }

// function startNewGame() {
//   keyboard.forEach((element) => {
//     element.disabled = false;
//     element.classList.remove("disabled");
//     fails = 0;
//     console.log(fails);
//     span.innerText = ` ${fails}/10`;
//   });
//   playGame();
// }

// //========overall function========
// function playGame() {
//   word2Guess = "";
//   alreadyGuessed = [];

//   getWord();
//   // pickLetter();
//   buildGuessContainer();
// }

// playGame();
