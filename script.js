import Mania from "./Mania.js";

const gameCanvas = document.getElementById('game');
const scoreEl = document.getElementById('score');
const missEl = document.getElementById('miss');
const pausePopup = document.getElementById('pause-popup');
const resumeButton = pausePopup.children[0];
const restartButton = pausePopup.children[1];

const mania = new Mania({
    canvas: gameCanvas,
    width: 960,
    height: 600,
    laneWidth: 75,
    lanes: ['d', 'f', 'j', 'k'],
    scoreElement: scoreEl,
    missElement: missEl,
});

document.addEventListener('keydown', pressedKey => {
    if (pressedKey.key !== 'Escape' || pressedKey.repeat) return;

    mania.pause();
    pausePopup.style.display = 'block';
});

resumeButton.addEventListener('click', () => {
    pausePopup.style.display = 'none';
    mania.resume();
});

restartButton.addEventListener('click', () => {
    window.location.reload();
})

mania.main();
