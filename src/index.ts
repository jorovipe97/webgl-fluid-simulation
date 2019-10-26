import { MainGame } from './sph/main';
import { App } from './App';
import { Position } from './types';
import { initUI, loopUI } from './ui/index';

let canvas:HTMLCanvasElement;
let gl:WebGLRenderingContext;
let game:App;
let elapsedTime:number = 0;
let previousTime:number = 0;
let deltaTime:number = 0;

// #region engine logic
function init() {
    canvas = <HTMLCanvasElement> document.getElementById('mainCanvas');
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
    const simulation = new MainGame(gl, canvas);
    game = simulation;
    const ratio = window.innerWidth / window.innerHeight;
    canvas.width = 1920;
    canvas.height = canvas.width / ratio;

    canvas.addEventListener('mousemove', onMouseMove);
    onResize();
    game.setup();
    onResize();
    render(0);

    // Initialize jquery, redux, etc logic
    initUI(simulation);
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

    loopUI();
    requestAnimationFrame(render);
}
function onResize() {
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // console.log('ratio:', window.innerWidth/window.innerHeight);
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
    // mouse position on inner window screen coordinate system
    const mousePosition = getMousePos(canvas, event);
    // Tranform mouse position from window coordinates to canvas coordinates
    const mousePositionCanvas = {
        x: (mousePosition.x / window.innerWidth) * canvas.width,
        y: (mousePosition.y / window.innerHeight) * canvas.height
    }
    game.mousePosition = mousePositionCanvas;
}
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
window.addEventListener('load', init);
// #endregion engine logic
