// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// File paths
const baseUrl = "./img/";
const idleFrames = [
    `${baseUrl}player_idle.png`
];
const walkRightFrames = [
    `${baseUrl}player_walkright0.png`,
    `${baseUrl}player_walkright1.png`,
    `${baseUrl}player_walkright2.png`,
    `${baseUrl}player_walkright3.png`
];

const walkLeftFrames = [
    `${baseUrl}player_walkleft0.png`,
    `${baseUrl}player_walkleft1.png`,
    `${baseUrl}player_walkleft2.png`,
    `${baseUrl}player_walkleft3.png`
];

const walkUpFrames = [
    `${baseUrl}player_back0.png`,
    `${baseUrl}player_back1.png`,
    `${baseUrl}player_back2.png`,
    `${baseUrl}player_back3.png`
];

const walkDownFrames = [
    `${baseUrl}player_forward0.png`,
    `${baseUrl}player_forward1.png`,
    `${baseUrl}player_forward2.png`,
    `${baseUrl}player_forward3.png`
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
    console.log("before");
    frameImage.onload = () => {
        console.log("after");
        if (frameImage.complete && frameImage.naturalWidth > 0) {
            ctx.drawImage(frameImage, playerX, playerY, 64, 64); // Adjust the size as needed
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
            break;
        case "ArrowLeft":
            playerX -= 5;
            currentFrames = walkLeftFrames; // Switch to walking left frames
            break;
        case "ArrowUp":
            playerY -= 5;
            currentFrames = walkUpFrames; // Switch to walking up frames
            break;
        case "ArrowDown":
            playerY += 5;
            currentFrames = walkDownFrames; // Switch to walking down frames
            break;
    }
});

document.addEventListener("keyup", () => {
    currentFrames = idleFrames; // Return to idle animation
});

// Start the game loop
idleFrames.onload = () => {
    requestAnimationFrame(drawPlayer);
};
