const rows = 6;
const columns = 7;
const value = 10;
let totalMoves = 42;
let board = [];
let buttons;
let currentPlayer = 1;
let gameFinished = false;
let gameResult = document.getElementById("gameResult");

function createBoard() {
	for (let i = 0; i < rows; ++i) {
		board[i] = [];
		for (let j = 0; j < columns; ++j) {
			buttons = document.createElement("button");
			buttons.id = i.toString() + j.toString();
			buttons.style.backgroundColor = "white";
			buttons.className = "gamePlay";
			buttons.addEventListener("click", makeMove);
			document.getElementById("mainBoard").appendChild(buttons);
			board[i].push(buttons);
		}
	}
	document.getElementById("startBtn").style.display = "none";
	document.getElementById("restart").style.display = "block";
}

let isMoving = false;
let intervalId;

function makeMove(e) {
	if (isMoving || gameFinished || e.target.style.backgroundColor != "white") {
		return;
	}
	isMoving = true;
	--totalMoves;
	let col = Math.floor(e.target.id % value);
	let row = Math.floor(e.target.id / value);
	let player = switchPlayer();
	while (row < rows && board[row][col]. style.backgroundColor != "white") {
		++row;
	}
	if (row >= 0) {
		intervalId = setInterval(function() {
			if (row < rows - 1 && board[row + 1][col].style.backgroundColor == "white") {
				board[row][col].style.backgroundColor = "white";
				++row;
				board[row][col].style.backgroundColor = player;
			} else {
				board[row][col].style.backgroundColor = player;
				board[row][col].value = player;
				clearInterval(intervalId);
				isMoving = false;
				checkWinHorizontally(row, col);
				checkWinVertically(row, col);
				checkWinDiagonal(row, col);
				checkWinAntidiagonal(row, col);
				isDraw();
			}
		}, 180);
	}
}

function switchPlayer() {
	if (currentPlayer == 1) {
		currentPlayer = 2;
		return "red";
	} else {
		currentPlayer = 1;
		return "yellow";
	}
}

function checkWinHorizontally(row, col) {
	let player = board[row][col].value;
	let counter = 1;
	for (let i = col + 1; i < columns; ++i) {
		if (board[row][i].value == player) {
			++counter;
		} else {
			break;
		}
	}
	for (let j = col - 1; j >= 0; --j) {
		if (board[row][j].value == player) {
			++counter;
		} else {
			break;
		}
	}
	if (counter == 4) {
		gameResult.style.color = player;
		gameResult.textContent = player + " wins!";
		gameFinished = true;
		return;
	}
}

function checkWinVertically(row, col) {
	let player = board[row][col].value;
	let counter = 1;
	for (let i = row + 1; i < rows; ++i) {
		if (board[i][col].value == player) {
			++counter;
			if (counter == 4) {
				gameResult.style.color = player;
				gameResult.textContent = player + " wins!";
				gameFinished = true;
				return;
			}
		} else {
			counter = 0;
		}
	}
}

function checkWinDiagonal(row, col) {
	let player = board[row][col].value;
	let counter = 0;
	let i = row;
	let j = col;
	while (i < rows && j < columns && board[i][j].value == player) {
		++counter;
		if (counter == 4) {
			gameResult.style.color = player;
			gameResult.textContent = player + " wins!";
			gameFinished = true;
			return;
		}
		++i;
		++j;
	}
	counter = 0;
	i = row;
	j  = col;
	while (i >= 0 && j >= 0 && board[i][j].value == player) {
		++counter;
		if (counter == 4) {
			gameResult.style.color = player;
			gameResult.textContent = player + " wins!";
			gameFinished = true;
			return;
		}
		--i;
		--j;
	}
}

function checkWinAntidiagonal(row, col) {
	let player = board[row][col].value;
	let counter = 0;
	let i = row;
	let j = col;
	while (i >= 0 && j < columns && board[i][j].value == player) {
		++counter;
		if (counter == 4) {
			gameResult.style.color = player;
			gameResult.textContent = player + " wins!";
			gameFinished = true;
			return;
		}
		--i;
		++j;
	}
	counter = 0;
	i = row;
	j = col;
	while (i < rows && j >= 0 && board[i][j].value == player) {
		++counter;
		if (counter == 4) {
			gameResult.style.color = player;
			gameResult.textContent = player + " wins!";
			gameFinished = true;
			return;
		}
		++i;
		--j;
	}
}

function isDraw() {
	if (totalMoves == 0) {
		gameResult.textContent = "Draw!";
		gameResult.style.backgroundColor = "green";
		gameFinished = true;
	}
}

function restartGame() {
	window.location.reload();
}