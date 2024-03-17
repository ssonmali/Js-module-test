// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const nextBtn = document.querySelector(".next-btn");
const congratsMessage = document.querySelector(".congrats-message");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const congratsContainer = document.querySelector(".congrats-container");
const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const computerScoreNumber = document.querySelector(
  ".computer-score .score__number"
);
const computerScoreContainer = document.querySelector(".computer-score");
computerScoreContainer.style.textAlign = "center"; // Align computer score text container in the center

let score = 0;
let computerScore = 0;

// Event listener for the "next" button
nextBtn.addEventListener("click", () => {
  // Hide other sections
  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".results").classList.add("hidden");
  document.querySelector(".button-container").classList.add("hidden");
  document.querySelector(".modal").classList.add("hidden");

  // Show congratulations message
  congratsContainer.classList.remove("hidden"); // Remove the 'hidden' class to display the congrats message
});

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = `
        <div style="text-align: center;">
          <span style="font-size: 2rem;">YOU WON</span><br>
          <span style="font-size: 1.5rem;">Against PC</span>
        </div>
      `;
      resultDivs[0].classList.toggle("winner");
      keepScore(1, "user");
      playAgainBtn.innerText = "Play Again";
      document.querySelector(".next-btn").classList.remove("hidden"); // Show the next button
    } else if (aiWins) {
      resultText.innerHTML = `
        <div style="text-align: center;">
          <span style="font-size: 2rem;">YOU LOST</span><br>
          <span style="font-size: 1.5rem;">Against PC</span>
        </div>
      `;
      resultDivs[1].classList.toggle("winner");
      keepScore(1, "computer");
      playAgainBtn.innerText = "Play Again";
      document.querySelector(".next-btn").classList.add("hidden"); // Hide the next button
    } else {
      resultText.innerHTML = `
        <div style="text-align: center;">
          <span style="font-size: 2rem;">TIE UP</span>
        </div>
      `;
      playAgainBtn.innerText = "Replay";
      document.querySelector(".next-btn").classList.add("hidden"); // Hide the next button
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
    playAgainBtn.classList.add("visible");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point, player) {
  if (player === "user") {
    score += point;
    scoreNumber.innerText = score;
  } else if (player === "computer") {
    computerScore += point;
    computerScoreNumber.innerText = computerScore;
  }
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  playAgainBtn.classList.remove("visible");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
