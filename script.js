// restituisce la scelta del computer
function getComputerChoice() {
  let choice = ["rock", "paper", "scissors"];
  let index = Math.floor(Math.random() * 10) % 3;
  return choice[index];
}

// restituisce la scelta del giocatore
function getPlayerSelection() {
  return prompt("Make a choice among Rock, Paper or Scissors");
}

// trasforma la scelta del giocatore in una stringa a caratteri tutti minuscoli
function setLowerCase(playerSelection) {
  return playerSelection.toLowerCase();
}

// esegue un round del gioco
function playRound(playerSelection, computerSelection) {
  //rende entrambi gli argomenti lowercase per il confronto
  playerSelection = setLowerCase(playerSelection);
  computerSelection = setLowerCase(computerSelection);

  console.log(playerSelection);

  // qui è implemetata la logica di vittoria o sconfitta del round
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
  //inizializzo le variabili
  let i = 1; // contatore dei round
  let userScore = 0; // punteggio giocatore
  let computerScore = 0; // punteggio computer
  let continueRounds = true; // variabile logica per l'interruzione della partita dopo 5 round

  // permette di giocare 5 round oppure quando uno dei giocatori ha raggiunto 3 punti
  while (i <= 5 && continueRounds) {
    console.log(`Round ${i}`);

    // immagazzino l'esito del round, eseguito da playRound
    let roundResult = playRound(getPlayerSelection(), getComputerChoice());
    // a seconda dell'esito, restituisce un messaggio di vittoria, sconfitta, oppure pareggio
    if (roundResult == -1) {
      console.log("It's a tie - keep playing..");
    } else if (roundResult) {
      ++userScore;
      console.log(`User score = ${userScore}`);
    } else {
      ++computerScore;
      console.log(`Computer score = ${computerScore}`);
    }

    //verifica i punteggi dei giocatori, quindi se la partita può terminare
    if (userScore == 3) {
      continueRounds = false;
      return "You Won";
    } else if (computerScore == 3) {
      continueRounds = false;
      return "GAME OVER";
    }
    ++i;
  }

  // stampa in console il punteggio a fine partita
  console.log(`Game completed. Here's the final result:\n
      User score = ${userScore}\n
      Computer score = ${computerScore}`);
}
