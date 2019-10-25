import { ColorPalette, vec4 } from '../types';
import { MainGame } from '../sph/main';
const classie = require('./classie');

let body:HTMLElement;
let openButton:HTMLElement;
let container:HTMLElement;
let canvas:HTMLElement;
let colorPairs:Array<HTMLElement>;
let particlesCountInfo:HTMLElement;
let fpsInfo:HTMLElement;
let mainGame:MainGame;

const palettes:Array<ColorPalette> = [
    new ColorPalette(
        new vec4(0.1529, 0.2352, 0.4588, 1.),
        new vec4(0.0980, 0.1647, 0.3372, 1.),
        new vec4(0.000, 0.749, 1.000, 1.0)
    ),
    new ColorPalette(
        new vec4(1, 0, 0, 1.),
        new vec4(0.9, 0, 0, 1.),
        new vec4(0, 1, 0, 1.0)
    ),
    new ColorPalette(
        new vec4(0, 0, 1, 1.),
        new vec4(0, 0, 0.9, 1.),
        new vec4(1, 0, 0, 1.0)
    )
]

const state = {
    /**
     * Is settings menu opened
     */
    isOpen: false,
    prevColorPaletteIndex: 0,
    colorPaletteIndex: 0,
    currentPalette: palettes[0],
    particleRadiusComputing: 0.07,
    particleRadiusVisualization: 0.00625,
    maxParticleCount: 100
};

// this is the entry point for the ui logic
// TODO: Decide wheter use App or MainGame class
export function initUI (simulation:MainGame) {
    mainGame = simulation;
    body = document.body;
    openButton = document.getElementById('open-button');
    container = document.querySelector('.container-fluid');
    canvas = document.getElementById('mainCanvas');
    particlesCountInfo = document.getElementById('particles-count-info');
    fpsInfo = document.getElementById('fps-info');

    // TODO: Update this when particles radius computing or max particles gets changed
    particlesCountInfo.innerHTML = ''+mainGame.sphState.n;

    colorPairs = [
        document.getElementById('color-option-1'),
        document.getElementById('color-option-2'),
        document.getElementById('color-option-3'),
    ]
    initEvents();
}

export function loopUI () {
    if (mainGame)
        fpsInfo.innerHTML = mainGame.FPS.toFixed(2);
}

function updateColorPalette () {
    // TODO: Access the main game and set the pallete color uniform of the shader
}

function updateParticleRadiusComputing () {

}

function updateParticleRadiusVisualization () {

}

function initEvents () {
    openButton.addEventListener('click', toggleMenu);

    // close the menu element if the target it´s not the menu element or one of its descendants..
    container.addEventListener('click', function (event) {
        const target = event.target;
        if (state.isOpen && target === canvas) {
            toggleMenu();
        }
    });

    colorPairs.forEach((element) => {
        element.addEventListener('click', selectColorPalette);
    })
}

function selectColorPalette(event:MouseEvent) {
    const target = <HTMLElement> event.target;
    const idx = +target.getAttribute('data-position');
    state.colorPaletteIndex = idx;
    // remove the color-pair-selected class to all color paletes
    classie.remove( colorPairs[state.prevColorPaletteIndex], 'color-pair-selected' );
    classie.add( colorPairs[state.colorPaletteIndex], 'color-pair-selected' );
    state.prevColorPaletteIndex = state.colorPaletteIndex;
    state.currentPalette = palettes[state.colorPaletteIndex];
}

function toggleMenu() {
    if (state.isOpen) {
        classie.remove( body, 'show-menu' );
    } else {
        classie.add( body, 'show-menu' );
    }
    state.isOpen = !state.isOpen;
}