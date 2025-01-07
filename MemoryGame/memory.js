const emojis = ["🥳", "😃", "🍇", "🍉", "🎯", "😎", "🍍", "✏️"];
const cardGrid = document.getElementById("card-grid");
const startGameButton = document.getElementById("start-game");
const winMessage = document.getElementById("win-message");
const scoreElement = document.createElement("p"); // Create a score element
scoreElement.textContent = "Score: 0";
scoreElement.id = "score";
document.querySelector(".game-container").insertBefore(scoreElement, cardGrid);

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

// Initialize the game
function shuffleCards() {
  const doubledEmojis = [...emojis, ...emojis];
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
    score += 10; // Increment score for each match
    updateScore();

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
  if (matchedPairs === emojis.length) {
    winMessage.classList.remove("hidden");
  }
}

// Update score
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Start game
function startGame() {
  winMessage.classList.add("hidden");
  matchedPairs = 0;
  score = 0;
  updateScore();
  cards = shuffleCards();
  renderCards(cards);
}

startGameButton.addEventListener("click", startGame);
