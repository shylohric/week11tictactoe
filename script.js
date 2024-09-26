// DOM elements
const boardElement = document.getElementById('board');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const gameAlert = document.getElementById('gameAlert'); // New alert element
const resetButton = document.getElementById('reset');

// Needed variables
let board = ['', '', '', '', '', '', '', '', '']; 
let currentPlayer = 'X';
let gameActive = true; 
let scoreX = 0; 
let scoreO = 0; 

// Winning combinations for Tic Tac Toe
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]             
];

// Create the game board
function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell; 
        cellElement.addEventListener('click', () => handleCellClick(index)); 
        boardElement.appendChild(cellElement); 
    });
}

// Handle cell click events
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer; 
    checkResult(); 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    createBoard(); 
}

// Check to see if someone has won
function checkResult() {
    let roundWon = false; 
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    // If someone won
    if (roundWon) {
        displayAlert(`Player ${currentPlayer} wins!`, 'success'); 
        updateScore(currentPlayer); 
        gameActive = false; 
        return;
    }

    // Check for a draw
    if (!board.includes('')) {
        displayAlert("It's a draw!", 'warning'); 
        gameActive = false; 
    }
}

// Change score for both players
function updateScore(player) {
    if (player === 'X') {
        scoreX++; 
        scoreXElement.textContent = scoreX; 
    } else if (player === 'O') {  
        scoreO++; 
        scoreOElement.textContent = scoreO; 
    }
}

// Bootstrap alert
function displayAlert(message, alertType) {
    gameAlert.textContent = message;
    gameAlert.className = `alert alert-${alertType}`; 
    gameAlert.classList.remove('d-none'); 
}

// Reset the game with reset button
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', '']; 
    currentPlayer = 'X'; 
    gameActive = true; 
    gameAlert.classList.add('d-none'); 
    createBoard(); 
});

// Create the board on page load
createBoard();