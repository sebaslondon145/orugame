const gameContainer = document.getElementById('game-container');
const caterpillar = document.getElementById('caterpillar');
const predator = document.getElementById('predator');
const secondPredator = document.createElement('div');
secondPredator.id = 'second-predator';
gameContainer.appendChild(secondPredator);
const point = document.getElementById('point');
const scoreElement = document.getElementById('score');

var body = document.getElementById("body")

var audio = new Audio('song.mp3');
audio.play();

let caterpillarX = 10;
let caterpillarY = 10;
let predatorX = 970;
let predatorY = 970;
let secondPredatorX = 0;
let secondPredatorY = 0;
let score = 0;
let pointX, pointY;

// Obtener la altura dinámica del contenedor en píxeles
const gameContainerHeight = gameContainer.clientHeight;

// Direcciones de movimiento de la oruga
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveUp = true;
            moveDown = false;
            break;
        case 'ArrowDown':
            moveUp = false;
            moveDown = true;
            break;
        case 'ArrowLeft':
            moveLeft = true;
            moveRight = false;
            break;
        case 'ArrowRight':
            moveLeft = false;
            moveRight = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveUp = false;
            break;
        case 'ArrowDown':
            moveDown = false;
            break;
        case 'ArrowLeft':
            moveLeft = false;
            break;
        case 'ArrowRight':
            moveRight = false;
            break;
    }
});

function moveCaterpillar() {
    if (moveUp) {
        caterpillarY -= 20; // Velocidad constante
        caterpillar.style.transform = 'rotate(0deg)'; // Rotación horizontal
    }
    if (moveDown) {
        caterpillarY += 20;
        caterpillar.style.transform = 'rotate(0deg)'; // Rotación vertical hacia abajo
    }
    if (moveLeft) {
        caterpillarX -= 20;
        caterpillar.style.transform = 'rotate(90deg)'; // Rotación horizontal
    }
    if (moveRight) {
        caterpillarX += 20;
        caterpillar.style.transform = 'rotate(90deg)'; // Rotación horizontal
    }

    // Verificar colisiones con los límites del mapa
    if (caterpillarX < -5 || caterpillarY < -5 || caterpillarX >= 1000 || caterpillarY >= gameContainerHeight) {
        endGame();
    }

    caterpillar.style.left = `${caterpillarX}px`;
    caterpillar.style.top = `${caterpillarY}px`;

    checkPointCollision();
}
function movePredator() {
    if (predatorX < caterpillarX) {
        predatorX += 10; // Aumenta la velocidad del depredador
    } else if (predatorX > caterpillarX) {
        predatorX -= 10; // Aumenta la velocidad del depredador
    }
    if (predatorY < caterpillarY) {
        predatorY += 10; // Aumenta la velocidad del depredador
    } else if (predatorY > caterpillarY) {
        predatorY -= 10; // Aumenta la velocidad del depredador
    }
    predator.style.left = `${predatorX}px`;
    predator.style.top = `${predatorY}px`;

    if (Math.abs(predatorX - caterpillarX) < 1 && Math.abs(predatorY - caterpillarY) < 1) {
        endGame();
    }
}

function moveSecondPredator() {
    // Calculate the direction of the second predator based on the relative position of the caterpillar and the first predator
    if (caterpillarX > secondPredatorX) {
        secondPredatorX += 10; // Move to the right
    } else {
        secondPredatorX -= 10; // Move to the left
    }
    if (caterpillarY > secondPredatorY) {
        secondPredatorY += 10; // Move down
    } else {
        secondPredatorY -= 10; // Move up
    }

    secondPredator.style.left = `${secondPredatorX}px`;
    secondPredator.style.top = `${secondPredatorY}px`;

    // Check collision with the caterpillar
    if (Math.abs(secondPredatorX - caterpillarX) < 100 && Math.abs(secondPredatorY - caterpillarY) < 50) {
        endGame();
    }
}

async function checkPointCollision() {
    if (Math.abs(caterpillarX - pointX) < 20 && Math.abs(caterpillarY - pointY) < 20) {
        score++;
        scoreElement.innerText = `Puntuación: ${score}`;
        movePoint();

      

        // Show image and hide game container at 1 point
        if (score === 6) {
                endGameFool();
              setTimeout(() => {
                window.location.href = "happy.html";
              }, 4000);
            
        }
    }
}


function movePoint() {
    pointX = Math.floor(Math.random() * 50) * 20;
    pointY = Math.floor(Math.random() * Math.floor(gameContainerHeight / 20)) * 20;
    point.style.left = `${pointX}px`;
    point.style.top = `${pointY}px`;
}

function endGame() {
    // Hide game container
    gameContainer.style.display = "none";

    // Show the image
    let image = document.getElementById("end-image");
    if (!image) {
        image = document.createElement('img');
        image.id = 'end-image';
        image.src = 'aja.jpeg';
        image.style.position = 'absolute';
        image.style.top = '0';
        image.style.left = '0';
        image.style.width = '100%'; // Adjust size as needed
        image.style.height = '100%'; // Adjust size as needed
        document.body.appendChild(image);
    } else {
        image.style.display = 'block';
    }

    this.audio.pause();

    let audio2 = new Audio('aja.mp3');
    audio2.play();

    // Stop the game loop and intervals
    clearInterval(predatorInterval);
    clearInterval(secondPredatorInterval);
    clearInterval(gameLoop);

    audio2.addEventListener('ended', () => {
        // Reload the page after the audio finishes playing
        window.location.reload();
    });
}

function endGameFool() {
    // Hide game container
    let gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "none";

    // Show the image
    let image = document.getElementById("end-image");
    if (!image) {
        image = document.createElement('img');
        image.id = 'end-image';
        image.src = 'image.webp';
        image.style.position = 'absolute';
        image.style.top = '0';
        image.style.left = '0';
        image.style.width = '100%'; // Adjust size as needed
        image.style.height = '100%'; // Adjust size as needed
        document.body.appendChild(image);

    } else {
        image.style.display = 'block';
    }

    audio.pause();

    let screamer = new Audio('screamer.mp3');
    screamer.play();
    // Stop the game loop and intervals
    clearInterval(predatorInterval);
    clearInterval(secondPredatorInterval);
    clearInterval(gameLoop);

    setTimeout(4000);

}


let gameLoop = setInterval(moveCaterpillar, 50);
movePoint();
const predatorInterval = setInterval(movePredator, 50);
let secondPredatorInterval; 
