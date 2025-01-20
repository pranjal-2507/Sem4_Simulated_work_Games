const squares = document.querySelectorAll(".square");
const timeLeftDisplay = document.getElementById("time-left");
const scoreDisplay = document.getElementById("score");

let molePosition;
let lastMolePosition;
let score = 0;
let timeLeft = 30;
let timerId;
let moleTimerId;
let moleInterval = 1000; // Initial mole interval

// Function to randomly place a mole or bonus mole
function randomSquare() {
  squares.forEach((square) => square.classList.remove("mole", "bonus-mole"));

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * squares.length);
  } while (squares[randomIndex] === lastMolePosition); // Ensure new position is different

  molePosition = squares[randomIndex];

  // Randomly decide if this mole is a bonus mole
  const isBonusMole = Math.random() < 0.2; // 20% chance of a bonus mole
  if (isBonusMole) {
    molePosition.classList.add("bonus-mole");
  } else {
    molePosition.classList.add("mole");
  }

  lastMolePosition = molePosition; // Update the last mole position
}

// Function to handle mole clicks
squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square === molePosition) {
      if (square.classList.contains("bonus-mole")) {
        score += 5; // Bonus mole grants extra points
      } else {
        score++;
      }
      scoreDisplay.textContent = score;
      molePosition.classList.remove("mole", "bonus-mole");
      randomSquare();
      increaseDifficulty(); // Adjust game difficulty based on the score
    }
  });
});

// Function to increase difficulty
function increaseDifficulty() {
  if (score % 5 === 0 && moleInterval > 400) {
    moleInterval -= 100; // Decrease interval every 5 points
    clearInterval(moleTimerId); // Reset mole interval
    moleTimerId = setInterval(randomSquare, moleInterval);
  }
}

// Function to handle the countdown
function countdown() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    alert(`Game over! Your final score is ${score}`);
  }
}

// Start the game
function startGame() {
  randomSquare();
  moleTimerId = setInterval(randomSquare, moleInterval);
  timerId = setInterval(countdown, 1000);
}

startGame();
