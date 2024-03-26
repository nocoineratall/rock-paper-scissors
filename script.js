const playerName = "Dummy user"; //prompt("Insert your name");

let playerScore = 0;
let computerScore = 0;
const playButtons = document.querySelectorAll("button");
const roundMessage = document.querySelector(".round-message");
const playerNameP = document.querySelector(".player-name");
const playerScoreDiv = document.querySelector(".player-score");
const computerScoreDiv = document.querySelector(".computer-score");
const playerChoiceP = document.querySelector(".player-choice");
const computerChoiceP = document.querySelector(".computer-choice");
let welcomeMessage = "Try and beat the Computer - Good luck!";
roundMessage.textContent = welcomeMessage;
playerNameP.textContent = playerName;
playerScoreDiv.textContent = playerScore;
computerScoreDiv.textContent = computerScore;

for (let i = 0; i < playButtons.length; i++) {
  let playerChoiceLower = setLowerCase(playButtons[i].textContent);

  playButtons[i].addEventListener("click", () => {
    if (playerScore < 5 && computerScore < 5) {
      playerChoiceP.textContent = playerChoiceLower;
      playRound(playerChoiceLower, getComputerChoice());
      if (playerScore == 5) {
        roundMessage.textContent = `Game Over - ${playerName} Wins`;
        resetButton();
      } else if (computerScore == 5) {
        roundMessage.textContent = "Game Over - Computer Wins";
        resetButton();
      }
    }
  });
}

// runs a round and prints the score
function playRound(playerSelection, computerSelection) {
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

// restituisce la scelta del computer
function getComputerChoice() {
  let choice = ["rock", "paper", "scissors"];
  let index = Math.floor(Math.random() * 10) % 3;
  computerChoiceP.textContent = choice[index];
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
    resetBtn.remove();
  });

  resetDiv.appendChild(resetBtn);
}
