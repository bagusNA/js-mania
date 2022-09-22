import Mania from "./Mania.js";

const gameCanvas = document.getElementById('game');
const scoreEl = document.getElementById('score');
const missEl = document.getElementById('miss');
const pausePopup = document.getElementById('pause-popup');
const resumeButton = pausePopup.children[0];
const restartButton = pausePopup.children[1];

let isPaused = false;

const mania = new Mania({
    canvas: gameCanvas,
    width: 960,
    height: 600,
    laneWidth: 75,
    lanes: ['d', 'f', 'j', 'k'],
    scoreElement: scoreEl,
    missElement: missEl,
});

const pauseGame = () => {
    mania.pause();
    pausePopup.style.display = 'block';
}

const resumeGame = () => {
    pausePopup.style.display = 'none';
    mania.resume();
}

const restartGame = () => {
    window.location.reload();
}

document.addEventListener('keydown', pressedKey => {
    console.log(pressedKey.key)

    if (pressedKey.repeat) return;

    if (pressedKey.key === 'Escape' && !isPaused) {
        isPaused = true;
        pauseGame();
    }
    else if (pressedKey.key === 'Escape') {
        isPaused = false;
        resumeGame();
    }

    if (pressedKey.key === "`")
        restartGame();
});

resumeButton.addEventListener('click', () => resumeGame());

restartButton.addEventListener('click', () => restartGame());

mania.main();
