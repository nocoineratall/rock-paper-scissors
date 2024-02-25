function getComputerChoice() {
  let choice = ["rock", "paper", "scissors"];
  let index = Math.floor(Math.random() * 10) % 3;
  return choice[index];
}

function getPlayerSelection() {
  return prompt("Make a choice among Rock, Paper or Scissors");
}

function setLowerCase(playerSelection) {
  return playerSelection.toLowerCase();
}

function playRound(playerSelection, computerSelection) {
  //rende entrambi gli argomenti lowercase per il confronto
  playerSelection = setLowerCase(playerSelection);
  computerSelection = setLowerCase(computerSelection);

  console.log(playerSelection);
  if (playerSelection === computerSelection) {
    return -1; //"It's a tie";
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    return 0; //"You lose - Paper beats Rock";
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    return 0; //"You lose - Scissors beats Paper";
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    return 0; //"You lose - Rock beats Scissors";
  } else {
    return 1; //"You win - Motherfucker!";
  }
}

function playGame() {
  let i = 1;
  let userScore = 0;
  let computerScore = 0;
  let continueRounds = true;

  while (i <= 5 && continueRounds) {
    console.log(`Round ${i}`);
    let roundResult = playRound(getPlayerSelection(), getComputerChoice());
    if (roundResult == -1) {
      console.log("It's a tie - keep playing..");
    } else if (roundResult) {
      ++userScore;
      console.log(`User score = ${userScore}`);
    } else {
      ++computerScore;
      console.log(`Computer score = ${computerScore}`);
    }

    if (userScore == 3) {
      continueRounds = false;
      return "You Won";
    } else if (computerScore == 3) {
      continueRounds = false;
      return "GAME OVER";
    }
    ++i;
  }
  console.log(`Game completed. Here's the final result:\n
      User score = ${userScore}\n
      Computer score = ${computerScore}`);
}
