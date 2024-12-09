// HTML Elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resultDisplay = document.getElementById('result');

// NPCs and doors 
const npcs = [
    { x: 50, y: 150, clue: "The correct door is not on the left." },
    { x: 250, y: 150, clue: "It's not the middle door." },
    { x: 450, y: 150, clue: "Choose the right door." },
];
const doors = [
    { x: 50, y: 300, isCorrect: false },
    { x: 250, y: 300, isCorrect: false },
    { x: 450, y: 300, isCorrect: true },
];

// Correct doors for each level
const correctDoors = [2, 0, 1]; // Correct doors for levels 1, 2, and 3

// Current level
let currentLevel = 1;

// Loading images
const npcImages = [
    "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/npc1.png?v=1733624568544",
    "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/npc2.png?v=1733624610378",
    "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/npc3.png?v=1733624613689"
].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});
const doorImages = [
    "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/door1.png?v=1733625009389",
    "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/door2.png?v=1733625012838",
    "https://cdn.glitch.global/5be637cd-2214-4418-ba2f-247fd239a211/door3.png?v=1733625018318"
].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

//Make images load with screen, was having problems with characters and doors not loading right
const npcImages = [];
const doorImages = [];
let imagesLoaded = 0;
const totalImages = npcImageSources.length + doorImageSources.length;

function onImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        drawScene(); // Draw the scene once all images are loaded
    }
}

// Load NPC images
for (const src of npcImageSources) {
    const img = new Image();
    img.src = src;
    img.onload = onImageLoad;
    npcImages.push(img);
}

// Load door images
for (const src of doorImageSources) {
    const img = new Image();
    img.src = src;
    img.onload = onImageLoad;
    doorImages.push(img);
}
// Draw the board
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw NPCs
    for (let i = 0; i < npcs.length; i++) {
        ctx.drawImage(npcImages[i], npcs[i].x, npcs[i].y, 64, 64);
    }

    // Draw doors
    for (let i = 0; i < doors.length; i++) {
        ctx.drawImage(doorImages[i], doors[i].x, doors[i].y, 80, 120);
    }
}

// clicks
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if an NPC was clicked
    for (let i = 0; i < npcs.length; i++) {
        if (
            mouseX > npcs[i].x &&
            mouseX < npcs[i].x + 64 &&
            mouseY > npcs[i].y &&
            mouseY < npcs[i].y + 64
        ) {
            resultDisplay.textContent = npcs[i].clue;
            return;
        }
    }

    // Check if a door was clicked
    for (let i = 0; i < doors.length; i++) {
        if (
            mouseX > doors[i].x &&
            mouseX < doors[i].x + 80 &&
            mouseY > doors[i].y &&
            mouseY < doors[i].y + 120
        ) {
            if (doors[i].isCorrect) {
                resultDisplay.textContent = "Correct! Moving to the next level...";
                setTimeout(nextLevel, 1000);
            } else {
                resultDisplay.textContent = "You Lose! Restarting the game...";
                setTimeout(resetGame, 2000); // Delay before resetting the game
            }
            return;
        }
    }
});

// Move to the next level
function nextLevel() {
    currentLevel++;
    if (currentLevel > 3) {
        resultDisplay.textContent = "You win! Game over!";
        return;
    }

    // Update the correct door for the new level
    for (let i = 0; i < doors.length; i++) {
        doors[i].isCorrect = (i === correctDoors[currentLevel - 1]);
    }

    //  Dialogue for each level
    if (currentLevel === 1) { //correct door is far right
        npcs[0].clue = "Level 1: The correct door is not on the left.";
        npcs[1].clue = "Level 1: It's not the middle door.";
        npcs[2].clue = "Level 1: The door on the far right is the one to choose.";
    } else if (currentLevel === 2) { // correct door is far left
        npcs[0].clue = "Level 2: The correct door is probably the one on the right.";
        npcs[1].clue = "Level 2: Dont trust that guy to my right.";
        npcs[2].clue = "Level 2: The door is not in the middle.";
    } else if (currentLevel === 3) { // correct door is in the middle
        npcs[0].clue = "Level 3: The correct door in in the middle.";
        npcs[1].clue = "Level 3: The correct door is in on one of the far sides.";
        npcs[2].clue = "Level 3: The liar in the npc in the middle.";
    }

    drawScene();
}
function resetGame() {
    currentLevel = 1; // Reset to the first level

    // Reset the correct door for level 1
    for (let i = 0; i < doors.length; i++) {
        doors[i].isCorrect = (i === 2); // Door on the right is correct for level 1
    }

    // Reset the NPC clues for level 1
    npcs[0].clue = "The correct door is not on the left.";
    npcs[1].clue = "It's not the middle door.";
    npcs[2].clue = "Choose the right door.";

    drawScene(); // Redraw the game scene
    resultDisplay.textContent = "Game reset! Try again.";
}

// Start the game
drawScene();
