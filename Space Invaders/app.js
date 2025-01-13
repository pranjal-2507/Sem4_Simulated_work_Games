document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const resultDisplay = document.getElementById('result');
    const gameStatus = document.getElementById('game-status');
    const width = 15;
    const height = 15;
    let currentShooterIndex = 202;
    let direction = 1;
    let invadersId;
    let goingRight = true;
    let aliensRemoved = [];
    let results = 0;

    // Create game grid
    for (let i = 0; i < width * height; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
    }

    const squares = Array.from(document.querySelectorAll('.grid div'));

    // Define alien invaders position
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    // Draw invaders
    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader');
            }
        }
    }

    // Remove invaders
    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
        }
    }

    // Draw shooter
    squares[currentShooterIndex].classList.add('shooter');

    // Move shooter
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter');
        switch (e.key) {
            case 'ArrowLeft':
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break;
        }
        squares[currentShooterIndex].classList.add('shooter');
    }

    // Move invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
        remove();

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1;
                direction = -1;
                goingRight = false;
            }
        }

        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1;
                direction = 1;
                goingRight = true;
            }
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction;
        }

        draw();

        // Check for game over conditions
        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            gameStatus.textContent = 'GAME OVER';
            clearInterval(invadersId);
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] > squares.length - width) {
                gameStatus.textContent = 'GAME OVER';
                clearInterval(invadersId);
            }
        }

        // Check for win
        if (aliensRemoved.length === alienInvaders.length) {
            gameStatus.textContent = 'YOU WIN!';
            clearInterval(invadersId);
        }
    }

    // Shoot function
    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;

        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;

            if (currentLaserIndex < 0) {
                clearInterval(laserId);
                return;
            }

            squares[currentLaserIndex].classList.add('laser');

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
                clearInterval(laserId);

                const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
                aliensRemoved.push(alienRemoved);
                results++;
                resultDisplay.textContent = results;
            }
        }

        if (e.key === 'ArrowUp') {
            laserId = setInterval(moveLaser, 100);
        }
    }

    // Event listeners
    document.addEventListener('keydown', moveShooter);
    document.addEventListener('keydown', shoot);

    // Start game
    invadersId = setInterval(moveInvaders, 500);
});