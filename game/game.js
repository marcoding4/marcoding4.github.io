// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Base URL for images
const baseUrl = "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/";

// Load all frames for animations
const idleFrames = [`${baseUrl}player_idle.png?v=1733613659139`];
const walkRightFrames = [
    `${baseUrl}player_walkright0.png?v=1733613673508`,
    `${baseUrl}player_walkright1.png?v=1733613675828`,
    `${baseUrl}player_walkright2.png?v=1733613678389`,
    `${baseUrl}player_walkright3.png?v=1733613680951`
];
const walkLeftFrames = [
    `${baseUrl}player_walkleft0.png?v=1733613661617`,
    `${baseUrl}player_walkleft1.png?v=1733613665177`,
    `${baseUrl}player_walkleft2.png?v=1733613668208`,
    `${baseUrl}player_walkleft3.png?v=1733613671006`
];
const walkUpFrames = [
    `${baseUrl}player_back0.png?v=1733613619222`,
    `${baseUrl}player_back1.png?v=1733613632298`,
    `${baseUrl}player_back2.png?v=1733613642349`,
    `${baseUrl}player_back3.png?v=1733613645348`
];
const walkDownFrames = [
    `${baseUrl}player_forward0.png?v=1733613648019`,
    `${baseUrl}player_forward1.png?v=1733613650819`,
    `${baseUrl}player_forward2.png?v=1733613653276`,
    `${baseUrl}player_forward3.png?v=1733613656602`
];

// Player settings
let playerX = 100, playerY = 100; // Starting position
let frame = 0;                   // Current animation frame
let currentFrames = idleFrames;  // Default to idle animation
let currentFrameIndex = 0;       // Start at the first frame
let lastFrameTime = 0;           // Track time for frame updates
const frameDelay = 200;          // Delay between frames (ms)

// Draw the player
function drawPlayer(timestamp) {
    // Update the frame if enough time has passed
    if (timestamp - lastFrameTime > frameDelay) {
        currentFrameIndex = (currentFrameIndex + 1) % currentFrames.length; // Cycle through frames
        lastFrameTime = timestamp;
    }

    // Load the current frame image
    const frameImage = new Image();
    frameImage.src = currentFrames[currentFrameIndex];

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current frame
    frameImage.onload = () => {
        if (frameImage.complete && frameImage.naturalWidth > 0) {
            console.log(`Drawing frame: ${currentFrameIndex}`);
            ctx.drawImage(frameImage, playerX, playerY, 64, 64);
        } else {
            console.error('Image failed to load');
        }
    };

    requestAnimationFrame(drawPlayer);
}

// Handle movement and animation changes
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowRight":
            playerX += 5;
            currentFrames = walkRightFrames; // Switch to walking right frames
            console.log(`Moving right to X: ${playerX}`);
            break;
        case "ArrowLeft":
            playerX -= 5;
            currentFrames = walkLeftFrames; // Switch to walking left frames
            console.log(`Moving left to X: ${playerX}`);
            break;
        case "ArrowUp":
            playerY -= 5;
            currentFrames = walkUpFrames; // Switch to walking up frames
            console.log(`Moving up to Y: ${playerY}`);
            break;
        case "ArrowDown":
            playerY += 5;
            currentFrames = walkDownFrames; // Switch to walking down frames
            console.log(`Moving down to Y: ${playerY}`);
            break;
    }
});

document.addEventListener("keyup", () => {
    currentFrames = idleFrames; // Return to idle animation
    console.log('Returning to idle');
});

// Start the game loop
requestAnimationFrame(drawPlayer);
