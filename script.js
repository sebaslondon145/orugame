const gameContainer = document.getElementById('game-container');
const caterpillar = document.getElementById('caterpillar');
const predator = document.getElementById('predator');
const secondPredator = document.createElement('div');
secondPredator.id = 'second-predator';
gameContainer.appendChild(secondPredator);
const point = document.getElementById('point');
const scoreElement = document.getElementById('score');

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

function checkPointCollision() {
    if (Math.abs(caterpillarX - pointX) < 20 && Math.abs(caterpillarY - pointY) < 20) {
        score++;
        scoreElement.innerText = `Puntuación: ${score}`;
        movePoint();
        
        // Activar segundo depredador y modo oscuro al alcanzar 10 puntos
        if (score === 10) {
            secondPredator.style.display = 'block';
            document.body.classList.add('dark-mode');
            secondPredatorInterval = setInterval(moveSecondPredator, 50); // Iniciar el intervalo del segundo depredador
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
    alert('Game Over!');
    document.removeEventListener('keydown', moveCaterpillar);
    clearInterval(predatorInterval);
    clearInterval(secondPredatorInterval);
    clearInterval(gameLoop);
    // Reset the game reload the page
    location.reload();
}

let gameLoop = setInterval(moveCaterpillar, 50); 
movePoint();
const predatorInterval = setInterval(movePredator, 50); 
let secondPredatorInterval; 
