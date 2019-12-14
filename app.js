// DOM selectors // Global variables
let diceDOM         = document.querySelector('.dice'),
    playerSide0DOM  = document.querySelector('.player-side-0'),
    playerSide1DOM  = document.querySelector('.player-side-1'),
    score0DOM       = document.querySelector('.score-0'),
    score1DOM       = document.querySelector('.score-1'),
    turnTotal0DOM   = document.querySelector('.turn-total-0'),
    turnTotal1DOM   = document.querySelector('.turn-total-1'),
    inputScoreDOM   = document.querySelector('.winning-score'),
    btnNewDOM       = document.querySelector('.btn-new'),
    btnRollDOM      = document.querySelector('.btn-roll'),
    btnHoldDOM      = document.querySelector('.btn-hold'),
    winningScoreDOM = document.querySelector('.winning-score');

// Global variables
let isGamePlaying;
let activePlayer = 0;
let scores = [0, 0];
let diceSum = 0;  // Accumulate the dice roll value

init();

// New game button
btnNewDOM.addEventListener('click', init);

// Roll dice button
btnRollDOM.addEventListener('click', () => {
  if (isGamePlaying) {
    diceDOM.style.display = 'block'; // Make the dice image appear
    let randomNumber = Math.floor(Math.random() * 6) + 1; // Random integer between 1 to 6
    diceDOM.src = `img/dice-${randomNumber}.svg`; // Update dice image

    // If the player rolls a 1
    if (randomNumber !== 1) {
      diceSum += randomNumber;
      document.querySelector(`.turn-total-${activePlayer}`).textContent = diceSum;
    } else {
      alert(`Player ${activePlayer + 1} rolled a 1.`); // Alert the active player if he/she rolled a 1;
      nextPlayer();
    }
  }
});

// Hold button
btnHoldDOM.addEventListener('click', () => {
  if (isGamePlaying) {
    // Set the winning score
    let winningScore = 0;
    winningScoreDOM.value ? winningScore = winningScoreDOM.value : winningScore = 100; 

    // If the player hold when the player has 0 turn total
    if (diceSum === 0) {
      alert('Your turn total is 0, please have a turn total that is greater than 0.');
      return;
    }

    // Add the dice sum to the score
    scores[activePlayer] += diceSum;
    document.querySelector(`.score-${activePlayer}`).textContent = scores[activePlayer];

    // Determines the winner
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`.h3-player-${activePlayer}`).textContent = 'Winner!';
      inputScoreDOM.disabled = true;
      isGamePlaying = false;
    } else {
      nextPlayer();
    }  
  }
});

// Resets the game
function init() {
  isGamePlaying = true;
  diceSum = 0;
  hideDice();
  playerSide0DOM.classList.remove('active');
  playerSide1DOM.classList.remove('active');
  playerSide0DOM.classList.add('active');
  resetTextContentTo0(score0DOM);
  resetTextContentTo0(score1DOM);
  resetTextContentTo0(turnTotal0DOM);
  resetTextContentTo0(turnTotal1DOM);
  inputScoreDOM.disabled = false;
  inputScoreDOM.value = '';
}

// Hides the dice image
function hideDice() {
  diceDOM.style.display = 'none';
}

function resetTextContentTo0(domSelector) {
  return domSelector.textContent = 0;
}

// Reset necessary element for the next player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  alert(`Player ${activePlayer + 1}'s turn.`);
  diceSum = 0;
  hideDice();
  resetTextContentTo0(turnTotal0DOM);
  resetTextContentTo0(turnTotal1DOM);
  playerSide0DOM.classList.toggle('active');
  playerSide1DOM.classList.toggle('active');
}