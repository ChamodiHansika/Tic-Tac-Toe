document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const drawSound = document.getElementById('drawSound');

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let scores = { 'X': 0, 'O': 0 };

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                combination.forEach(index => cells[index].classList.add('winning-cell'));
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== null);
    };

    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (gameState[index] !== null) return;

        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        clickSound.play();

        if (checkWin()) {
            scores[currentPlayer]++;
            winSound.play();
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                updateScoreboard();
                resetGame();
            }, 100);
        } else if (checkDraw()) {
            drawSound.play();
            setTimeout(() => {
                alert('Draw!');
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const updateScoreboard = () => {
        scoreX.textContent = scores['X'];
        scoreO.textContent = scores['O'];
    };

    const resetGame = () => {
        gameState = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        currentPlayer = 'X';
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);
});
