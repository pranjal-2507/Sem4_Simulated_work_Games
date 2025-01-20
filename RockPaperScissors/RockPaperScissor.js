let playerWins = 0;
let computerWins = 0;
let ties = 0;

// Load sound effects
const winSound = new Audio('./assests/win.mp3');
const loseSound = new Audio('./assests/lose.mp3');


const choices = ['rock', 'paper', 'scissors'];

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);

        playSound(result);
        updateScores(result);
        displayResult(playerChoice, computerChoice, result);
        animateChoice(button);
    });
});

document.getElementById('reset-btn').addEventListener('click', resetGame);

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        return 'player';
    }
    return 'computer';
}

function playSound(result) {
    if (result === 'player') {
        winSound.play();
    } else if (result === 'computer') {
        loseSound.play();
    } 
}

function updateScores(result) {
    if (result === 'player') {
        playerWins++;
    } else if (result === 'computer') {
        computerWins++;
    } else {
        ties++;
    }
    document.getElementById('player-wins').textContent = playerWins;
    document.getElementById('computer-wins').textContent = computerWins;
    document.getElementById('ties').textContent = ties;
}

function displayResult(player, computer, result) {
    const resultDiv = document.getElementById('result');
    let message = `You chose ${player}, Computer chose ${computer}. `;
    if (result === 'player') {
        message += 'You Win! 🥳';
    } else if (result === 'computer') {
        message += 'Computer Wins! 😔';
    } else {
        message += "It's a Tie! 😐";
    }
    resultDiv.innerHTML = `<p>${message}</p>`;
}

function animateChoice(button) {
    button.classList.add('bounce');
    setTimeout(() => button.classList.remove('bounce'), 600);
}

function resetGame() {
    playerWins = 0;
    computerWins = 0;
    ties = 0;
    document.getElementById('player-wins').textContent = playerWins;
    document.getElementById('computer-wins').textContent = computerWins;
    document.getElementById('ties').textContent = ties;
    document.getElementById('result').innerHTML = '<p>Make your move!</p>';
}
