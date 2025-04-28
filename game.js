// Basic Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 2,  // Aumenta la risoluzione del canvas
    parent: 'game-container',
    backgroundColor: '#FDF9F7', // Match the --brown CSS variable
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialize the game
const game = new Phaser.Game(config);

// Game variables
let knight;
let knightSpeed = 200;
let initialKnightSpeed = 200;
let movingRight = true;
let fallingObjects;
let spawnTimer;
let destroyLine;
let score = 0;
let bestScore = 0; // Track best score across games
let scoreText;
let gameOver = false;
let gameStarted = false; // Track if game has started
let firstTime = true;    // Track if it's the first launch
let firstGame = true;    // Track if it's the first game (for instructions)
let gameOverText;
let restartText;
let dalayNumber = 1500;
let initialDelayNumber = 1500;

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Handle window resize
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

function preload() {
    // Load assets here
    this.load.image('knight', 'assets/game/knight.png');
    this.load.image('pizza', 'assets/game/pizza.png');
    this.load.image('bomb', 'assets/game/bomb.png');
    this.load.image('castello', 'assets/game/castello.png');
    this.load.image('knightBig', 'assets/game/knightIntro.png'); // versione grande per il welcome screen
    this.load.image('Pergamena', 'assets/game/pergamena.png'); // versione grande per il welcome screen

}

function create() {
    // Ensure font is properly loaded
    const fontName = 'RichmondHillW90-TwoRegular';
    const alternativeFont = 'Aleo, Arial, sans-serif';

    // Reset game state
    score = 0;
    gameOver = false;
    dalayNumber = initialDelayNumber;
    knightSpeed = initialKnightSpeed;

    // Start game or show welcome screen based on first launch
    if (firstTime) {
        gameStarted = false;
        showWelcomeScreen.call(this, fontName, alternativeFont);
        firstTime = false; // Set to false so it won't show again
    } else {
        // Start the game immediately for restarts
        gameStarted = true;
        startGame.call(this, fontName, alternativeFont);
    }
}

function showWelcomeScreen(fontName, alternativeFont) {
    const translations = gameTranslations[currentLanguage] || gameTranslations.en;

    // Array per salvare le decorazioni
    const decorations = [];

    // Aggiungi decorazioni (pizze e bombe)
    const decorData = [
        { key: 'pizza', x: this.cameras.main.width / 4 + 20, y: this.cameras.main.height / 4 - 130 },
        { key: 'bomb', x: (this.cameras.main.width / 4 + 10) * 3, y: this.cameras.main.height / 4 - 80 },
        { key: 'bomb', x: (this.cameras.main.width / 4 + 20) * 3, y: (this.cameras.main.height / 4) * 2 + 90 },
        { key: 'pizza', x: this.cameras.main.width / 4 - 50, y: (this.cameras.main.height / 4) * 2 - 90 },
        { key: 'bomb', x: this.cameras.main.width / 4 - 50, y: (this.cameras.main.height / 4) * 2 + 150 },
    ];

    decorData.forEach(d => {
        const decor = this.add.image(d.x, d.y, d.key).setScale(0.7);
        decorations.push(decor);

        // Galleggia lentamente su e giù
        this.tweens.add({
            targets: decor,
            y: d.y + Phaser.Math.Between(-20, 20), // Piccolo movimento su/giù
            duration: Phaser.Math.Between(3000, 5000), // Tra 3 e 5 secondi
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Ruota anche piano piano
        this.tweens.add({
            targets: decor,
            angle: Phaser.Math.Between(-10, 10), // Piccola rotazione oscillante
            duration: Phaser.Math.Between(4000, 6000),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    });


    // Aggiungi il cavaliere grande
    const knight = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height+20,
        'knightBig'
    ).setScale(0.3).setOrigin(0.5, 1);


    // Aggiungi il cavaliere grande
    const Pergamena = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 3 - 50,
        'Pergamena'
    ).setScale(0.35);

    // Aggiungi il testo delle istruzioni sopra il rettangolo
    const instructionsText1 = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 3 - 50,
        translations.instructionsText1,
        {
            fontSize: '28px',
            fontFamily: ` ${fontName}, ${alternativeFont}`,
            color: '#472D2D',
            align: 'center',
            wordWrap: { width: this.cameras.main.width / 2, }
        }
    ).setOrigin(0.5);

    // Create button container
    const buttonContainer = this.add.container(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2+40
    );

    // Create the graphics object for the button background
    const buttonGraphics = this.add.graphics();
    const buttonWidth = 220;
    const buttonHeight = 50;

    // Draw the button shape (centered at 0,0)
    buttonGraphics.fillStyle(0xC64338, 1); // Red color
    buttonGraphics.lineStyle(2, 0xC64338, 1);
    buttonGraphics.fillRoundedRect(
        -buttonWidth / 2,
        -buttonHeight / 2,
        buttonWidth,
        buttonHeight,
        20
    );

    // Create the text
    const startText = this.add.text(
        0,
        0,
        translations.startButton,
        {
            fontSize: '35px',
            fontFamily: `${alternativeFont}, ${fontName}`,
            color: '#FFFFFF',
            align: 'center'
        }
    ).setOrigin(0.5, 0.5);

    // Add graphics and text to the container
    buttonContainer.add([buttonGraphics, startText]);

    // Set up the interactive area with proper hit area
    buttonContainer.setInteractive(new Phaser.Geom.Rectangle(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);
    buttonContainer.input.cursor = 'pointer';

    // Evento click
    buttonContainer.on('pointerdown', () => {
        startText.destroy();
        buttonGraphics.destroy();
        knight.destroy();
        Pergamena.destroy();
        instructionsText1.destroy();
        decorations.forEach(d => d.destroy());
        startGame.call(this, fontName, alternativeFont);
    });

    // Hover effect
    buttonContainer.on('pointerover', () => {
        buttonGraphics.clear();
        buttonGraphics.fillStyle(0xD64338, 1); // Slightly lighter red
        buttonGraphics.lineStyle(2, 0xD64338, 1);
        buttonGraphics.fillRoundedRect(
            -buttonWidth / 2,
            -buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            20
        );
        buttonGraphics.strokeRoundedRect(
            -buttonWidth / 2,
            -buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            20
        );
    });

    buttonContainer.on('pointerout', () => {
        buttonGraphics.clear();
        buttonGraphics.fillStyle(0xC64338, 1); // Back to original red
        buttonGraphics.lineStyle(2, 0xC64338, 1);
        buttonGraphics.fillRoundedRect(
            -buttonWidth / 2,
            -buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            20
        );
        buttonGraphics.strokeRoundedRect(
            -buttonWidth / 2,
            -buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            20
        );
    });
}

function startGame(fontName, alternativeFont) {
    gameStarted = true;

    // Create a group for falling objects
    fallingObjects = this.physics.add.group();

    // Create the knight as a physics sprite
    knight = this.physics.add.sprite(100, this.cameras.main.height - 315, 'knight').setScale(1.1);
    knight.setCollideWorldBounds(true);
    knight.body.allowGravity = false;

    // Set circular collider for knight
    knight.body.setCircle(knight.width / 3, knight.width / 3 - 13, knight.height / 3 - 5);



    // Get translations for the current language
    const translations = gameTranslations[currentLanguage] || gameTranslations.en;

    // Show temporary instruction message only on first game
    if (firstGame) {
        const instructionText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 100,
            translations.tapToChange,
            {
                fontSize: '2rem',
                fontFamily: 'Aleo, sans-serif',
                fill: '#C64338',
                align: 'center',
                wordWrap: { width: this.cameras.main.width / 2, }
                

            }
        ).setOrigin(0.5);

        // Add a subtle pulse animation to the instruction text
        this.tweens.add({
            targets: instructionText,
            alpha: 0.7,
            duration: 800,
            yoyo: true,
            repeat: 5
        });

        // Remove the instruction after 5 seconds
        this.time.delayedCall(5000, function () {
            // Fade out animation
            this.tweens.add({
                targets: instructionText,
                alpha: 0,
                duration: 500,
                onComplete: function () {
                    instructionText.destroy();
                }
            });
        }, [], this);

        // Set firstGame to false so the instruction won't appear again
        firstGame = false;
    }

    // Set up collision detection between knight and falling objects
    this.physics.add.overlap(knight, fallingObjects, handleCollision, null, this);

    // Set up click/tap handler to change direction
    this.input.on('pointerdown', function (pointer) {
        if (gameOver) {
            // Restart the game if it's game over
            this.scene.restart();
        } else {
            // Change knight direction
            movingRight = !movingRight;
        }
    }, this);

    // Create invisible line for destroying objects
    destroyLine = this.cameras.main.height - 290;

    // Set timer for spawning objects
    spawnTimer = this.time.addEvent({
        delay: dalayNumber,
        callback: spawnRandomObject,
        callbackScope: this,
        loop: true
    });

     // Add rectangle platform
     this.add.image(this.cameras.main.width / 2, this.cameras.main.height - 240, 'castello').setScale(0.6).setDepth(1);

         // Add score text
    scoreText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 100, '0', {
        fontSize: '100px',
        fontFamily: `${fontName}, ${alternativeFont}`,
        fill: '#C64338',
        depth: 101
    }).setOrigin(0.5).setDepth(2);

    // Set opacity correctly using the alpha property
}

function handleCollision(knight, object) {
    const objectType = object.getData('type');

    if (objectType === 'pizza') {
        // Increment score when colliding with pizza
        score++;
        scoreText.setText(score);
        object.destroy();

        // Update best score if current score is higher
        bestScore = Math.max(bestScore, score);

        // Reduce delay by 100ms for each pizza collected (min 300ms)
        dalayNumber = Math.max(300, dalayNumber - 100);

        // Increase knight speed by 20 for each pizza collected (max 500)
        knightSpeed = Math.min(500, knightSpeed + 10);

        // Update the spawn timer with new delay
        spawnTimer.remove();
        spawnTimer = this.time.addEvent({
            delay: dalayNumber,
            callback: spawnRandomObject,
            callbackScope: this,
            loop: true
        });
    } else if (objectType === 'bomb') {
        // Game over when colliding with bomb
        gameOver = true;

        // Stop the knight and all physics
        knight.setVelocityX(0);

        // Stop all falling objects
        fallingObjects.getChildren().forEach(obj => {
            obj.setVelocityY(0);
            obj.body.allowGravity = false;
            obj.body.enable = false;
        });

        // Stop spawning new objects
        spawnTimer.remove();

        // Stop the physics engine
        this.physics.pause();

        // Disable all input except for restart click
        this.input.keyboard.enabled = false;

        // Create background panel with rounded corners
        const panelGraphics = this.add.graphics();
        panelGraphics.fillStyle(0xFFFFFF, 1);
        panelGraphics.lineStyle(4, 0xC64338, 1);


        // Dimensioni del pannello
        const panelWidth = 360;
        const panelHeight = 400;

        // Draw rounded rectangle for the panel (senza stroke) - centrato perfettamente
        panelGraphics.fillRoundedRect(
            this.cameras.main.width / 2 - panelWidth / 2,
            this.cameras.main.height / 2 - panelHeight / 2-100,
            panelWidth,
            panelHeight,
            25
        );

        // Calcolo posizioni verticali per spaziatura uniforme
        const totalItems = bestScore > 0 ? 3 : 2; // Game over, [record], bottone
        const spacing = panelHeight / (totalItems + 1);

        // Posizione Y iniziale (parte superiore del pannello + spaziatura)
        let currentY = this.cameras.main.height / 2 - 130 - panelHeight / 2 + spacing;

        // Get translations for the current language
        const translations = gameTranslations[currentLanguage] || gameTranslations.en;

        // Display game over text
        gameOverText = this.add.text(this.cameras.main.width / 2, currentY, translations.gameOver, {
            fontSize: '50px',
            fontFamily: 'RichmondHillW90-TwoRegular, Aleo, Arial, sans-serif',
            fill: '#472D2D'
        }).setOrigin(0.5);

        currentY += spacing; // Incremento per il prossimo elemento

        // Display best score if it's greater than 0
        if (bestScore > 0) {
            this.add.text(this.cameras.main.width / 2, currentY, translations.record + bestScore, {
                fontSize: '28px',
                fontFamily: 'RichmondHillW90-TwoRegular, Aleo, Arial, sans-serif',
                fill: '#472D2D'
            }).setOrigin(0.5);

            currentY += spacing; // Incremento per il prossimo elemento
        }

        // Create restart button with rounded corners using Graphics
        const buttonGraphics = this.add.graphics();
        buttonGraphics.fillStyle(0xFFFFFF, 1);
        buttonGraphics.lineStyle(2, 0xC64338, 1);


        // Dimensioni pulsante
        const buttonWidth = 200;
        const buttonHeight = 60;

        // Draw rounded rectangle
        buttonGraphics.fillRoundedRect(
            this.cameras.main.width / 2 - buttonWidth / 2,
            currentY - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            20
        );
        buttonGraphics.strokeRoundedRect(
            this.cameras.main.width / 2 - buttonWidth / 2,
            currentY - buttonHeight / 2,
            buttonWidth,
            buttonHeight,
            20
        );

        // Create an invisible hit area for the button
        const restartButton = this.add.zone(
            this.cameras.main.width / 2,
            currentY,
            buttonWidth,
            buttonHeight
        ).setInteractive();

        // Add button text
        const buttonText = this.add.text(
            this.cameras.main.width / 2,
            currentY,
            translations.restartButton,
            {
                fontSize: '28px',
                fontFamily: 'Aleo, sans-serif',
                fill: '#472D2D'
            }
        ).setOrigin(0.5);

        // Add button effects
        restartButton.on('pointerover', function () {
            buttonGraphics.clear();
            buttonGraphics.fillStyle(0xFDF9F7, 1);
            buttonGraphics.lineStyle(3, 0xC64338, 1);
            buttonGraphics.fillRoundedRect(
                this.x - buttonWidth / 2,
                this.y - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                20
            );
            buttonGraphics.strokeRoundedRect(
                this.x - buttonWidth / 2,
                this.y - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                20
            );
        });

        restartButton.on('pointerout', function () {
            buttonGraphics.clear();
            buttonGraphics.fillStyle(0xFFFFFF, 1);
            buttonGraphics.lineStyle(2, 0xC64338, 1);
            buttonGraphics.fillRoundedRect(
                this.x - buttonWidth / 2,
                this.y - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                20
            );
            buttonGraphics.strokeRoundedRect(
                this.x - buttonWidth / 2,
                this.y - buttonHeight / 2,
                buttonWidth,
                buttonHeight,
                20
            );
        });

        // Add restart functionality to button only
        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });

        // Remove the global click handler for restart
        this.input.off('pointerdown');
    }
}

function spawnRandomObject() {
    // Randomly choose between pizza and bomb
    const objectType = Math.random() > 0.49 ? 'pizza' : 'bomb';

    // Random x position
    const randomX = Phaser.Math.Between(50, this.cameras.main.width - 50);

    // Create the object
    const object = fallingObjects.create(randomX, 0, objectType);

    // Set larger scale for objects
    if (objectType === 'pizza') {
        object.setScale(0.5);
    } else { // bomb
        object.setScale(0.5);
    }

    // Set constant falling velocity with slight horizontal movement
    object.setVelocityY(230);
    object.setVelocityX(Phaser.Math.Between(-50, 50)); // Add horizontal movement

    // Add rotation to the falling object
    object.setAngularVelocity(Phaser.Math.Between(-100, 100));

    // Disable gravity to maintain constant velocity
    object.body.allowGravity = false;

    // Enable object to bounce off world bounds
    object.body.setBounce(1);
    object.body.setCollideWorldBounds(true);

    // Set circular collider
    let radius, offsetX, offsetY;
    if (objectType === 'pizza') {
        radius = object.width / 2.5 - 3;
        offsetX = object.width / 4;
        offsetY = object.height / 4;
    } else { // bomb
        radius = object.width / 3 - 2;
        offsetX = object.width / 3.5 - 10;
        offsetY = object.height / 3.5;
    }
    object.body.setCircle(radius, offsetX, offsetY);

    // Store object type
    object.setData('type', objectType);
}

function update() {
    // Skip update if game is over or hasn't started
    if (gameOver || !gameStarted) return;

    // Move the knight horizontally
    if (movingRight) {
        knight.setVelocityX(knightSpeed);
    } else {
        knight.setVelocityX(-knightSpeed);
    }

    // Check if knight reached screen edges and reverse direction if needed
    if (knight.x >= this.cameras.main.width - knight.width / 2 - 30 && movingRight) {
        movingRight = false;
    } else if (knight.x <= knight.width / 2 + 30 && !movingRight) {
        movingRight = true;
    }

    // Check for objects that have passed the destroy line
    fallingObjects.getChildren().forEach(object => {
        // Skip if object is being destroyed or doesn't have a body
        if (!object || !object.body) return;

        if (object.y > destroyLine) {
            object.destroy();
            return; // Skip further processing for this object
        }

        // Ensure objects stay within screen bounds and bounce correctly
        const halfWidth = object.width / 2;

        // Manual bounds check and bounce for more precise control - add null check for body.velocity
        if (object.body && object.body.velocity) {
            if (object.x < halfWidth && object.body.velocity.x < 0) {
                // Left edge bounce
                object.setVelocityX(Math.abs(object.body.velocity.x));
            } else if (object.x > this.cameras.main.width - halfWidth && object.body.velocity.x > 0) {
                // Right edge bounce
                object.setVelocityX(-Math.abs(object.body.velocity.x));
            }
        }
    });
} 