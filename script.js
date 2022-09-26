import Mania from "./Mania.js";

const gameCanvas = document.getElementById('game');
const scoreEl = document.getElementById('score');
const missEl = document.getElementById('miss');
const timeEl = document.getElementById('time');
const leaderboard = document.getElementById('leaderboard');
const startPopup = document.getElementById('start-popup');
const gameOverPopup = document.getElementById('gameover-popup');
const pausePopup = document.getElementById('pause-popup');
const startButton = document.getElementById('btn-start')
const resumeButton = pausePopup.children[0];
const restartButtons = document.querySelectorAll('.btn-restart');

const mania = new Mania({
    canvas: gameCanvas,
    width: 960,
    height: 600,
    laneWidth: 75,
    lanes: ['d', 'f', 'j', 'k'],
    scoreElement: scoreEl,
    missElement: missEl,
    timeElement: timeEl,
    onGameOver: onGameOver
});

function onGameOver() {
    const scores = mania.getScores();

    scores.forEach((score, index) => {
        const div = document.createElement('div');
        div.classList.add('leaderboard__item');

        const spanClassList = ['score-number', 'score-name', 'score-value'];
        const spans = spanClassList.map(spanClass => {
            const span = document.createElement('span');
            span.classList.add(spanClass);

            return span;
        });

        spans[0].innerHTML = index + 1;
        spans[1].innerHTML = score.name;
        spans[2].innerHTML = score.score;

        spans.forEach(span => div.appendChild(span));
        leaderboard.appendChild(div);
    });


    gameOverPopup.style.display = 'block';
}

const startGame = () => {
    const name = document.getElementById('name').value;
    const song = document.getElementById('song').files[0];
    const bpm = document.getElementById('bpm').value;

    startPopup.style.display = 'none';

    mania.start(name, song, bpm);
}

const pauseGame = () => {
    if (!mania.isGameRunning) return;

    mania.pause();
    pausePopup.style.display = 'block';
}

const resumeGame = () => {
    if (mania.isGameRunning) return;

    pausePopup.style.display = 'none';
    mania.resume();
}

const restartGame = () => {
    window.location.reload();
}

document.addEventListener('keydown', pressedKey => {
    if (pressedKey.repeat) return;

    if (pressedKey.key === 'Escape' && mania.isGameRunning)
        pauseGame();
    else if (pressedKey.key === 'Escape')
        resumeGame();

    if (pressedKey.key === "`")
        restartGame();
});

startButton.addEventListener('click', () => startGame());

resumeButton.addEventListener('click', () => resumeGame());

restartButtons.forEach(button => {
    button.addEventListener('click', () => restartGame());
});

document.addEventListener('visibilitychange', () => {
   if (document.visibilityState !== 'hidden') return;

   pauseGame();
});

mania.main();
