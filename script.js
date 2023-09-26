"use strict";

//* selecting elements
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const score0El = document.querySelector("#score-0");
const score1El = document.getElementById("score-1");
const current0El = document.querySelector("#current-0");
const current1El = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");

const restartBtn = document.querySelector(".restart");
const rollBtn = document.querySelector(".roll");
const holdBtn = document.querySelector(".hold");
let totalScore;
let currentScore;
let activePlayer;
let isPlaying;

//* initial condition
function initial() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");

  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  // 1st player = 0
  // 2nd player = 1

  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");

  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
}
initial();

//* switchPlayer
function switchPlayer() {
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
}

//* rollBtn functionality
rollBtn.addEventListener("click", () => {
  if (isPlaying) {
    //1. Display a random dice number
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dice-${dice}.svg`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swtich player
      switchPlayer();
    }
  }
});

//* holdBtn functionality
holdBtn.addEventListener("click", () => {
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 20) {
      isPlaying = false;

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
    } else {
      switchPlayer();
    }
  }
});

//* restartBtn functionality
restartBtn.addEventListener("click", initial);
