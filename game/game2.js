// Canvas setup
const canvas = document.getElementById("gameCanvas");
if (!canvas) {
    console.error("Canvas not found. Check your HTML file.");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    console.error("Failed to get canvas context. Ensure your browser supports HTML5 canvas.");
}

// Player settings
let playerX = 100, playerY = 100; // Starting position
let currentFrameIndex = 0;
const frameDelay = 200; // Delay between frames (ms)
let lastFrameTime = 0;

// Load animation frames
const walkRightFrames = [
    "img/player_walkright0.png",
    "img/player_walkright1.png",
    "img/player_walkright2.png",
    "img/player_walkright3.png"
];
const walkLeftFrames = [
    "img/player_walkleft0.png",
    "img/player_walkleft1.png",
    "img/player_walkleft2.png",
    "img/player_walkleft3.png"
];
const walkUpFrames = [
    "img/player_back0.png",
    "img/player_back1.png",
    "img/player_back2.png",
    "img/player_back3.png"
];
const walkDownFrames = [
    "img/player_forward0.png",
    "img/player_forward1.png",
    "img/player_forward2.png",
    "img/player_forward3.png"
];
const idleFrames = ["img/player_idle.png"];
let currentFrames = idleFrames;

// Load NPCs
const npcs = [
    { x: 250, y: 150, clue: "The correct door is not the red one.", image: "img/npc1.png" },
    { x: 450, y: 150, clue: "Choose the door with the glowing outline.", image: "img/npc2.png" },
    { x: 650, y: 150, clue: "The correct door is the last one.", image: "img/npc3.png" }
];

// Draw function
function drawPlayer(timestamp) {
    // Update animation frame if enough time has passed
    if (timestamp - lastFrameTime > frameDelay) {
        currentFrameIndex = (currentFrameIndex + 1) % currentFrames.length;
        lastFrameTime = timestamp;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    const frameImage = new Image();
    frameImage.src = currentFrames[currentFrameIndex];
    frameImage.onload = () => {
        ctx.drawImage(frameImage, playerX, playerY, 64, 64);
    };
    frameImage.onerror = () => {
        console.error(`Failed to load player image: ${frameImage.src}`);
    };

    // Draw NPCs
    npcs.forEach(npc => {
        const npcImage = new Image();
        npcImage.src = npc.image;
        npcImage.onload = () => {
            ctx.drawImage(npcImage, npc.x, npc.y, 64, 64);
        };
        npcImage.onerror = () => {
            console.error(`Failed to load NPC image: ${npc.image}`);
        };
    });

    requestAnimationFrame(drawPlayer);
}

// Movement and animation handling
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowRight":
            playerX += 5;
            currentFrames = walkRightFrames;
            break;
        case "ArrowLeft":
            playerX -= 5;
            currentFrames = walkLeftFrames;
            break;
        case "ArrowUp":
            playerY -= 5;
            currentFrames = walkUpFrames;
            break;
        case "ArrowDown":
            playerY += 5;
            currentFrames = walkDownFrames;
            break;
    }
});

document.addEventListener("keyup", () => {
    currentFrames = idleFrames;
});

// Start game loop
requestAnimationFrame(drawPlayer);
