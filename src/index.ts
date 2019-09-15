import { MainGame } from './main';
import { App } from './App';

const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('mainCanvas');
let gl:WebGLRenderingContext;
let game:App;

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
    render();
}
/**
 * The loop function
 */
function render() {
    game.loop();
    requestAnimationFrame(render);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const x = 0;
    const y = 0;
    gl.viewport(x, y, canvas.width, canvas.height);
    game.onResize();
}
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
init();