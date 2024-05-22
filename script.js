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
    body: document.querySelector("body"),
    playersName: document.querySelectorAll(".players"),
    scores: document.querySelectorAll(".scores"),
    moveBtns: document.querySelectorAll(".move"),
    playerMove: document.querySelector(".player-move"),
    computerMove: document.querySelector(".computer-move"),
    historyTable: document.querySelector(".history-table"),
    roundMessage: document.querySelector(".round-message"),
  };

  const printScore = function (player) {
    DOMelements.scores[player.id].textContent = player.roundScore;
  };

  const printPlayerNames = function () {
    DOMelements.playersName[0].textContent = players.player.name;
    DOMelements.playersName[1].textContent = players.computer.name;
  };

  const printMoves = function () {
    DOMelements.playerMove.textContent = players.player.lastMove;
    DOMelements.computerMove.textContent = players.computer.lastMove;

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

  return { printScore, printPlayerNames, printMoves, printMessage };
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

  const pickWinner = function (playerM, computerM) {
    let message = "";
    switch (playerM) {
      case "rock":
        if (computerM == "rock") {
          message = "It's a tie - try again";
          DOM.printMessage(message);
          return false;
        } else if (computerM == "paper") {
          message = "Paper beats Rock";
          DOM.printMessage(message);
          return players.computer;
        } else if (computerM == "scissors") {
          message = "Rock beats Scissors";
          DOM.printMessage(message);
          return players.player;
        }
        break;

      case "paper":
        if (computerM == "rock") {
          message = "Paper beats Rock";
          DOM.printMessage(message);
          return players.player;
        } else if (computerM == "paper") {
          message = "It's a tie - try again";
          DOM.printMessage(message);
          return false;
        } else if (computerM == "scissors") {
          message = "Scissors beats Paper";
          DOM.printMessage(message);
          return players.computer;
        }
        break;

      case "scissors":
        if (computerM == "rock") {
          message = "Rock beats Scissors";
          DOM.printMessage(message);
          return players.computer;
        } else if (computerM == "paper") {
          message = "Scissors beats Paper";
          DOM.printMessage(message);
          return players.player;
        } else if (computerM == "scissors") {
          message = "It's a tie - try again";
          DOM.printMessage(message);
          return false;
        }
        break;
    }
  };

  const playRound = function (moveIndex) {
    players.setLastMove(moveIndex);
    let playerMove = players.player.lastMove;
    let computerMove = players.computer.lastMove;
    let winner = pickWinner(playerMove, computerMove);

    DOM.printMoves();

    if (winner == false) {
      //prints tie message
    } else {
      players.setRoundScore(winner);
      DOM.printScore(winner);
      return winner.score;
    }
  };

  const resetVars = function () {
    players.computer.roundScore = 0;
    players.player.roundScore = 0;
  };

  return { playRound, playerMove, computerMove };
})();
