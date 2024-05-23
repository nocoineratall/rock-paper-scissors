const players = (function () {
  const player = {
    id: 0,
    name: "Player",
    lastMove: "",
    roundScore: 0,
    gameScore: 0,
  };

  const computer = {
    id: 1,
    name: "Computer",
    lastMove: "",
    roundScore: 0,
    gameScore: 0,
  };

  const setPlayerName = function () {
    let newName = prompt("Insert Name (Max 10 characters)").substring(0, 10);
    return (player.name = newName);
  };

  const setRoundScore = function (winner) {
    return ++winner.roundScore;
  };

  const setLastMove = function (moveIndex) {
    player.lastMove = gameLogic.playerMove(moveIndex);
    computer.lastMove = gameLogic.computerMove();
  };

  return { setPlayerName, setRoundScore, setLastMove, player, computer };
})();

const DOM = (function () {
  let historyIndex = 0;

  const DOMelements = {
    playersName: document.querySelectorAll(".players"),
    playerScore: document.querySelector(".player-score"),
    computerScore: document.querySelector(".computer-score"),
    moveBtns: document.querySelectorAll(".move"),
    playerMove: document.querySelector(".player-move"),
    computerMove: document.querySelector(".computer-move"),
    historyTable: document.querySelector(".history-table"),
    roundMessage: document.querySelector(".round-message"),
    resetBtnWrapper: document.querySelector(".reset-btn-wrapper"),
  };

  const printScore = function () {
    DOMelements.playerScore.textContent = players.player.roundScore;
    DOMelements.computerScore.textContent = players.computer.roundScore;
  };

  const printPlayerNames = function () {
    DOMelements.playersName[0].textContent = players.player.name;
    DOMelements.playersName[1].textContent = players.computer.name;
  };

  const printMoves = function () {
    let str1 = players.player.lastMove;
    let str2 = players.computer.lastMove;

    // capitalizes first letter only
    str1 = str1.charAt(0).toUpperCase() + str1.slice(1);
    str2 = str2.charAt(0).toUpperCase() + str2.slice(1);

    DOMelements.playerMove.textContent = str1;
    DOMelements.computerMove.textContent = str2;

    let historyWrapper = document.createElement("div");
    let roundCounterP = document.createElement("p");
    let playerHistoryP = document.createElement("p");
    let computerHistoryP = document.createElement("p");

    roundCounterP.textContent = ++historyIndex;
    playerHistoryP.textContent = players.player.lastMove;
    computerHistoryP.textContent = players.computer.lastMove;

    historyWrapper.appendChild(roundCounterP);
    historyWrapper.appendChild(playerHistoryP);
    historyWrapper.appendChild(computerHistoryP);

    DOMelements.historyTable.appendChild(historyWrapper);
  };

  const printMessage = function (message) {
    DOMelements.roundMessage.textContent = message;
  };

  const clearHistoryBoard = function () {
    let ht = DOMelements.historyTable;
    historyIndex = 0;

    while (ht.firstChild) {
      ht.removeChild(ht.firstChild);
    }
  };

  const toggleMoveBtns = function () {
    let mb = DOMelements.moveBtns;
    //it's checking only one node but it's the same as checking all buttons
    if (!mb[0].hasAttribute("disabled")) {
      DOMelements.moveBtns.forEach((btn) => {
        btn.setAttribute("disabled", "true");
      });
    } else {
      DOMelements.moveBtns.forEach((btn) => {
        btn.removeAttribute("disabled");
      });
    }
  };

  const toggleReset = function () {
    let rbw = DOMelements.resetBtnWrapper;
    if (!rbw.firstChild) {
      toggleMoveBtns();
      const resetBtn = document.createElement("button");
      resetBtn.textContent = "Play Again";
      resetBtn.classList.add("reset-btn");
      resetBtn.addEventListener("click", () => {
        gameLogic.resetVars();
        printScore();
        clearHistoryBoard();
        toggleReset();
        toggleMoveBtns();
      });
      rbw.appendChild(resetBtn);
    } else {
      rbw.removeChild(rbw.firstChild);
    }
  };

  // locating this function here prevents DOMelements to be exposed out
  // of the module
  function eventBinder() {
    DOMelements.moveBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        gameLogic.playRound(btn.value);
      });
    });

    DOMelements.playersName[0].addEventListener("click", () => {
      players.setPlayerName();
      DOM.printPlayerNames();
    });
  }

  eventBinder();
  printPlayerNames();

  return {
    printScore,
    printPlayerNames,
    printMoves,
    printMessage,
    toggleReset,
  };
})();

const gameLogic = (function () {
  const moves = ["rock", "paper", "scissors"];

  const playerMove = function (moveIndex) {
    return moves[moveIndex];
  };

  const computerMove = function () {
    let index = Math.floor(Math.random() * 100) % 3;
    return moves[index];
  };

  const checkGameOver = function () {
    let pScore = players.player.roundScore;
    let cScore = players.computer.roundScore;

    if (pScore == 5 || cScore == 5) {
      let gameWinner =
        pScore > cScore ? players.player.name : players.computer.name;

      let gameOverMessage = `${gameWinner} won the game`;
      DOM.printMessage(gameOverMessage);
      return true;
    }
  };

  const pickWinner = function (playerM, computerM) {
    let winner = {};
    let message = "";

    switch (playerM) {
      case "rock":
        if (computerM == "rock") {
          message = "It's a tie - try again";
          return false;
        } else if (computerM == "paper") {
          message = "Paper beats Rock";
          winner = players.computer;
        } else if (computerM == "scissors") {
          message = "Rock beats Scissors";
          winner = players.player;
        }
        break;

      case "paper":
        if (computerM == "rock") {
          message = "Paper beats Rock";
          winner = players.player;
        } else if (computerM == "paper") {
          message = "It's a tie - try again";
          return false;
        } else if (computerM == "scissors") {
          message = "Scissors beats Paper";
          winner = players.computer;
        }
        break;

      case "scissors":
        if (computerM == "rock") {
          message = "Rock beats Scissors";
          winner = players.computer;
        } else if (computerM == "paper") {
          message = "Scissors beats Paper";
          winner = players.player;
        } else if (computerM == "scissors") {
          message = "It's a tie - try again";
          return false;
        }
        break;
    }

    DOM.printMessage(message);

    return winner;
  };

  const playRound = function (moveIndex) {
    players.setLastMove(moveIndex);
    let playerMove = players.player.lastMove;
    let computerMove = players.computer.lastMove;
    let winner = pickWinner(playerMove, computerMove);

    DOM.printMoves();

    if (winner != false) {
      players.setRoundScore(winner);
      DOM.printScore(winner);
    }
    if (checkGameOver()) {
      DOM.toggleReset();
    }
  };

  const resetVars = function () {
    players.computer.roundScore = 0;
    players.player.roundScore = 0;
  };

  return { playRound, playerMove, computerMove, resetVars };
})();
