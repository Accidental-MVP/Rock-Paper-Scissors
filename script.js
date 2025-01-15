const CHOICES = ['rock', 'paper', 'scissors'];
const WINNING_COMBINATIONS = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

const ICONS = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

let playerScore = 0;
let computerScore = 0;
let currentPlayer = 'Player';
let gameHistory = [];

function startGame() {
  if (!currentPlayer) {
    alert('Please set your name first!');
    return;
  }
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.display = 'block';
  document.getElementById('startGame').style.display = 'none';
  document.getElementById('endGame').style.display = 'inline-block';
  playerScore = 0;
  computerScore = 0;
  document.getElementById('playerNameDisplay').textContent = currentPlayer;
  updateScore();
  document.getElementById('result').innerHTML = '';
}

function endGame() {
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('startGame').style.display = 'inline-block';
  document.getElementById('endGame').style.display = 'none';
  
  gameHistory.push({
    player: currentPlayer,
    playerScore: playerScore,
    computerScore: computerScore,
    timestamp: new Date()
  });
  
  let finalMessage = '';
  if (playerScore > computerScore) {
    finalMessage = `🎉 Congratulations ${currentPlayer}! You won the game! 🏆`;
  } else if (playerScore < computerScore) {
    finalMessage = '😔 Game Over! Computer won the game! 🤖';
  } else {
    finalMessage = '🤝 Game Over! It\'s a tie! 🤝';
  }
  
  document.getElementById('result').innerHTML = `
    <div class="winner-glow">
      <strong>${finalMessage}</strong>
    </div>
    <br>
    Final Score - ${currentPlayer}: ${playerScore}, Computer: ${computerScore}`;
  
  updateLeaderboard();
}

function updateScore() {
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) return '🤝 It\'s a Tie!';
  if (WINNING_COMBINATIONS[userChoice] === computerChoice) {
    playerScore++;
    return '🎉 You Win!';
  } else {
    computerScore++;
    return '🤖 Computer Wins!';
  }
}

function playGame(userChoice) {
  const resultElement = document.getElementById('result');
  resultElement.style.opacity = '0';
  
  setTimeout(() => {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    updateScore();
    
    resultElement.innerHTML = `
      <div style="font-size: 24px; margin-bottom: 10px;">
        <span class="${result.includes('You Win') ? 'winner-glow' : ''}">
          <strong>You:</strong> ${ICONS[userChoice]}
        </span>
        <span style="margin: 0 15px">VS</span>
        <span class="${result.includes('Computer Wins') ? 'winner-glow' : ''}">
          <strong>Computer:</strong> ${ICONS[computerChoice]}
        </span>
      </div>
      <strong style="font-size: 20px;">${result}</strong>`;
    
    resultElement.style.opacity = '1';
  }, 200);
}

function setPlayerName() {
  const nameInput = document.getElementById('playerName');
  const name = nameInput.value.trim();
  if (name) {
    currentPlayer = name;
    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('startGame').style.display = 'inline-block';
    document.getElementById('playerNameDisplay').textContent = currentPlayer;
    document.getElementById('endGameOptions').style.display = 'none';
    updateLeaderboard();
  }
}

function updateLeaderboard() {
  const leaderboardDiv = document.getElementById('leaderboard');
  const entriesDiv = document.getElementById('leaderboard-entries');
  leaderboardDiv.style.display = 'block';
  
  gameHistory.sort((a, b) => 
    (b.playerScore - b.computerScore) - (a.playerScore - a.computerScore)
  );
  
  entriesDiv.innerHTML = gameHistory.map(game => `
    <div class="leaderboard-entry ${game.player === currentPlayer ? 'highlight' : ''}">
      <span>${game.player}</span>
      <span>Score: ${game.playerScore} - ${game.computerScore}</span>
    </div>
  `).join('');
}

function showEndGameOptions() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('endGame').style.display = 'none';
    
    // Save game to history
    gameHistory.push({
        player: currentPlayer,
        playerScore: playerScore,
        computerScore: computerScore,
        timestamp: new Date()
    });
    
    let finalMessage = '';
    if (playerScore > computerScore) {
        finalMessage = `🎉 Congratulations ${currentPlayer}! You won the game! 🏆`;
    } else if (playerScore < computerScore) {
        finalMessage = '😔 Game Over! Computer won the game! 🤖';
    } else {
        finalMessage = '🤝 Game Over! It\'s a tie! 🤝';
    }
    
    document.getElementById('result').innerHTML = `
        <div class="winner-glow">
            <strong>${finalMessage}</strong>
        </div>
        <br>
        Final Score - ${currentPlayer}: ${playerScore}, Computer: ${computerScore}`;
    
    // Show end game options
    document.getElementById('currentPlayerDisplay').textContent = currentPlayer;
    document.getElementById('endGameOptions').style.display = 'block';
    
    updateLeaderboard();
}

function continueWithSamePlayer() {
    document.getElementById('endGameOptions').style.display = 'none';
    document.getElementById('startGame').style.display = 'inline-block';
    document.getElementById('result').innerHTML = '';
}

function switchPlayer() {
    // Reset everything for new player
    document.getElementById('endGameOptions').style.display = 'none';
    document.getElementById('player-setup').style.display = 'block';
    document.getElementById('playerName').value = '';
    document.getElementById('result').innerHTML = '';
    currentPlayer = '';
    
    // Reset score display to default
    document.getElementById('playerNameDisplay').textContent = 'Player';
}

function completeReset() {
    // Reset all game state
    currentPlayer = '';
    playerScore = 0;
    computerScore = 0;
    gameHistory = [];
    
    // Reset all displays
    document.getElementById('playerNameDisplay').textContent = 'Player';
    document.getElementById('playerScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('result').innerHTML = '';
    document.getElementById('playerName').value = '';
    
    // Hide all game elements
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('endGame').style.display = 'none';
    document.getElementById('endGameOptions').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    
    // Show initial elements
    document.getElementById('player-setup').style.display = 'block';
    
    // Add a farewell message
    document.getElementById('result').innerHTML = `
        <div class="winner-glow">
            <strong>Thanks for playing! Start a new session by entering your name.</strong>
        </div>`;
}

// Add event listener for keyboard controls when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key listener for name input
    const nameInput = document.getElementById('playerName');
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            setPlayerName();
        }
    });

    // Add global keyboard listeners
    document.addEventListener('keydown', function(e) {
        // Only process keyboard inputs if the user isn't typing in an input field
        if (document.activeElement.tagName !== 'INPUT') {
            handleKeyPress(e);
        }
    });

    // Add modal functionality
    const modal = document.getElementById('shortcutsModal');
    const helpBtn = document.getElementById('helpButton');
    const closeBtn = document.querySelector('.close-button');

    helpBtn.onclick = function() {
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Add 'h' key to toggle help modal
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'h' && document.activeElement.tagName !== 'INPUT') {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'block';
            }
        }
    });
});

// Add this new function to handle keyboard inputs
function handleKeyPress(e) {
    const modal = document.getElementById('shortcutsModal');
    
    // Close modal with Escape key if it's open
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        return;
    }
    
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('startGame');
    const endGameButton = document.getElementById('endGame');
    const endGameOptions = document.getElementById('endGameOptions');

    switch (e.key) {
        case 'Enter':
            // Start game if start button is visible
            if (startButton.style.display !== 'none') {
                startGame();
            }
            break;

        case 'Escape':
            // End game if end game button is visible
            if (endGameButton.style.display !== 'none') {
                showEndGameOptions();
            }
            break;

        case '1':
        case 'r':
        case 'R':
            // Play Rock if game is active
            if (gameContainer.style.display !== 'none') {
                playGame('rock');
                highlightButton('rock');
            }
            break;

        case '2':
        case 'p':
        case 'P':
            // Play Paper if game is active
            if (gameContainer.style.display !== 'none') {
                playGame('paper');
                highlightButton('paper');
            }
            break;

        case '3':
        case 's':
        case 'S':
            // Play Scissors if game is active
            if (gameContainer.style.display !== 'none') {
                playGame('scissors');
                highlightButton('scissors');
            }
            break;

        case 'c':
        case 'C':
            // Continue with same player if end game options are visible
            if (endGameOptions.style.display !== 'none') {
                continueWithSamePlayer();
            }
            break;

        case 'n':
        case 'N':
            // Switch player if end game options are visible
            if (endGameOptions.style.display !== 'none') {
                switchPlayer();
            }
            break;

        case 'x':
        case 'X':
            // Complete reset if end game options are visible
            if (endGameOptions.style.display !== 'none') {
                completeReset();
            }
            break;
    }
}

// Add this function to show visual feedback when using keyboard
function highlightButton(choice) {
    const buttons = document.querySelectorAll('.game-buttons button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(choice)) {
            button.classList.add('keyboard-active');
            setTimeout(() => {
                button.classList.remove('keyboard-active');
            }, 200);
        }
    });
} 