// Game translations
const gameTranslations = {
    en: {
        // Welcome screen
        instructionsText1: "Watch out for bombs and eat as many pizzas as you can!",
        startButton: "Start",
        
        // Game instructions
        tapToChange: "Tap to change direction",
        
        // Game over screen
        gameOver: "GAME OVER",
        record: "Record: ",
        restartButton: "Play Again"
    },
    it: {
        // Welcome screen
        instructionsText1: "Evita le bombe e mangia più pizze che puoi!",
        startButton: "Inizia",
        
        // Game instructions
        tapToChange: "Tappa per cambiare direzione",
        
        // Game over screen
        gameOver: "GAME OVER",
        record: "Record: ",
        restartButton: "Rigioca"
    },
    fr: {
        // Welcome screen
        instructionsText1: "Évitez les bombes et mangez un max de pizzas!",
        
        startButton: "Commencer",
        
        // Game instructions
        tapToChange: "Touchez pour changer de direction",
        
        // Game over screen
        gameOver: "GAME OVER",
        record: "Record : ",
        restartButton: "Rejouer"
    }
};

// Function to update game content based on selected language
function updateGameContent(language) {
    // Get the current language translations
    const translations = gameTranslations[language] || gameTranslations.en;
    
    // Update welcome screen text if it exists
    const instructionsText1 = document.querySelector('.instructions-text-1');
    if (instructionsText1) {
        instructionsText1.textContent = translations.instructionsText1;
    }
    
    const instructionsText2 = document.querySelector('.instructions-text-2');
    if (instructionsText2) {
        instructionsText2.textContent = translations.instructionsText2;
    }
    
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.textContent = translations.startButton;
    }
    
    // Update game instructions if they exist
    const tapToChange = document.querySelector('.tap-to-change');
    if (tapToChange) {
        tapToChange.textContent = translations.tapToChange;
    }
    
    // Update game over screen if it exists
    const gameOverText = document.querySelector('.game-over-text');
    if (gameOverText) {
        gameOverText.textContent = translations.gameOver;
    }
    
    const recordText = document.querySelector('.record-text');
    if (recordText) {
        // Keep the score number but update the "Record:" text
        const score = recordText.textContent.match(/\d+/)[0];
        recordText.textContent = translations.record + score;
    }
    
    const restartButton = document.querySelector('.restart-button');
    if (restartButton) {
        restartButton.textContent = translations.restartButton;
    }
}

// Export the function to make it available globally
window.updateGameContent = updateGameContent; 