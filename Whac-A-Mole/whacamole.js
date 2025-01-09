const squares = document.querySelectorAll(".square");
const timeLeftDisplay = document.getElementById("time-left");
const scoreDisplay = document.getElementById("score");

let molePosition;
let lastMolePosition;
let score = 0;
let timeLeft = 30;
let timerId;
let moleTimerId;

// Function to randomly place the mole
function randomSquare() {
  squares.forEach((square) => square.classList.remove("mole"));
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * squares.length);
  } while (squares[randomIndex] === lastMolePosition); // Ensure the new position is different

  molePosition = squares[randomIndex];
  molePosition.classList.add("mole");
  lastMolePosition = molePosition; // Update the last mole position
}

// Function to handle mole clicks
squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square === molePosition) {
      score++;
      scoreDisplay.textContent = score;
      molePosition.classList.remove("mole");
      randomSquare();
    }
  });
});

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
  moleTimerId = setInterval(randomSquare, 900);
  timerId = setInterval(countdown, 1000);
}

startGame();
