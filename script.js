'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const init = function () {
  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};

init();

// Aplication state
const scores = [0, 0];
let current = 0;
let activePlayer = 0;
let isPlaying = true;

// Functions that make code readable and less duplicate
const displayCurrentScore = function (score) {
  document.getElementById(`current--${activePlayer}`).textContent = score;
};

const displayTotalScore = function (totalScore) {
  document.getElementById(`score--${activePlayer}`).textContent = totalScore;
};

const displayDice = function (number) {
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceEl.src = `dice-${number}.png`;
};

const hideDice = function () {
  // Hide the dice
  if (!diceEl.classList.contains('hidden')) {
    diceEl.classList.add('hidden');
  }
};

const winnerIs = function (addOrRemove) {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList[addOrRemove]('player--winner');
};

const activeIs = function (addOrRemove) {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList[addOrRemove]('player--active');
};

const resetScores = function () {
  scores[0] = 0;
  scores[1] = 0;
  current = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

const resetPlayer = function () {
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  // set current to 0
  current = 0;
  displayCurrentScore(0);

  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  hideDice();
};

// Rolling dice feature
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate the random dice
    let dice = Math.floor(Math.random() * 6) + 1;

    displayDice(dice);

    // 2. Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      current += dice;
      displayCurrentScore(current);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Send the current score to total score of an active player
    scores[activePlayer] += current;
    displayTotalScore(scores[activePlayer]);

    // 2. Check if active player wins the game
    if (scores[activePlayer] >= 20) {
      // Add winner class and remove active player class
      winnerIs('add');
      activeIs('remove');

      isPlaying = false;

      hideDice();

      // Clear current score
      current = 0;
      displayCurrentScore(0);
    } else {
      // 3. Switch the player and reset the current score back to 0
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // 0. Hide the winner class
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains('player--winner')
  ) {
    winnerIs('remove');
  }

  // 1. Reset active player back to 0
  resetPlayer();
  // 2. Reset all scores to 0
  resetScores();
  // 3. Hide the dice
  hideDice();
  // 4. Start playing
  isPlaying = true;
});
