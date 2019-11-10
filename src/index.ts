import { MainGame } from './sph/main';
import { App } from './App';
import { Position } from './types';
import { initUI, loopUI } from './ui/index';
import { isMobile } from './utils';

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let game: App;
let elapsedTime: number = 0;
let previousTime: number = 0;
let deltaTime: number = 0;
let maxWidth:number;



// #region engine logic
function init() {
    canvas = <HTMLCanvasElement>document.getElementById('mainCanvas');
    // Initialise WebGL 
    try {
        gl = canvas.getContext('webgl');
    } catch (error) {
        console.error(error);
        return;
    }

    if (!gl) {
        alert('It seems like your browser does not supports webgl');
        throw "Cannot create webgl context";
    }

    // TODO: This is a bad practice, see here how to create a full screeen canvas https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    // https://webglfundamentals.org/webgl/webgl-same-code-canvas-fullscreen.html
    const ratio = window.innerWidth / window.innerHeight;
    // Add conditional initial width based on device
    // 1920 for desktops and smaller resolutions for others devices
    // TODO: Check why the simulation does not run on android emulator and some android devices
    // maybe, it's due to highp ussage? https://developer.mozilla.org/es/docs/Web/API/WebGL_API/WebGL_best_practices
    // TODO: Use isMobile() function to change simulation parameters
    if (isMobile())
        maxWidth = 640;
    else
        maxWidth = 1920;

    // sets render bufer size
    canvas.width = maxWidth;
    canvas.height = canvas.width / ratio;

    // MainGame inherits from App, using some polymorphism
    // to ensure not to interact with high level components of the program
    const simulation = new MainGame(gl, canvas, ratio);
    game = simulation;

    // TODO: Create a method to change simulation parameters
    canvas.addEventListener('mousemove', onMouseMove);
    updateViewport();
    game.setup();
    updateViewport();
    render(0);

    // Initialize jquery, redux, etc logic
    initUI(simulation);
}
/**
 * The loop function
 */
function render(now: number) {
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
    // Supported cases in which canvas should be okay
    // 1. Navigator starts zoomed-out (e.g: 25%): Canvas width will be clamped at 1920, so it wont create a 4k canvas, game will look fine.
    // 2. Navigator starts zoomed-in (e.g: 500%): Canvas width will start at 1920, game will look fine.
    // 3. Navigator starts normal-zommed and during gameplay user do zoom-in: Game will look blurry at high zoom values
    // 4. Navigator starts normal-zommed and during gameplay user do zoom-out: Canvas width will be clamped at 1920, game will look fine

    // fix the anti patterns
    // https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    if (resizeCanvasToDisplaySize(canvas))
        updateViewport()
}

function updateViewport() {
    const x = 0;
    const y = 0;
    // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    // https://stackoverflow.com/questions/23950105/how-to-maintain-webgl-canvas-aspect-ratio
    gl.viewport(x, y, gl.drawingBufferWidth, gl.drawingBufferHeight);
    game.onResize();
}

/**
   * Resize a canvas to match the size its displayed.
   * @param {HTMLCanvasElement} canvas The canvas to resize.
   * @param {number} [multiplier] amount to multiply by.
   *    Pass in window.devicePixelRatio for native pixels.
   * @return {boolean} true if the canvas was resized.
   * @memberOf module:webgl-utils
   */
function resizeCanvasToDisplaySize(canvas:HTMLCanvasElement, multiplier:number=1) {
    // I'm constraining max render buffer width because when browser is zoomed out canvas could get too big sizes
    // canvas.clientWidth is being modified by css rules
    const width = Math.min(canvas.clientWidth * multiplier | 0, maxWidth);
    const ratio = window.innerWidth / window.innerHeight;
    // const height = canvas.clientHeight * multiplier | 0;
    const height = width / ratio;
    if (canvas.width !== width || canvas.height !== height) {
        console.log('size changed');
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
function getMousePos(canvas: HTMLCanvasElement, evt: any): Position {
    if (!evt) {
        console.log('getMousePos() didn\'t received an evt argument');
    }
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function onMouseMove(event: any) {
    // mouse position on inner window screen coordinate system
    const mousePosition = getMousePos(canvas, event);
    // Tranform mouse position from window coordinates to canvas coordinates
    const mousePositionCanvas = {
        x: (mousePosition.x / canvas.clientWidth) * gl.drawingBufferWidth,
        y: (mousePosition.y / canvas.clientHeight) * gl.drawingBufferHeight
    }
    // console.log(mousePosition, mousePositionCanvas);
    game.mousePosition = mousePositionCanvas;
}
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
window.addEventListener('load', init);
// #endregion engine logic
