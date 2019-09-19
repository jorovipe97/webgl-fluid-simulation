import { MainGame } from './main';
import { App } from './App';

const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('mainCanvas');
let gl:WebGLRenderingContext;
let game:App;
let elapsedTime:number;
let deltaTime:number;

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
    game.elapsedTime = now;
    // See this to compute the delta time and the elapsed by using
    // the request animation frame https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
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
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
init();