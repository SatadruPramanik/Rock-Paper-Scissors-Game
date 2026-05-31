const choices = ['rock', 'paper', 'scissors'];
const choiceIcons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

let playerScore = 0;
let computerScore = 0;
let gameActive = true;

const choiceBtns = document.querySelectorAll('.choice-btn');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const gameMessageEl = document.getElementById('gameMessage');
const resultTextEl = document.getElementById('resultText');
const playerDisplayEl = document.getElementById('playerDisplay');
const computerDisplayEl = document.getElementById('computerDisplay');
const playAgainBtn = document.getElementById('playAgainBtn');
const resetBtn = document.getElementById('resetBtn');

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameActive) return;
        
        const playerChoice = btn.dataset.choice;
        playGame(playerChoice);
    });
});

playAgainBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetScore);

function playGame(playerChoice) {
    gameActive = false;
    
    // Disable all buttons
    choiceBtns.forEach(btn => btn.disabled = true);
    
    // Mark player choice
    choiceBtns.forEach(btn => {
        if (btn.dataset.choice === playerChoice) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Display player choice with animation
    displayPlayerChoice(playerChoice);
    
    // Computer makes choice after delay
    gameMessageEl.textContent = 'Computer is choosing...';
    
    setTimeout(() => {
        const computerChoice = getComputerChoice();
        displayComputerChoice(computerChoice);
        
        setTimeout(() => {
            determineWinner(playerChoice, computerChoice);
        }, 500);
    }, 800);
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function displayPlayerChoice(choice) {
    const icon = choiceIcons[choice];
    playerDisplayEl.innerHTML = `<span class="choice-icon-large animate">${icon}</span>`;
    playerDisplayEl.classList.add('active');
}

function displayComputerChoice(choice) {
    const icon = choiceIcons[choice];
    computerDisplayEl.innerHTML = `<span class="choice-icon-large animate">${icon}</span>`;
    computerDisplayEl.classList.add('active');
}

function determineWinner(player, computer) {
    if (player === computer) {
        resultTextEl.textContent = "It's a Draw!";
        resultTextEl.className = 'result-text draw';
        gameMessageEl.textContent = "No one wins this round";
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        resultTextEl.textContent = '🎉 You Win!';
        resultTextEl.className = 'result-text win';
        gameMessageEl.textContent = 'Great job! You won this round';
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
    } else {
        resultTextEl.textContent = '😢 You Lose';
        resultTextEl.className = 'result-text lose';
        gameMessageEl.textContent = 'Computer won this round';
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }
    
    // Check for match winner
    checkMatchWinner();
}

function checkMatchWinner() {
    if (playerScore === 5) {
        gameMessageEl.textContent = '🏆 You won the match!';
        playAgainBtn.textContent = 'Play New Match';
    } else if (computerScore === 5) {
        gameMessageEl.textContent = '🏆 Computer won the match!';
        playAgainBtn.textContent = 'Play New Match';
    } else {
        playAgainBtn.textContent = 'Play Again';
    }
}

function resetGame() {
    gameActive = true;
    
    // Reset UI
    resultTextEl.textContent = '';
    gameMessageEl.textContent = 'Make your choice!';
    playerDisplayEl.innerHTML = '<span class="choice-icon-large">?</span>';
    computerDisplayEl.innerHTML = '<span class="choice-icon-large">?</span>';
    playerDisplayEl.classList.remove('active');
    computerDisplayEl.classList.remove('active');
    
    // Reset button states
    choiceBtns.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('active');
    });
    
    // Check if match is over
    if (playerScore === 5 || computerScore === 5) {
        playerScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = '0';
        computerScoreDisplay.textContent = '0';
    }
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    
    resultTextEl.textContent = '';
    gameMessageEl.textContent = 'Match reset! Start new game';
    playerDisplayEl.innerHTML = '<span class="choice-icon-large">?</span>';
    computerDisplayEl.innerHTML = '<span class="choice-icon-large">?</span>';
    playerDisplayEl.classList.remove('active');
    computerDisplayEl.classList.remove('active');
    
    gameActive = true;
    choiceBtns.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('active');
    });
    
    playAgainBtn.textContent = 'Play Again';
}
