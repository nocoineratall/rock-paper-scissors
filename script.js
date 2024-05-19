// global variables definition and initialization
let roundCounter = 0;
let isOpen = false;
let welcomeMessage = "Try and beat the Computer - Good luck!";

const DOM = (function () {
  const DOMelements = {
    body: document.querySelector("body"),
    playButtons: document.querySelectorAll(".button"),
    roundMessage: document.querySelector(".round-message"),
    playerNameP: document.querySelector(".player-name"),
    playerScoreDiv: document.querySelector(".player-score"),
    computerScoreDiv: document.querySelector(".computer-score"),
    playerChoiceP: document.querySelector(".player-choice"),
    computerChoiceP: document.querySelector(".computer-choice"),
    playerMoveHistory: document.querySelector(".player-move"),
    computerMoveHistory: document.querySelector(".computer-move"),
    roundCounterDiv: document.querySelector(".round-counter"),
    playerGameScoreP: document.querySelector(".player-game-score"),
    computerGameScoreP: document.querySelector(".computer-game-score"),
    rulesBtn: document.querySelector(".rules"),
    resetDiv: document.querySelector(".reset"),
    resetBtn: document.createElement("button"),
  };

  return { DOMelements };
})();

const players = (function () {
  const player = {
    name: "Player",
    roundScore: 0,
    gameScore: 0,
  };

  const computer = {
    name: "Computer",
    roundScore: 0,
    gameScore: 0,
  };

  const setPlayerName = function (newName) {
    return (player.name = newName);
  };

  const setRoundScore = function (winner) {
    return ++winner.roundScore;
  };

  return { setPlayerName, setRoundScore, player, computer };
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

    if (winner == false) {
      console.log("its a tie");
      //prints tie message
    } else {
      players.setRoundScore(winner);
      return winner.score;
    }
  };

  const resetVars = function () {
    players.computer.roundScore = 0;
    players.player.roundScore = 0;
  };

  return { playRound, returnRoundWinner, playerMove, computerMove };
})();

// DOM elements initialization
roundMessage.textContent = welcomeMessage;
playerNameP.textContent = playerName;
playerScoreDiv.textContent = playerScore;
computerScoreDiv.textContent = computerScore;
playerGameScoreP.textContent = `${playerName}: ${playerGameScore}`;
computerGameScoreP.textContent = `Computer: ${computerGameScore}`;

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

// creates and prints game info
// binds it to "help" button
rulesBtn.addEventListener("click", () => {
  if (!isOpen) {
    isOpen = true;
    const rulesDiv = document.createElement("p");
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {
      DOM.DOMelements.body.removeChild(rulesDiv);
      isOpen = false;
    });
    rulesDiv.textContent =
      "This is a simple Rock, Paper, Scissors game \nThe aim of the game is to beat the computer\nEvery game is made of 5 rounds \nFirst to score 5 points wins the game \nPlay as many games as you want \nPress reset at the end of each game to start over\nComputer and player histories are displayed\nGame scores are also displayed\n\nDo your best and beat the opponent!";
    console.log(rulesDiv.textContent);
    rulesDiv.appendChild(closeBtn);
    rulesDiv.className = "rules-popup";
    DOM.DOMelements.body.appendChild(rulesDiv);
  }
});

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
