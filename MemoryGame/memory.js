const emojis = ["🥳", "😃", "🍇", "🍉", "🎯", "😎", "🍍", "✏️"];
const cardGrid = document.getElementById("card-grid");
const startGameButton = document.getElementById("start-game");
const winMessage = document.getElementById("win-message");
const timerElement = document.getElementById("timer");
const bestTimeElement = document.getElementById("best-time");
const difficultySelector = document.getElementById("difficulty");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timerInterval;
let elapsedTime = 0;

// Load best time from local storage
function loadBestTime() {
  const bestTime = localStorage.getItem("bestTime");
  bestTimeElement.textContent = `Best Time: ${bestTime ? bestTime + "s" : "--"}`;
}

// Save best time to local storage
function saveBestTime(time) {
  const bestTime = localStorage.getItem("bestTime");
  if (!bestTime || time < bestTime) {
    localStorage.setItem("bestTime", time);
    bestTimeElement.textContent = `Best Time: ${time}s`;
  }
}

// Start the timer
function startTimer() {
  elapsedTime = 0;
  timerElement.textContent = `Time: 0s`;
  timerInterval = setInterval(() => {
    elapsedTime++;
    timerElement.textContent = `Time: ${elapsedTime}s`;
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Initialize the game
function shuffleCards(cardCount) {
  const selectedEmojis = emojis.slice(0, cardCount / 2);
  const doubledEmojis = [...selectedEmojis, ...selectedEmojis];
  return doubledEmojis
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      matched: false,
    }));
}

// Render the cards
function renderCards(cards) {
  cardGrid.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    cardElement.innerHTML = `
      <div class="front"></div>
      <div class="back">${card.emoji}</div>
    `;

    cardElement.addEventListener("click", () =>
      handleCardClick(card, cardElement)
    );
    cardGrid.appendChild(cardElement);
  });
}

// Handle card click
function handleCardClick(card, cardElement) {
  if (
    flippedCards.length === 2 ||
    card.matched ||
    flippedCards.includes(card)
  ) {
    return;
  }

  cardElement.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 1000);
  }
}

// Check for matches
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.emoji === card2.emoji) {
    card1.matched = true;
    card2.matched = true;
    matchedPairs++;

    // Ensure matched cards stay flipped and change color
    document.querySelectorAll(".flipped").forEach((cardElement) => {
      cardElement.classList.add("matched");
      cardElement.classList.remove("flipped");
    });
  } else {
    document.querySelectorAll(".flipped").forEach((cardElement) => {
      cardElement.classList.remove("flipped");
    });
  }

  flippedCards = [];

  // Check win condition
  if (matchedPairs === cards.length / 2) {
    stopTimer();
    winMessage.classList.remove("hidden");
    saveBestTime(elapsedTime);
  }
}

// Start game
function startGame() {
  winMessage.classList.add("hidden");
  stopTimer();
  matchedPairs = 0;
  flippedCards = [];

  const difficulty = difficultySelector.value;
  let cardCount;

  if (difficulty === "easy") {
    cardCount = 8;
  } else if (difficulty === "medium") {
    cardCount = 12;
  } else {
    cardCount = 16;
  }

  cards = shuffleCards(cardCount);
  renderCards(cards);
  startTimer();
}

// Event listeners
startGameButton.addEventListener("click", startGame);
window.addEventListener("load", loadBestTime);
