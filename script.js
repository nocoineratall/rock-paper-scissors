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

  return { setPlayerName, setRoundScore, player, computer };
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

    let wrapper = document.createElement("div");
    let roundCounterP = document.createElement("p");
    let playerHistoryP = document.createElement("p");
    let computerHistoryP = document.createElement("p");

    roundCounterP.textContent = ++historyIndex;
    playerHistoryP.textContent = players.player.lastMove;
    computerHistoryP.textContent = players.computer.lastMove;

    // DOMelements.historyTable.appendChild(roundCounterP);
    // DOMelements.historyTable.appendChild(playerHistoryP);
    // DOMelements.historyTable.appendChild(computerHistoryP);

    wrapper.appendChild(roundCounterP);
    wrapper.appendChild(playerHistoryP);
    wrapper.appendChild(computerHistoryP);

    DOMelements.historyTable.appendChild(wrapper);
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

  return { printScore, printPlayerNames, printMoves };
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

  const returnRoundWinner = function (moveIndex) {
    players.player.lastMove = playerMove(moveIndex);
    players.computer.lastMove = computerMove();

    const playerM = players.player.lastMove;
    const computerM = players.computer.lastMove;

    switch (playerM) {
      case "rock":
        if (computerM == "rock") {
          return false;
        } else if (computerM == "paper") {
          return players.computer;
        } else if (computerM == "scissors") {
          return players.player;
        }
        break;

      case "paper":
        if (computerM == "rock") {
          return players.player;
        } else if (computerM == "paper") {
          return false;
        } else if (computerM == "scissors") {
          return players.computer;
        }
        break;

      case "scissors":
        if (computerM == "rock") {
          return players.computer;
        } else if (computerM == "paper") {
          return players.player;
        } else if (computerM == "scissors") {
          return false;
        }
        break;
    }
  };

  const playRound = function (moveIndex) {
    let winner = returnRoundWinner(moveIndex);

    if (winner == false) {
      console.log("its a tie");
      DOM.printMoves();
      //prints tie message
    } else {
      players.setRoundScore(winner);
      DOM.printScore(winner);
      DOM.printMoves();
      return winner.score;
    }
  };

  const resetVars = function () {
    players.computer.roundScore = 0;
    players.player.roundScore = 0;
  };

  return { playRound, returnRoundWinner };
})();
