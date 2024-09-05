"use strict";

// Initialize the game state
let currentPlayer = 'X';
let gameState = Array(9).fill('');
const statusText = document.getElementById('status');
const cells = document.querySelectorAll('.box');
const confetti = window.confetti;

// Define winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });
    updateStatus();
}

// Handle a cell click
function handleCellClick(cell, index) {
    // If the cell is already filled or the game is over, do nothing
    if (gameState[index] !== '' || checkWin()) {
        return;
    }

    // Update the game state and the cell content
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWin()) {
        showWinPrompt(`${currentPlayer} wins!`);
        highlightWinningCells();
        confetti(); // Trigger confetti effect
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    } else {
        statusText.textContent = "It's a draw!";
    }
}

// Update the status message to show whose turn it is
function updateStatus() {
    statusText.textContent = `${currentPlayer}'s turn`;
}

// Check if there's a winning combination
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

// Highlight the cells that make up the winning combination
function highlightWinningCells() {
    winningConditions.forEach(condition => {
        if (condition.every(index => gameState[index] === currentPlayer)) {
            condition.forEach(index => cells[index].classList.add('winner'));
        }
    });
}

// Show a winning prompt
function showWinPrompt(message) {
    statusText.textContent = message;
}

// Reset the game to its initial state
function resetGame() {
    gameState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
    updateStatus();
}

// Start the game
initializeGame();
