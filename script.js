import Mania from "./Mania.js";

const canvas = document.getElementById('game');
const mania = new Mania({
    canvas,
    width: 960,
    height: 600,
    laneWidth: 75,
    lanes: ['d', 'f', 'j', 'k'],
});

mania.main();
