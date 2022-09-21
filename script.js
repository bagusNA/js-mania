import Mania from "./Mania.js";

const gameCanvas = document.getElementById('game');
const scoreEl = document.getElementById('score');
const missEl = document.getElementById('miss');

const mania = new Mania({
    canvas: gameCanvas,
    width: 960,
    height: 600,
    laneWidth: 75,
    lanes: ['d', 'f', 'j', 'k'],
    scoreElement: scoreEl,
    missElement: missEl,
});

mania.main();
