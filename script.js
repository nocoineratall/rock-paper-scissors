const players = (function () {
  const player = {
    id: 0,
    name: "Player",
    roundScore: 0,
    gameScore: 0,
  };

  const computer = {
    id: 1,
    name: "Computer",
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
  const DOMelements = {
    body: document.querySelector("body"),
    playersName: document.querySelectorAll(".players"),
    scores: document.querySelectorAll(".scores"),
    moveBtns: document.querySelectorAll(".move"),
  };

  const printScore = function (player) {
    DOMelements.scores[player.id].textContent = player.roundScore;
  };

  const printPlayerNames = function () {
    DOMelements.playersName[0].textContent = players.player.name;
    DOMelements.playersName[1].textContent = players.computer.name;
  };

  // locating this function here prevents DOMelements to be exposed out
  // of the module
  function eventBinder() {
    DOMelements.moveBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(btn.value);
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

  return { printScore, printPlayerNames };
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
    const playerM = playerMove(moveIndex);
    const computerM = computerMove();

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
    console.log("The winner is: " + winner.name);

    if (winner == false) {
      console.log("its a tie");
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

  return { playRound, returnRoundWinner };
})();

// DOM elements initialization
// roundMessage.textContent = welcomeMessage;
// playerNameP.textContent = playerName;
// playerScoreDiv.textContent = playerScore;
// computerScoreDiv.textContent = computerScore;
// playerGameScoreP.textContent = `${playerName}: ${playerGameScore}`;
// computerGameScoreP.textContent = `Computer: ${computerGameScore}`;

// It binds event to all play buttons
for (let i = 0; i < playButtons.length; i++) {
  let playerChoiceLower = setLowerCase(playButtons[i].textContent);

  playButtons[i].addEventListener("click", () => {
    // callback function:
    // prints player choice on history panel
    // play a round, check for victory and prints winner name
    if (playerScore < 5 && computerScore < 5) {
      playerChoiceP.textContent = playerChoiceLower;
      playRound(playerChoiceLower, getComputerChoice());
      printHistory(playerChoiceLower, "player");
      if (playerScore == 5) {
        roundMessage.textContent = `Game Over - ${playerName} Wins`;
        playerGameScoreP.textContent = `${playerName}: ${++playerGameScore}`;
        resetButton();
      } else if (computerScore == 5) {
        roundMessage.textContent = "Game Over - Computer Wins";
        computerGameScoreP.textContent = `Computer: ${++computerGameScore}`;
        resetButton();
      }
    }
  });
}

// resets game variables to default value/state
// function resetVars() {
//   const resetDiv = document.querySelector(".reset");
//   const resetBtn = document.createElement("button");
//   resetBtn.textContent = "Play Again";
//   resetBtn.classList = "reset-btn";
//   resetBtn.addEventListener("click", () => {
//     computerScore = 0;
//     playerScore = 0;
//     computerScoreDiv.textContent = computerScore;
//     playerScoreDiv.textContent = playerScore;
//     playerChoiceP.textContent = "";
//     computerChoiceP.textContent = "";
//     roundMessage.textContent = welcomeMessage;
//     playerMoveHistory.textContent = "";
//     computerMoveHistory.textContent = "";
//     roundCounterDiv.textContent = "";
//     roundCounter = 0;
//     resetBtn.remove();
//   });
//   resetDiv.appendChild(resetBtn);
// }

// prints round on history panel
function printHistory(move, selector) {
  const moveP = document.createElement("p");
  const counterP = document.createElement("p");
  moveP.textContent = move;
  counterP.textContent = roundCounter;

  if (selector == "player") {
    playerMoveHistory.appendChild(moveP);
    roundCounterDiv.appendChild(counterP);
  } else {
    computerMoveHistory.appendChild(moveP);
  }
}
