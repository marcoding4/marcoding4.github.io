const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Door positions
const doorX = [200, 400, 600];
const doorY = 200;

// NPCs
const npcs = [
    { x: 250, y: 150, clue: "The correct door is not the one with the red mark", image: "img/npc1.png" },
    { x: 450, y: 150, clue: "The correct door is the one with a glowing outline", image: "img/npc2.png" },
    { x: 650, y: 150, clue: "The correct door is the third door", image: "img/npc3.png" }
];

// Randomly select the correct door index
let correctDoorIndex = Math.floor(Math.random() * 3);

// Player settings
let playerX = 100, playerY = 100; // Starting position
let currentFrames = walkRightFrames; // Default to walking right animation
let currentFrameIndex = 0; // Start at the first frame
let lastFrameTime = 0; // Track time for frame updates
const frameDelay = 200; // Delay between frames (ms)

// Load image filenames
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

// Draw the player
function drawPlayer(timestamp) {
    if (timestamp - lastFrameTime > frameDelay) {
        currentFrameIndex = (currentFrameIndex + 1) % currentFrames.length; // Cycle through frames
        lastFrameTime = timestamp;
    }

    const frameImage = new Image();
    frameImage.src = currentFrames[currentFrameIndex];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frameImage.onload = () => {
        if (frameImage.complete && frameImage.naturalWidth > 0) {
            ctx.drawImage(frameImage, playerX, playerY, 64, 64);
        } else {
            console.error('Image failed to load');
        }
    };

    // Draw doors
    for (let i = 0; i < doorX.length; i++) {
        ctx.fillStyle = (i === correctDoorIndex) ? "green" : "red";
        ctx.fillRect(doorX[i], doorY[0], 100, 200);
    }

    // Draw NPCs
    npcs.forEach(npc => {
        const npcImage = new Image();
        npcImage.src = npc.image; // NPC images from array
        npcImage.onload = () => {
            if (npcImage.complete && npcImage.naturalWidth > 0) {
                ctx.drawImage(npcImage, npc.x, npc.y, 50, 50);
            } else {
                console.error('NPC image failed to load');
            }
        };
    });

    requestAnimationFrame(drawPlayer);
}

// Handle movement and animation changes
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

// Handle NPC interaction
document.addEventListener("click", (e) => {
    // Check if the click is on an NPC
    npcs.forEach((npc, index) => {
        if (e.clientX > npc.x && e.clientX < npc.x + 50 &&
            e.clientY > npc.y && e.clientY < npc.y + 50) {
            alert(npc.clue); // Show clue
        }
    });
});

// Start the game loop
requestAnimationFrame(drawPlayer);
