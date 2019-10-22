import { MainGame } from './main';
import { App } from './App';
import { Position } from './types';
import initUI from './ui/index';

const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('mainCanvas');
let gl:WebGLRenderingContext;
let game:App;
let elapsedTime:number = 0;
let previousTime:number = 0;
let deltaTime:number = 0;

// #region engine logic
function init() {
    // Initialise WebGL 
    try { 
        gl = canvas.getContext('webgl');
    } catch( error ) { 
        console.error(error);
    }

    if ( !gl ) {
        throw "Cannot create webgl context";
    }

    // MainGame inherits from App, using some polymorphism
    // to ensure not to interact with high level components of the program
    game = new MainGame(gl, canvas);
    onResize();
    game.setup();
    onResize();
    render(0);
}
/**
 * The loop function
 */
function render(now:number) {
    elapsedTime = now;
    deltaTime = elapsedTime - previousTime;
    
    // See this to compute the delta time and the elapsed by using
    // the request animation frame https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
    game.FPS = 1000 / deltaTime;
    game.elapsedTime = elapsedTime;
    game.deltaTime = deltaTime;
    previousTime = elapsedTime;
    game.loop();

    requestAnimationFrame(render);
}
function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const x = 0;
    const y = 0;
    game.viewporWidth = canvas.width;
    game.viewporHeight = canvas.height;
    gl.viewport(x, y, canvas.width, canvas.height);
    game.onResize();
}
function getMousePos(canvas:HTMLCanvasElement, evt:any):Position {
    if (!evt) {
        console.log('getMousePos() didn\'t received an evt argument');
    }
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function onMouseMove(event:any) {
    game.mousePosition = getMousePos(canvas, event);
    console.log(game.mousePosition);
}
canvas.addEventListener('mousemove', onMouseMove);
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
init();
// #endregion engine logic

// Initialize jquery, redux, etc logic
initUI();
