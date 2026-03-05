let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset');

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameBoard[index] !== '' || !gameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
      continue;
    }
    if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameStatus.textContent = `Spieler ${currentPlayer} hat gewonnen!`;
    gameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    gameStatus.textContent = 'Unentschieden!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Spieler ${currentPlayer} ist am Zug`;
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  gameStatus.textContent = `Spieler ${currentPlayer} ist am Zug`;
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

gameStatus.textContent = `Spieler ${currentPlayer} ist am Zug`;
