const playerName = "Dummy user"; //prompt("Insert your name");

let playerScore = 0;
let computerScore = 0;
let playerGameScore = 0;
let computerGameScore = 0;
let roundCounter = 0;
let isOpen = false;
let welcomeMessage = "Try and beat the Computer - Good luck!";
const body = document.querySelector("body");
const playButtons = document.querySelectorAll(".button");
const roundMessage = document.querySelector(".round-message");
const playerNameP = document.querySelector(".player-name");
const playerScoreDiv = document.querySelector(".player-score");
const computerScoreDiv = document.querySelector(".computer-score");
const playerChoiceP = document.querySelector(".player-choice");
const computerChoiceP = document.querySelector(".computer-choice");
const playerMoveHistory = document.querySelector(".player-move");
const computerMoveHistory = document.querySelector(".computer-move");
const roundCounterDiv = document.querySelector(".round-counter");
const playerGameScoreP = document.querySelector(".player-game-score");
const computerGameScoreP = document.querySelector(".computer-game-score");
const rulesBtn = document.querySelector(".rules");

roundMessage.textContent = welcomeMessage;
playerNameP.textContent = playerName;
playerScoreDiv.textContent = playerScore;
computerScoreDiv.textContent = computerScore;
playerGameScoreP.textContent = `${playerName}: ${playerGameScore}`;
computerGameScoreP.textContent = `Computer: ${computerGameScore}`;

for (let i = 0; i < playButtons.length; i++) {
  let playerChoiceLower = setLowerCase(playButtons[i].textContent);

  playButtons[i].addEventListener("click", () => {
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

// runs a round and prints the score
function playRound(playerSelection, computerSelection) {
  roundCounter++;
  switch (playerSelection) {
    case "rock":
      if (computerSelection == "scissors") {
        ++playerScore;
        playerScoreDiv.textContent = playerScore;
        roundMessage.textContent = "You Win - Rock beasts Scissors";
      } else if (computerSelection == "paper") {
        roundMessage.textContent = "You Lose - Paper beats rock";
        computerScore++;
        computerScoreDiv.textContent = computerScore;
      } else if (computerSelection == "rock") {
        roundMessage.textContent = "It's a Tie";
      }
      break;

    case "paper":
      if (computerSelection == "scissors") {
        computerScore++;
        computerScoreDiv.textContent = computerScore;
        roundMessage.textContent = "You Lose - Scissors beats Paper";
      } else if (computerSelection == "paper") {
        roundMessage.textContent = "It's a Tie";
      } else if (computerSelection == "rock") {
        ++playerScore;
        playerScoreDiv.textContent = playerScore;
        roundMessage.textContent = "You Win - Paper beats Rock";
      }
      break;

    case "scissors":
      if (computerSelection == "scissors") {
        roundMessage.textContent = "It's a Tie";
      } else if (computerSelection == "paper") {
        roundMessage.textContent = "You Win - Scissors beats Paper";
        ++playerScore;
        playerScoreDiv.textContent = playerScore;
      } else if (computerSelection == "rock") {
        computerScore++;
        computerScoreDiv.textContent = computerScore;
        roundMessage.textContent = "You Lose - Rock beats Scissors";
      }
      break;
  }
}

rulesBtn.addEventListener("click", () => {
  if (!isOpen) {
    isOpen = true;
    const rulesDiv = document.createElement("p");
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {
      body.removeChild(rulesDiv);
      isOpen = false;
    });
    rulesDiv.textContent =
      "This is a simple Rock, Paper, Scissors game \nThe aim of the game is to beat the computer\nEvery game is made of 5 rounds \nFirst to score 5 points wins the game \nPlay as many games as you want \nPress reset at the end of each game to start over\nComputer and player histories are displayed\nGame scores are also displayed\n\nDo your best and beat the opponent!";
    console.log(rulesDiv.textContent);
    rulesDiv.appendChild(closeBtn);
    rulesDiv.className = "rules-popup";
    body.appendChild(rulesDiv);
  }
});

// restituisce la scelta del computer
function getComputerChoice() {
  let choice = ["rock", "paper", "scissors"];
  let index = Math.floor(Math.random() * 10) % 3;
  computerChoiceP.textContent = choice[index];
  printHistory(choice[index], "computer");
  return choice[index];
}

// trasforma la scelta del giocatore in una stringa a caratteri tutti minuscoli
function setLowerCase(playerSelection) {
  return playerSelection.toLowerCase();
}

function resetButton() {
  const resetDiv = document.querySelector(".reset");
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.classList = "reset-btn";
  resetBtn.addEventListener("click", () => {
    computerScore = 0;
    playerScore = 0;
    computerScoreDiv.textContent = computerScore;
    playerScoreDiv.textContent = playerScore;
    playerChoiceP.textContent = "";
    computerChoiceP.textContent = "";
    roundMessage.textContent = welcomeMessage;
    playerMoveHistory.textContent = "";
    computerMoveHistory.textContent = "";
    roundCounterDiv.textContent = "";
    roundCounter = 0;
    resetBtn.remove();
  });

  resetDiv.appendChild(resetBtn);
}

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
