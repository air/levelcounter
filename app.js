// Game state
const players = [
    { name: 'AIR', level: 1 },
    { name: 'TARA', level: 1 },
    { name: 'RU', level: 1 },
    { name: 'FIN', level: 1 }
];

// Constants
const MIN_LEVEL = 1;
const MAX_LEVEL = 10;

// Initialize the app
function init() {
    const rows = document.querySelectorAll('.player-row');

    rows.forEach((row, index) => {
        const leftZone = row.querySelector('.tap-zone.left');
        const rightZone = row.querySelector('.tap-zone.right');

        leftZone.addEventListener('click', () => decrementLevel(index));
        rightZone.addEventListener('click', () => incrementLevel(index));
    });

    updateDisplay();
}

// Increment player level
function incrementLevel(playerIndex) {
    if (players[playerIndex].level < MAX_LEVEL) {
        players[playerIndex].level++;
        updateDisplay(playerIndex, true);
    }
}

// Decrement player level
function decrementLevel(playerIndex) {
    if (players[playerIndex].level > MIN_LEVEL) {
        players[playerIndex].level--;
        updateDisplay(playerIndex, true);
    }
}

// Update the display for one or all players
function updateDisplay(playerIndex = null, animate = false) {
    if (playerIndex !== null) {
        // Update single player
        const row = document.querySelector(`.player-row[data-player="${playerIndex}"]`);
        const levelElement = row.querySelector('.level');
        levelElement.textContent = players[playerIndex].level;

        // Add animation
        if (animate) {
            // Flash the row background
            row.classList.add('tap-flash');
            setTimeout(() => {
                row.classList.remove('tap-flash');
            }, 150);

            // Bounce animation for level number
            levelElement.classList.remove('increment-animation', 'decrement-animation');
            // Force reflow to restart animation
            void levelElement.offsetWidth;
            levelElement.classList.add('increment-animation');

            // Remove animation class after it completes
            setTimeout(() => {
                levelElement.classList.remove('increment-animation');
            }, 400);
        }
    } else {
        // Update all players
        players.forEach((player, index) => {
            const row = document.querySelector(`.player-row[data-player="${index}"]`);
            const levelElement = row.querySelector('.level');
            levelElement.textContent = player.level;
        });
    }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
