// UI
const playButtons = document.querySelectorAll("button");

for (let i = 0; i < playButtons.length; i++) {
  let playerChoiceLower = setLowerCase(playButtons[i].textContent);

  playButtons[i].addEventListener("click", () => {
    if (playerScore < 5 && computerScore < 5) {
      playRound(playerChoiceLower, getComputerChoice());
      if (playerScore == 5)
        roundMessage.textContent = "Game Over - Player Wins";
      if (computerScore == 5)
        roundMessage.textContent = "Game Over - Computer Wins";
    }
  });
}

// runs a round and prints the score
let playerScore = 0;
let computerScore = 0;
const roundMessage = document.querySelector(".round-message");
const playerScorePane = document.querySelector(".player-score");
const computerScorePane = document.querySelector(".computer-score");
roundMessage.textContent = "Make a choice and beat the Coputer - Good luck!";
playerScorePane.textContent = `Player: ${playerScore}`;
computerScorePane.textContent = `Computer: ${computerScore}`;

function playRound(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "rock":
      if (computerSelection == "scissors") {
        ++playerScore;
        playerScorePane.textContent = `Player: ${playerScore}`;
        roundMessage.textContent = "You Win - Rock beasts Scissors";
      } else if (computerSelection == "paper") {
        roundMessage.textContent = "You Lose - Paper beats rock";
        computerScore++;
        computerScorePane.textContent = `Computer: ${computerScore}`;
      } else if (computerSelection == "rock") {
        roundMessage.textContent = "It's a tie - Try again";
      }
      break;

    case "paper":
      if (computerSelection == "scissors") {
        computerScore++;
        computerScorePane.textContent = `Computer: ${computerScore}`;
        roundMessage.textContent = "You Lose - Scissors beats Paper";
      } else if (computerSelection == "paper") {
        roundMessage.textContent = "It's a Tie - Try again";
      } else if (computerSelection == "rock") {
        ++playerScore;
        playerScorePane.textContent = `Player: ${playerScore}`;
        roundMessage.textContent = "You Win - Paper beats Rock";
      }
      break;

    case "scissors":
      if (computerSelection == "scissors") {
        roundMessage.textContent = "It's a Tie - Try again";
      } else if (computerSelection == "paper") {
        roundMessage.textContent = "You Win - Scissors beats Paper";
        ++playerScore;
        playerScorePane.textContent = `Player: ${playerScore}`;
      } else if (computerSelection == "rock") {
        computerScore++;
        computerScorePane.textContent = `Computer: ${computerScore}`;
        roundMessage.textContent = "You Lose - Rock beats Scissors";
      }
      break;
  }
}

// restituisce la scelta del computer
function getComputerChoice() {
  let choice = ["rock", "paper", "scissors"];
  let index = Math.floor(Math.random() * 10) % 3;
  return choice[index];
}

// trasforma la scelta del giocatore in una stringa a caratteri tutti minuscoli
function setLowerCase(playerSelection) {
  return playerSelection.toLowerCase();
}
