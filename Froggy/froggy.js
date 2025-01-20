const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

let currentIndex = 76; // Starting position of the frog
const width = 9; // Width of the grid
let timerId;
let outcomeTimerId;
let currentTime = 20; // Time for the player to complete the level
let score = 0; // Player's score
let lives = 3; // Player's lives

// Display lives and score on the screen
const scoreDisplay = document.createElement('h3');
scoreDisplay.innerHTML = `Score: <span id="score">0</span> Lives: <span id="lives">3</span>`;
document.body.insertBefore(scoreDisplay, document.querySelector('.grid'));

// Move frog with keyboard controls
function moveFrog(e) {
  squares[currentIndex].classList.remove('frog');

  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case 'ArrowDown':
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  squares[currentIndex].classList.add('frog');
}

// Auto-move logs, cars, and decrease time
function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach(logLeft => moveLogLeft(logLeft));
  logsRight.forEach(logRight => moveLogRight(logRight));
  carsLeft.forEach(carLeft => moveCarLeft(carLeft));
  carsRight.forEach(carRight => moveCarRight(carRight));
}

// Check if the player wins or loses
function checkOutComes() {
  lose();
  win();
}

// Move logs to the left
function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1');
      logLeft.classList.add('l2');
      break;
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2');
      logLeft.classList.add('l3');
      break;
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3');
      logLeft.classList.add('l4');
      break;
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4');
      logLeft.classList.add('l5');
      break;
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5');
      logLeft.classList.add('l1');
      break;
  }
}

// Move logs to the right
function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1');
      logRight.classList.add('l5');
      break;
    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2');
      logRight.classList.add('l1');
      break;
    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3');
      logRight.classList.add('l2');
      break;
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4');
      logRight.classList.add('l3');
      break;
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5');
      logRight.classList.add('l4');
      break;
  }
}

// Move cars to the left
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1');
      carLeft.classList.add('c2');
      break;
    case carLeft.classList.contains('c2'):
      carLeft.classList.remove('c2');
      carLeft.classList.add('c3');
      break;
    case carLeft.classList.contains('c3'):
      carLeft.classList.remove('c3');
      carLeft.classList.add('c1');
      break;
  }
}

// Move cars to the right
function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1');
      carRight.classList.add('c3');
      break;
    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2');
      carRight.classList.add('c1');
      break;
    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3');
      carRight.classList.add('c2');
      break;
  }
}

// Check if the player wins
function win() {
  if (squares[4].classList.contains('frog')) {
    resultDisplay.textContent = 'You Win!';
    score += 10; // Increment score for winning
    document.querySelector('#score').textContent = score;
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
  }
}

// Check if the player loses
function lose() {
  if (
    currentTime === 0 ||
    squares[currentIndex].classList.contains('car-left') ||
    squares[currentIndex].classList.contains('car-right') ||
    (!squares[currentIndex].classList.contains('log-left') &&
      !squares[currentIndex].classList.contains('log-right') &&
      currentIndex < 45 && // Water section
      currentIndex > 0)
  ) {
    resultDisplay.textContent = 'Game Over!';
    lives--; // Decrease lives
    document.querySelector('#lives').textContent = lives;
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    if (lives > 0) resetGame(); // Restart if lives are left
  }
}

// Reset the game
function resetGame() {
  currentIndex = 76;
  squares.forEach(square => square.classList.remove('frog'));
  squares[currentIndex].classList.add('frog');
  currentTime = 20;
  resultDisplay.textContent = '';
  timerId = setInterval(autoMoveElements, 1000);
  outcomeTimerId = setInterval(checkOutComes, 50);
}

// Start or pause the game
startPauseButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    timerId = null;
    outcomeTimerId = null;
  } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutComes, 50);
  }
});

// Event listener for frog movement
document.addEventListener('keyup', moveFrog);
