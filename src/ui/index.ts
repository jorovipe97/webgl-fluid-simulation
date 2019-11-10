import { ColorPalette, vec4, SystemParameters } from '../types';
import { MainGame } from '../sph/main';
import { getParameters } from '../sph';
import { palettes } from '../sph/parameters';
const classie = require('./classie');

let body:HTMLElement;
let openButton:HTMLElement;
let resetButton:HTMLElement;
let container:HTMLElement;
let canvas:HTMLElement;
let colorPairs:Array<HTMLElement>;
let particleRadiusInput:HTMLInputElement;
let particlesCountInput:HTMLInputElement;
let mouseInteractionInput:HTMLInputElement;
let fpsInfo:HTMLElement;
let mainGame:MainGame;

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
    fpsInfo = document.getElementById('fps-info');
    particleRadiusInput = <HTMLInputElement> document.getElementById('particle-radius-visualization-setup');
    particlesCountInput = <HTMLInputElement> document.getElementById('particles-count');
    mouseInteractionInput = <HTMLInputElement> document.getElementById('enable-mouse-interaction');
    resetButton = document.getElementById('apply-button');

    const parameters:SystemParameters = getParameters();
    particleRadiusInput.value = parameters.metaballRadius+'';
    // particlesCountInput.value = parameters.h+'';
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
    mainGame.setupColorPalette(state.currentPalette);
}

function updateParticleRadiusVisualization () {
    const value:number = +particleRadiusInput.value;
    mainGame.setupVisualizationRadius(value);
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
        element.addEventListener('click', selectColorPalette, false);
    })

    // On value change
    particleRadiusInput.addEventListener('input', updateParticleRadiusVisualization);
    particlesCountInput.addEventListener('input', onReset);
    mouseInteractionInput.addEventListener('input', mouseInteractionChange);
    resetButton.addEventListener('click', onReset);

}

function selectColorPalette (event:MouseEvent) {
    const target = <HTMLElement> event.target;
    const idx = +target.getAttribute('data-position');
    state.colorPaletteIndex = idx;
    // remove the color-pair-selected class to all color paletes
    classie.remove( colorPairs[state.prevColorPaletteIndex], 'color-pair-selected' );
    classie.add( colorPairs[state.colorPaletteIndex], 'color-pair-selected' );
    state.prevColorPaletteIndex = state.colorPaletteIndex;
    state.currentPalette = palettes[state.colorPaletteIndex];
    updateColorPalette();
}

function mouseInteractionChange () {
    mainGame.mouseInteractionEnabled = mouseInteractionInput.checked;
}

function onReset () {
    // I know i'm not checking the values on those inputs but come on, this is not a bank application
    const newParameters:SystemParameters = Object.assign(getParameters(), {
        h: +particlesCountInput.value
    });
    mainGame.changeSimulationParameters(newParameters);
}

function toggleMenu () {
    if (state.isOpen) {
        classie.remove( body, 'show-menu' );
    } else {
        classie.add( body, 'show-menu' );
    }
    state.isOpen = !state.isOpen;
}