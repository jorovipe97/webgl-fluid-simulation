import { MainGame } from './sph/main';
import { App } from './App';
import { Position } from './types';
import { initUI, loopUI } from './ui/index';
import { isMobile } from './utils';

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
        return;
    }

    if ( !gl ) {
        alert('It seems like your browser does not supports webgl');
        throw "Cannot create webgl context";
    }

    // MainGame inherits from App, using some polymorphism
    // to ensure not to interact with high level components of the program
    const simulation = new MainGame(gl, canvas);
    game = simulation;
    // TODO: This is a bad practice, see here how to create a full screeen canvas https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    // https://webglfundamentals.org/webgl/webgl-same-code-canvas-fullscreen.html
    const ratio = window.innerWidth / window.innerHeight;
    // Add conditional initial width based on device
    // 1920 for desktops and smaller resolutions for others devices
    // TODO: Check why the simulation does not run on android emulator and some android devices
    // maybe, it's due to highp ussage? https://developer.mozilla.org/es/docs/Web/API/WebGL_API/WebGL_best_practices
    // TODO: Use isMobile() function to change simulation parameters
    if (isMobile()) 
        canvas.width = 640;
    else
        canvas.width = 1920;
    canvas.height = canvas.width / ratio;

    // TODO: Create a method to change simulation parameters
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
    // fix the anti patterns
    // https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html

    const x = 0;
    const y = 0;
    gl.viewport(x, y, gl.drawingBufferWidth, gl.drawingBufferHeight);
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
        x: (mousePosition.x / gl.drawingBufferWidth) * canvas.width,
        y: (mousePosition.y / gl.drawingBufferHeight) * canvas.height
    }
    game.mousePosition = mousePositionCanvas;
}
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
window.addEventListener('load', init);
// #endregion engine logic
