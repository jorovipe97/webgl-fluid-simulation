/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/**
 * This base class is the interface with the index.ts file
 * which will allow to the application to get the gl context and utilities timing properties
 * as time and delta time.
 */
var App = /** @class */ (function () {
    function App(glContext, canvasElement, aspectRatio) {
        this.uniformLocations = {};
        this.mousePosition = null;
        this.GL = glContext;
        this.canvas = canvasElement;
        this.aspectRatio = aspectRatio;
    }
    /**
     * Utility method to throw an error if shader compilation fails
     */
    App.prototype.compileShader = function (shaderSource, shaderType) {
        var shader = this.GL.createShader(shaderType);
        this.GL.shaderSource(shader, shaderSource);
        this.GL.compileShader(shader);
        if (!this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS)) {
            throw "Shader compile failed with: " + this.GL.getShaderInfoLog(shader);
        }
        return shader;
    };
    /**
     * Utility to throw error if the attribute was not found
     * @param program
     * @param name
     */
    App.prototype.getAttribLocation = function (program, name) {
        var attributeLocation = this.GL.getAttribLocation(program, name);
        if (attributeLocation === -1) {
            throw 'Can not find attribute ' + name + '.';
        }
        return attributeLocation;
    };
    App.prototype.getUniformLocation = function (program, name, ignoreErrors) {
        if (ignoreErrors === void 0) { ignoreErrors = false; }
        var uniformLocation = this.uniformLocations[name];
        if (!uniformLocation) {
            uniformLocation = this.GL.getUniformLocation(program, name);
            if (uniformLocation === null) {
                if (!ignoreErrors)
                    throw 'Can not find uniform ' + name + '.';
            }
            else {
                // If no errors cache the uniform location
                this.uniformLocations[name] = uniformLocation;
            }
        }
        return uniformLocation;
    };
    App.prototype.clear = function () {
        this.GL.clearColor(0.0, 0.0, 0.0, 1.0);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
        // this.GL.drawArrays(this.GL.TRIANGLE_STRIP, 0, 4);
    };
    App.prototype.drawMesh = function () {
        this.GL.drawArrays(this.GL.TRIANGLE_STRIP, 0, 4);
    };
    // #region API Methods
    App.prototype.setup = function () {
    };
    App.prototype.unload = function () {
        // removes previously cached uniform locations
        this.uniformLocations = {};
    };
    App.prototype.loop = function () {
    };
    App.prototype.onResize = function () {
    };
    return App;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sph_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sph/main */ "./src/sph/main.ts");
/* harmony import */ var _ui_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/index */ "./src/ui/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



var canvas;
var gl;
var game;
var elapsedTime = 0;
var previousTime = 0;
var deltaTime = 0;
var maxWidth;
// #region engine logic
function init() {
    canvas = document.getElementById('mainCanvas');
    // Initialise WebGL 
    try {
        gl = canvas.getContext('webgl');
    }
    catch (error) {
        console.error(error);
        return;
    }
    if (!gl) {
        alert('It seems like your browser does not supports webgl');
        throw "Cannot create webgl context";
    }
    // TODO: This is a bad practice, see here how to create a full screeen canvas https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    // https://webglfundamentals.org/webgl/webgl-same-code-canvas-fullscreen.html
    var ratio = window.innerWidth / window.innerHeight;
    // Add conditional initial width based on device
    // 1920 for desktops and smaller resolutions for others devices
    // TODO: Check why the simulation does not run on android emulator and some android devices
    // maybe, it's due to highp ussage? https://developer.mozilla.org/es/docs/Web/API/WebGL_API/WebGL_best_practices
    // TODO: Use isMobile() function to change simulation parameters
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isMobile"])())
        maxWidth = 640;
    else
        maxWidth = 1920;
    // sets render bufer size
    canvas.width = maxWidth;
    canvas.height = canvas.width / ratio;
    // MainGame inherits from App, using some polymorphism
    // to ensure not to interact with high level components of the program
    var simulation = new _sph_main__WEBPACK_IMPORTED_MODULE_0__["MainGame"](gl, canvas, ratio);
    game = simulation;
    // TODO: Create a method to change simulation parameters
    canvas.addEventListener('mousemove', onMouseMove);
    updateViewport();
    game.setup();
    updateViewport();
    render(0);
    // Initialize jquery, redux, etc logic
    Object(_ui_index__WEBPACK_IMPORTED_MODULE_1__["initUI"])(simulation);
}
/**
 * The loop function
 */
function render(now) {
    elapsedTime = now;
    deltaTime = elapsedTime - previousTime;
    // See this to compute the delta time and the elapsed by using
    // the request animation frame https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
    game.FPS = 1000 / deltaTime;
    game.elapsedTime = elapsedTime;
    game.deltaTime = deltaTime;
    previousTime = elapsedTime;
    game.loop();
    Object(_ui_index__WEBPACK_IMPORTED_MODULE_1__["loopUI"])();
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
        updateViewport();
}
function updateViewport() {
    var x = 0;
    var y = 0;
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
function resizeCanvasToDisplaySize(canvas, multiplier) {
    if (multiplier === void 0) { multiplier = 1; }
    // I'm constraining max render buffer width because when browser is zoomed out canvas could get too big sizes
    // canvas.clientWidth is being modified by css rules
    var width = Math.min(canvas.clientWidth * multiplier | 0, maxWidth);
    var ratio = window.innerWidth / window.innerHeight;
    // const height = canvas.clientHeight * multiplier | 0;
    var height = width / ratio;
    if (canvas.width !== width || canvas.height !== height) {
        console.log('size changed');
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
function getMousePos(canvas, evt) {
    if (!evt) {
        console.log('getMousePos() didn\'t received an evt argument');
    }
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function onMouseMove(event) {
    // mouse position on inner window screen coordinate system
    var mousePosition = getMousePos(canvas, event);
    // Tranform mouse position from window coordinates to canvas coordinates
    var mousePositionCanvas = {
        x: (mousePosition.x / canvas.clientWidth) * gl.drawingBufferWidth,
        y: (mousePosition.y / canvas.clientHeight) * gl.drawingBufferHeight
    };
    // console.log(mousePosition, mousePositionCanvas);
    game.mousePosition = mousePositionCanvas;
}
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
window.addEventListener('load', init);
// #endregion engine logic


/***/ }),

/***/ "./src/shaders/fragments.ts":
/*!**********************************!*\
  !*** ./src/shaders/fragments.ts ***!
  \**********************************/
/*! exports provided: generateMetaballsShaderSource, metaballShader, basicFragment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMetaballsShaderSource", function() { return generateMetaballsShaderSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaballShader", function() { return metaballShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basicFragment", function() { return basicFragment; });
// TODO: Pass particle velocity
// TODO: Pass color presets
// TODO: Support change of number of particles from the gui
function generateMetaballsShaderSource(state, params) {
    var pixelsCount = state.pixelsCount, particlesCount = state.n;
    var radius = params.metaballRadius;
    // checks if metaballs count is a power of 2
    var countLog2 = Math.log2(pixelsCount);
    if ((countLog2 - Math.floor(countLog2)) > 0) {
        throw 'pixelsCount argument must be a power of two';
    }
    // texture won't be always square textures
    var halfLog = countLog2 / 2;
    var width = Math.pow(2, Math.floor(halfLog));
    var height = Math.pow(2, Math.ceil(halfLog));
    // DONE: Add a tail in the oposite direction of the particle velocity
    // #region Shader Source
    var shaderSource = "\nprecision highp float;\nuniform vec2 viewportSize;\n// Each pixel in this image is a metaball position\n// the position will be encoded in the rg components and the radius\n// will be encoded in the b component therefore ignoring\n// a component.\nuniform sampler2D metaballsPositions;\n\nconst int width = " + width + ";\nconst int height = " + height + ";\n// const float r = " + radius.toFixed(1) + "; // particle radius\n// uniform float r = " + radius + "; // particle radius\nuniform float r; // particle radius\nconst int particlesCount = " + particlesCount + ";\n\nstruct ColorPalette {\n    vec4 sky1;\n    vec4 sky2;\n    vec4 dropColor;\n};\n\nuniform ColorPalette palette;\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / viewportSize.xy;\n\n    vec4 sky1 = palette.sky1;\n    vec4 sky2 = palette.sky2;\n    vec4 baseColor = mix(sky1, sky2, uv.x);\n\n    float rr = r * viewportSize.x;\n\n    // Iterate metaballs\n    float v = 0.0;\n    int currentPixel = 0;\n    for (int j = 0; j < height; j++)\n    {\n        for (int i = 0; i < width; i++)\n        {\n            if (++currentPixel > particlesCount) break;\n            vec2 positionUv = vec2(float(i) / float(width), float(j) / float(height));\n            vec4 metaballPosition = texture2D(metaballsPositions, positionUv);\n            float dx = metaballPosition.x * viewportSize.x - gl_FragCoord.x;\n            float dy = metaballPosition.y * viewportSize.y - gl_FragCoord.y;\n            v += rr*rr/(dx*dx + dy*dy);\n\n            // draw speed tail\n            // speed tail point 1\n            float tailR = rr * 0.7;\n            vec2 velocity = -metaballPosition.zw;\n            vec2 velocityDirection = normalize(velocity);\n            float speed = length(velocity);\n            vec2 velocityTail = velocityDirection * r * speed;\n            float dxv = dx + velocityTail.x;\n            float dyv = dy + velocityTail.y;\n            v += tailR*tailR/(dxv*dxv + dyv*dyv);\n\n            // speed tail point 2\n            float tailR2 = rr * 0.5;\n            vec2 velocityTail2 = velocityDirection * (r + tailR) * speed;\n            float dxv2 = dx + velocityTail2.x;\n            float dyv2 = dy + velocityTail2.y;\n            v += tailR2*tailR2/(dxv2*dxv2 + dyv2*dyv2);\n        }\n    }\n\n    if (v > 1.0) {\n        baseColor = palette.dropColor;\n    }\n\n    gl_FragColor = baseColor;\n}\n    ";
    // #endregion Shader Source
    return {
        shaderSource: shaderSource,
        textureDimensions: {
            width: width,
            height: height
        }
    };
}
// The glslcompiler would strip out the unused variables hence their locations will be -1. To resolve this, you must use the variable at hand. In your case, you are not using the sp_cloud and sp_bump samplers hence their locations will be -1.
// To resolve this, u must use the sampler in the shader.
// Another thing, you dont have to declare a uniform in the vertex shader if that uniform is only used in the fragment shader.
// Then if i don't use viewportSize in the shader it wont have a location
var metaballShader = "\nprecision highp float;\nuniform vec2 viewportSize;\n// Each pixel in this image is a metaball position\n// the position will be encoded in the rg components and the radius\n// will be encoded in the b component therefore ignoring\n// a component.\nuniform sampler2D metaballsPositions;\n// TODO: Pass width and height before shader compilation\nconst int width = 4;\nconst int height = 1;\n\nvoid main(){\n    vec2 uv = gl_FragCoord.xy / viewportSize.xy;\n\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n    // Iterate metaballs\n    for (int j = 0; j < height; j++)\n    {\n        for (int i = 0; i < width; i++)\n        {\n            vec2 positionUv = vec2(float(i) / float(width), float(j) / float(height));\n            vec4 metaballPosition = texture2D(metaballsPositions, positionUv);\n            float dx = metaballPosition.x - gl_FragCoord.x;\n            float dy = metaballPosition.y - gl_FragCoord.y;\n            float r = metaballPosition.z;\n            if (dx*dx + dy*dy < r*r)\n            {\n                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n            }\n        }\n    }\n}\n";
var basicFragment = "\nprecision highp float;\nuniform vec2 viewportSize;\n\nvoid main(){\n    // Draw every pixel red.\n    vec2 uv = gl_FragCoord.xy/viewportSize.xy;\n    gl_FragColor = vec4(uv.x, 0.0, 0.0, 1.0);\n}\n";


/***/ }),

/***/ "./src/shaders/vertex.ts":
/*!*******************************!*\
  !*** ./src/shaders/vertex.ts ***!
  \*******************************/
/*! exports provided: defaultVertextShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultVertextShader", function() { return defaultVertextShader; });
var defaultVertextShader = "\nattribute vec2 position;\n\nvoid main() {\n    // position specifies only x and y.\n    // We set z to be 0.0, and w to be 1.0\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n";


/***/ }),

/***/ "./src/sph/index.ts":
/*!**************************!*\
  !*** ./src/sph/index.ts ***!
  \**************************/
/*! exports provided: getParameters, allocState, freeState, freeParameters, computeDensity, computeAcceleration, leapfrogStep, leapfrogStart, reflectBoundaryConditions, reflectHorizontalLineObstacle, dampReflect, normalizeMass, initParticles, getTextureData, printCurrentState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameters", function() { return getParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allocState", function() { return allocState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeState", function() { return freeState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeParameters", function() { return freeParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeDensity", function() { return computeDensity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeAcceleration", function() { return computeAcceleration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leapfrogStep", function() { return leapfrogStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leapfrogStart", function() { return leapfrogStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reflectBoundaryConditions", function() { return reflectBoundaryConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reflectHorizontalLineObstacle", function() { return reflectHorizontalLineObstacle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dampReflect", function() { return dampReflect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeMass", function() { return normalizeMass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initParticles", function() { return initParticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextureData", function() { return getTextureData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printCurrentState", function() { return printCurrentState; });
/* harmony import */ var _parameters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parameters */ "./src/sph/parameters.ts");
/* harmony import */ var _indicatorsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indicatorsFunctions */ "./src/sph/indicatorsFunctions.ts");


function getParameters() {
    // clones this object to ensure defaultParameters object is never destroyed
    return Object.assign({}, _parameters__WEBPACK_IMPORTED_MODULE_0__["defaultParameters"]);
}
function initializeArray(elementsCount, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var array = [];
    for (var i = 0; i < elementsCount; i++) {
        array[i] = defaultValue;
    }
    return array;
}
function allocState(n, pixelsCount) {
    return {
        n: n,
        pixelsCount: pixelsCount,
        mass: 1,
        rho: initializeArray(n),
        x: initializeArray(n * 2),
        vh: initializeArray(n * 2),
        v: initializeArray(n * 2),
        a: initializeArray(n * 2) // for x and y component
    };
}
// TODO: What about using Object.keys() to remove automatically all the properties of state object
function freeState(state) {
    for (var key in state) {
        delete state[key];
    }
    // delete state['n'];
    // delete state['pixelsCount'];
    // delete state['mass'];
    // delete state['rho'];
    // delete state['x'];
    // delete state['vh'];
    // delete state['v'];
    // delete state['a'];
}
function freeParameters(parameters) {
    for (var key in parameters) {
        delete parameters[key];
    }
}
function computeDensity(state, parameters) {
    var n = state.n, rho = state.rho, x = state.x, mass = state.mass;
    // const h = parameters.metaballWidth;
    var h = parameters.h;
    var h2 = h * h;
    var h8 = h2 * h2 * h2 * h2;
    var C = 4 * mass / Math.PI / h8;
    var C2 = 4 * mass / Math.PI / h2;
    // We search for neighbors of node i by checking every particle, which is not
    // very efficient. We do at least take advange of the symmetry of the update (i
    // contributes to j in the same way that j contributes to i).
    // for each particle
    for (var i = 0; i < n; i++) {
        rho[i] += C2;
        // iterate each other particle
        for (var j = i + 1; j < n; j++) {
            var dx = x[2 * i + 0] - x[2 * j + 0];
            var dy = x[2 * i + 1] - x[2 * j + 1];
            var r2 = dx + dy;
            var z = h2 - r2;
            if (z > 0) {
                var rho_ij = C * z * z * z;
                rho[i] += rho_ij;
                rho[j] += rho_ij;
            }
        }
    }
}
/**
 * Like compute density,
 * the compute accel routine takes advantage of the symmetry of the interaction
 * forces (finteract_ij = −finteract_ji )
 * but it does a very expensive brute force search for
 * neighbors.
 * TODO: Apply the Barnes-Hut algorithm which cuts the complexity of n-body simulations from  ∼O(n2)  to  ∼O(nlog(n)).
 * @param state
 * @param parameters
 */
function computeAcceleration(state, parameters) {
    // unpack basic parameters
    var rho0 = parameters.rho0, k = parameters.k, mu = parameters.mu, g = parameters.g, minXAcceleration = parameters.minXAcceleration, maxXAcceleration = parameters.maxXAcceleration;
    // const h = parameters.metaballWidth;
    var h = parameters.h;
    var h2 = h * h;
    // unpack system state
    var mass = state.mass, rho = state.rho, x = state.x, v = state.v, a = state.a, n = state.n;
    // compute density
    computeDensity(state, parameters);
    // add gravity to each particle
    for (var i = 0; i < n; i++) {
        var randomFactor = Math.random();
        var xAccel = minXAcceleration * (1 - randomFactor) + maxXAcceleration * randomFactor;
        a[2 * i + 0] = xAccel; // x component
        // a[2*i + 1] = -g; // y component
        a[2 * i + 1] = -g; // y component
    }
    // constants for interaction terms
    var Co = mass / Math.PI / (h2 * h2);
    var Cp = 15 * k;
    var Cv = -40 * mu;
    // Compute interaction forces
    // for each particle
    for (var i = 0; i < n; i++) {
        var rhoi = rho[i];
        // iterate each other particle
        for (var j = i + 1; j < n; j++) {
            var dx = x[2 * i + 0] - x[2 * j + 0];
            var dy = x[2 * i + 1] - x[2 * j + 1];
            var r2 = dx * dx + dy * dy;
            // is the j particle is in the radious h of i?
            if (r2 < h2) {
                var rhoj = rho[j];
                var q = Math.sqrt(r2) / h;
                var u = 1 - q;
                // TODO: Remove rhoi from wo since it don't appears on the paper's equations
                var wo = Co * u / rhoi / rhoj;
                var wp = wo * Cp * (rhoi + rhoj - 2 * rho0) * u / q;
                var wv = wo * Cv;
                var dvx = v[2 * i + 0] - v[2 * j + 0];
                var dvy = v[2 * i + 1] - v[2 * j + 1];
                // TODO: Understand this.
                a[2 * i + 0] += (wp * dx + wv * dvx);
                a[2 * i + 1] += (wp * dy + wv * dvy);
                a[2 * j + 0] -= (wp * dx + wv * dvx);
                a[2 * j + 1] -= (wp * dy + wv * dvy);
            }
        }
    }
    // printCurrentState(state, 'computeAcceleration()');
    // debugger;
}
function leapfrogStep(state, dt) {
    var a = state.a, vh = state.vh, v = state.v, x = state.x, n = state.n;
    // TODO: Use the integer steps formula for the leapfrog
    // the integer step formula are literally the kinematic equations
    // which use the taylor therom to describe de position in moment t.
    // see: https://www.algorithm-archive.org/contents/verlet_integration/verlet_integration.html
    // this will save us a for loop
    for (var i = 0; i < 2 * n; ++i)
        vh[i] += a[i] * dt;
    for (var i = 0; i < 2 * n; ++i)
        v[i] = vh[i] + a[i] * dt / 2;
    for (var i = 0; i < 2 * n; ++i)
        x[i] += vh[i] * dt;
    reflectBoundaryConditions(state);
}
/**
 * At the first step, the leapfrog iteration only has the initial velocities v0, so we
 * need to do something special.
 * @param state
 * @param dt
 */
function leapfrogStart(state, dt) {
    var a = state.a, vh = state.vh, v = state.v, x = state.x, n = state.n;
    for (var i = 0; i < 2 * n; ++i)
        vh[i] = v[i] + a[i] * dt / 2;
    for (var i = 0; i < 2 * n; ++i)
        v[i] += a[i] * dt;
    for (var i = 0; i < 2 * n; ++i)
        x[i] += vh[i] * dt;
    reflectBoundaryConditions(state);
}
function reflectBoundaryConditions(state) {
    // Boundaries of the computational domain
    var XMIN = 0.0;
    var XMAX = 1.0;
    var YMIN = 0.0;
    var YMAX = 1.0;
    var x = state.x, n = state.n;
    for (var i = 0; i < n; ++i) {
        var idx = i * 2;
        if (x[idx + 0] < XMIN)
            dampReflect(0, XMIN, state, idx);
        if (x[idx + 0] > XMAX)
            dampReflect(0, XMAX, state, idx);
        if (x[idx + 1] < YMIN)
            dampReflect(1, YMIN, state, idx);
        if (x[idx + 1] > YMAX)
            dampReflect(1, YMAX, state, idx);
    }
}
function reflectHorizontalLineObstacle(state, ptx, pty, width) {
    if (ptx === void 0) { ptx = 0.25; }
    if (pty === void 0) { pty = 0.45; }
    if (width === void 0) { width = 0.06; }
    var x = state.x, n = state.n;
    var half = 0.5;
    for (var i = 0; i < n; ++i) {
        var idx = i * 2;
        var isXOverHorizontalLine = x[idx + 0] > (ptx - width * half) && x[idx + 0] < (ptx + width * half);
        var isYUnderTheLine = x[idx + 1] < pty;
        if (isXOverHorizontalLine && isYUnderTheLine) {
            dampReflect(1, pty, state, idx);
        }
    }
}
function dampReflect(which, barrier, state, idx) {
    var vh = state.vh, v = state.v, x = state.x;
    // Coefficient of resitiution
    var DAMP = 0.75;
    // Ignore degenerate cases
    if (v[idx + which] == 0)
        return;
    // Scale back the distance traveled based on time from collision
    var tbounce = (x[idx + which] - barrier) / v[idx + which];
    // the (1-DAMP) is used to make computations taking into acount
    // the damped speed in a moment in which speed hasn't been damped yet
    x[idx + 0] -= v[idx + 0] * (1 - DAMP) * tbounce;
    x[idx + 1] -= v[idx + 1] * (1 - DAMP) * tbounce;
    // Reflect the position and velocity
    x[idx + which] = 2 * barrier - x[idx + which];
    v[idx + which] = -v[idx + which];
    vh[idx + which] = -vh[idx + which];
    // Damp the velocities
    v[idx + 0] *= DAMP;
    vh[idx + 0] *= DAMP;
    v[idx + 1] *= DAMP;
    vh[idx + 1] *= DAMP;
}
function placeParticles(parameters, indicatorFunction) {
    var h = parameters.h;
    // separation between particles will be of 0.3
    var hh = h / 1.3;
    var count = 0;
    // Count mesh points that fall in indicated region.
    for (var x = 0; x < 1; x += hh)
        for (var y = 0; y < 1; y += hh)
            count += indicatorFunction(x, y) ? 1 : 0;
    // the number of particles must be a power of two
    // to render it on the gpu
    // Since it's possible that the count is not a power of 2
    // I'll compute the top-nearest count of pixels required
    // to transfer all the particles.
    var pow = Math.ceil(Math.log2(count));
    var texturePixelsCount = Math.pow(2, pow);
    // count = 2 ** pow;
    // Populate the particle data structure
    var s = allocState(count, texturePixelsCount);
    var p = 0;
    for (var x = 0; x < 1; x += hh) {
        for (var y = 0; y < 1; y += hh) {
            if (indicatorFunction(x, y) && p < count) {
                s.x[2 * p + 0] = x;
                s.x[2 * p + 1] = y;
                s.v[2 * p + 0] = 0;
                s.v[2 * p + 1] = 0;
                ++p;
            }
        }
    }
    return s;
}
function normalizeMass(state, parameters) {
    state.mass = 1;
    computeDensity(state, parameters);
    // reference density
    var rho0 = parameters.rho0;
    var rho2s = 0;
    var rhos = 0;
    for (var i = 0; i < state.n; ++i) {
        rho2s += (state.rho[i]) * (state.rho[i]);
        rhos += state.rho[i];
    }
    // TODO: Understand how this normalization is done
    // mass necessary in order to achieve the desired reference density
    state.mass *= (rho0 * rhos / rho2s);
}
function initParticles(parameters) {
    // Open gl shader coordinate system is on the first cartesian coordinate
    var ptx = 0.25;
    var pty = 0.5;
    var width = 0.5;
    var height = 0.5;
    var s = placeParticles(parameters, Object(_indicatorsFunctions__WEBPACK_IMPORTED_MODULE_1__["boxIndicatorFactory"])(ptx, pty, width, height));
    // const centerX = 0.5;
    // const centerY = 0.5;
    // const radius = 0.25;
    // const s:SystemState = placeParticles(parameters, circleIndicatorFactory(centerX, centerY, radius));
    normalizeMass(s, parameters);
    // printCurrentState(s, 'after normalizeMass()');
    return s;
}
function getTextureData(textureData, state, parameters) {
    var n = state.n, pixelsCount = state.pixelsCount;
    if (textureData.length !== (pixelsCount * 4))
        throw 'Texture data array must be an array of 4 times the number of pixelsCount on the system state instance';
    for (var i = 0; i < n; i++) {
        textureData[4 * i + 0] = state.x[2 * i + 0]; // x, position
        textureData[4 * i + 1] = state.x[2 * i + 1]; // y, position
        // velocity half step back
        // TODO: Check it out this
        // velocity direction
        // const vx = state.v[2*i + 0]; // x, velocity
        // const vy = state.v[2*i + 1]; // y, velocity
        // const vMag = Math.sqrt(vx*vx + vy*vy);
        textureData[4 * i + 2] = state.v[2 * i + 0]; // x, velocity
        textureData[4 * i + 3] = state.v[2 * i + 1]; // y, velocity
    }
}
function printCurrentState(state, description) {
    if (description === void 0) { description = undefined; }
    if (description) {
        console.log(description, JSON.parse(JSON.stringify(state)));
    }
    else {
        console.log(JSON.parse(JSON.stringify(state)));
    }
}


/***/ }),

/***/ "./src/sph/indicatorsFunctions.ts":
/*!****************************************!*\
  !*** ./src/sph/indicatorsFunctions.ts ***!
  \****************************************/
/*! exports provided: boxIndicatorFactory, circleIndicatorFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxIndicatorFactory", function() { return boxIndicatorFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleIndicatorFactory", function() { return circleIndicatorFactory; });
/**
 * Note that positions and dimensions must be given in normalized values
 * in range [0, 1]
 * @param ptx Top-left corner x position
 * @param pty Top-left corner y position
 * @param width Width from top-left corner point
 * @param height Height from top-left corner point
 */
function boxIndicatorFactory(ptx, pty, width, height) {
    return function boxIndicator(x, y) {
        return (x > ptx && x < (ptx + width)) &&
            (y > pty && y < (pty + height));
    };
}
/**
 * Note that positions and dimensions must be given in normalized values
 * in range [0, 1]
 * @param centerX X coordinate of circle center
 * @param centerY Y coordinate of circle center
 * @param radius Circle radius
 */
function circleIndicatorFactory(centerX, centerY, radius) {
    // TODO: Use a function factory to generalize the circle indicator
    return function circleIndicator(x, y) {
        // center
        var dx = (x - centerX);
        var dy = (y - centerY);
        var r2 = dx * dx + dy * dy;
        return (r2 < radius * radius);
    };
}


/***/ }),

/***/ "./src/sph/main.ts":
/*!*************************!*\
  !*** ./src/sph/main.ts ***!
  \*************************/
/*! exports provided: MainGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainGame", function() { return MainGame; });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../App */ "./src/App.ts");
/* harmony import */ var _shaders_fragments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/fragments */ "./src/shaders/fragments.ts");
/* harmony import */ var _shaders_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/vertex */ "./src/shaders/vertex.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index */ "./src/sph/index.ts");
/* harmony import */ var _parameters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parameters */ "./src/sph/parameters.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var classie = __webpack_require__(/*! ../vendors/classie */ "./src/vendors/classie.js");
/**
 * This is the entry point of any game logic
 * think of this class as the setup() loop() methods of a processing/openframeworks application
 */
var MainGame = /** @class */ (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.metaballsVelocity = [];
        _this.isSettingUp = true;
        _this._mouseInteractionEnabled = true;
        return _this;
    }
    Object.defineProperty(MainGame.prototype, "mouseInteractionEnabled", {
        get: function () {
            return this._mouseInteractionEnabled;
        },
        set: function (value) {
            this._mouseInteractionEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    MainGame.prototype.setup = function () {
        // If sphParameters is undefined
        // is undefined only the first time
        if (!this.sphParameters) {
            this.sphParameters = Object(_index__WEBPACK_IMPORTED_MODULE_3__["getParameters"])();
            this.colorPalette = _parameters__WEBPACK_IMPORTED_MODULE_4__["palettes"][0];
            this.visualizationRadius = this.sphParameters.metaballRadius;
        }
        if (!this.sphParameters)
            throw 'SPH parameters can\'t be null';
        this.sphState = Object(_index__WEBPACK_IMPORTED_MODULE_3__["initParticles"])(this.sphParameters);
        Object(_index__WEBPACK_IMPORTED_MODULE_3__["computeAcceleration"])(this.sphState, this.sphParameters);
        Object(_index__WEBPACK_IMPORTED_MODULE_3__["leapfrogStart"])(this.sphState, this.sphParameters.dt);
        // https://stackoverflow.com/questions/9046643/webgl-create-texture
        // Pass metaballs positions to the shader by using a texture 2d
        this.vertexShader = this.compileShader(_shaders_vertex__WEBPACK_IMPORTED_MODULE_2__["defaultVertextShader"], this.GL.VERTEX_SHADER);
        // each particle has 2 components
        this.shaderInfo = Object(_shaders_fragments__WEBPACK_IMPORTED_MODULE_1__["generateMetaballsShaderSource"])(this.sphState, this.sphParameters);
        this.metaballsShader = this.compileShader(this.shaderInfo.shaderSource, this.GL.FRAGMENT_SHADER);
        this.metaballsProgram = this.GL.createProgram();
        this.GL.attachShader(this.metaballsProgram, this.vertexShader);
        this.GL.attachShader(this.metaballsProgram, this.metaballsShader);
        this.GL.linkProgram(this.metaballsProgram);
        this.GL.useProgram(this.metaballsProgram);
        // Set up 4 vertices, which we'll draw as a rectangle
        // via 2 triangles
        //
        //   A---C
        //   |  /|
        //   | / |
        //   |/  |
        //   B---D
        // Normalize device coordinates space
        // http://www.learnopengles.com/understanding-opengls-matrices/
        var vertexData = new Float32Array([
            -1.0, 1.0,
            -1.0, -1.0,
            1.0, 1.0,
            1.0, -1.0
        ]);
        this.vertexBuffer = this.GL.createBuffer();
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.vertexBuffer);
        this.GL.bufferData(this.GL.ARRAY_BUFFER, vertexData, this.GL.STATIC_DRAW);
        // To make the geometry information available in the shader as attributes, we
        // need to tell WebGL what the layout of our data in the vertex buffer is.
        // const positionHandle = this.getAttribLocation(this.metaballsProgram, 'position');
        // TODO(DONE): Always have vertex attrib 0 array enabled to prevent the browser to do complicated emulation when running on desktop OpenGL (e.g. on Mac OSX). This is because in desktop OpenGL, nothing gets drawn if vertex attrib 0 is not array-enabled.
        this.GL.bindAttribLocation(this.metaballsProgram, 0, 'position');
        this.GL.enableVertexAttribArray(0);
        // in c++ this would be done by using typeof(float)
        // size in bytes per component
        var bytesPerComponent = 4; // a float 32 bits number needs 4 bytes
        var componentCount = 2; // how much components will have
        var byteSize = componentCount * bytesPerComponent;
        this.GL.vertexAttribPointer(0, componentCount, // position is a vec2
        this.GL.FLOAT, // each component is a float
        false, // don't normalize values
        byteSize, // two 4 byte float components per vertex
        0 // the stride, the distance in bytes from the end of current position to the next position
        );
        this.metaballsTexture = this.GL.createTexture();
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        var level = 0;
        var width = this.shaderInfo.textureDimensions.width;
        var height = this.shaderInfo.textureDimensions.height;
        // Note that in WebGL, contrary to OpenGL, you have to explicitly
        // call getExtension before you can use an extension,
        // like OES_texture_float. And then you want to pass
        // gl.FLOAT as the type parameter to texImage2D.
        var float_texture_ext = this.GL.getExtension('OES_texture_float');
        // TODO: Test this if not supported https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float
        // https://stackoverflow.com/questions/28827511/webgl-ios-render-to-floating-point-texture
        // https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
        if (float_texture_ext == null) {
            this.showError('OES_texture_float not supported');
            throw 'OES_texture_float not supported';
        }
        // TODO: Move this to a function which converts SystemState and SystemParameters into a chunk of texture data to
        // send positions to gpu.
        this.textureData = new Float32Array(this.sphState.pixelsCount * 4);
        Object(_index__WEBPACK_IMPORTED_MODULE_3__["getTextureData"])(this.textureData, this.sphState, this.sphParameters);
        this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, width, height, 0, this.GL.RGBA, this.GL.FLOAT, this.textureData);
        this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MAG_FILTER, this.GL.NEAREST);
        this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MIN_FILTER, this.GL.NEAREST);
        this.GL.bindTexture(this.GL.TEXTURE_2D, null);
        // Passing metaballs positions to texture unit 1 instead of the default 0 just for fun
        // For more details on texture units and texture targets see:
        // https://webgl2fundamentals.org/webgl/lessons/webgl-texture-units.html
        this.GL.activeTexture(this.GL.TEXTURE1);
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        this.GL.uniform1i(this.GL.getUniformLocation(this.metaballsProgram, 'metaballsPositions'), 1);
        // By default sets the first element on the palettes array
        this.setupColorPalette(this.colorPalette);
        this.setupVisualizationRadius(this.visualizationRadius);
        // draw triangles specified in setup() method
        this.clear();
        // this.drawMesh();
        this.isSettingUp = false;
    };
    MainGame.prototype.loop = function () {
        if (this.isSettingUp)
            return;
        this.clear();
        // console.log(this.FPS);
        // console.log(this.mousePosition);
        Object(_index__WEBPACK_IMPORTED_MODULE_3__["computeAcceleration"])(this.sphState, this.sphParameters);
        Object(_index__WEBPACK_IMPORTED_MODULE_3__["leapfrogStep"])(this.sphState, this.sphParameters.dt);
        if (this.mouseInteractionEnabled)
            // Move horizontal line by using mouse
            if (this.mousePosition) {
                var ptx = this.mousePosition.x / this.GL.drawingBufferWidth;
                var pty = 1 - (this.mousePosition.y / this.GL.drawingBufferHeight);
                Object(_index__WEBPACK_IMPORTED_MODULE_3__["reflectHorizontalLineObstacle"])(this.sphState, ptx, pty);
            }
            else {
                Object(_index__WEBPACK_IMPORTED_MODULE_3__["reflectHorizontalLineObstacle"])(this.sphState);
            }
        Object(_index__WEBPACK_IMPORTED_MODULE_3__["getTextureData"])(this.textureData, this.sphState, this.sphParameters);
        // console.log(this.FPS);
        // unit texture and texture were binded in the setup
        var level = 0;
        this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, this.shaderInfo.textureDimensions.width, this.shaderInfo.textureDimensions.height, 0, this.GL.RGBA, this.GL.FLOAT, this.textureData);
        this.drawMesh();
    };
    // onResize gets called before and after setup
    MainGame.prototype.onResize = function () {
        if (this.viewporSize == null)
            this.viewporSize = new Float32Array(2);
        // since this method gets called before the setup.
        // it is possible that the program hasn't been created yet
        if (this.metaballsProgram) {
            this.viewporSize[0] = this.GL.drawingBufferWidth;
            this.viewporSize[1] = this.GL.drawingBufferHeight;
            var viewporSizeHandle = this.getUniformLocation(this.metaballsProgram, 'viewportSize', true);
            this.GL.uniform2fv(viewporSizeHandle, this.viewporSize);
            // draw triangles specified in setup() method
            // glUniformXXX should be after glUseProgram and before drawing anything.
            // otherwise uniforms wont be updated in the shader program
        }
        if (this.metaballsProgram) {
            this.clear();
            this.drawMesh();
        }
    };
    MainGame.prototype.unload = function () {
        // remove uniforms locations cache
        _super.prototype.unload.call(this);
        // if already created release sphState arrays and other resources
        if (this.sphState) {
            Object(_index__WEBPACK_IMPORTED_MODULE_3__["freeState"])(this.sphState);
            this.sphState = null;
        }
        if (this.sphParameters) {
            Object(_index__WEBPACK_IMPORTED_MODULE_3__["freeParameters"])(this.sphParameters);
            this.sphParameters = null;
        }
        // detach currently attached shaders
        // TODO: Check if this shader is attached to current program
        this.GL.detachShader(this.metaballsProgram, this.metaballsShader);
        this.GL.detachShader(this.metaballsProgram, this.vertexShader);
        var numTextureUnits = this.GL.getParameter(this.GL.MAX_TEXTURE_IMAGE_UNITS);
        for (var unit = 0; unit < numTextureUnits; ++unit) {
            this.GL.activeTexture(this.GL.TEXTURE0 + unit);
            this.GL.bindTexture(this.GL.TEXTURE_2D, null);
        }
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, null);
        this.GL.deleteTexture(this.metaballsTexture);
        this.GL.deleteBuffer(this.vertexBuffer);
        this.GL.deleteProgram(this.metaballsProgram);
    };
    MainGame.prototype.changeSimulationParameters = function (parameters) {
        this.isSettingUp = true;
        this.unload();
        this.sphParameters = parameters;
        this.setup();
        this.onResize();
        this.isSettingUp = false;
    };
    MainGame.prototype.showError = function (message) {
        var errorDiv = document.getElementById('warning-container');
        var errorDetailsSpan = document.getElementById('error-details');
        errorDetailsSpan.innerText = message;
        classie.add(this.canvas, 'hide');
        classie.remove(errorDiv, 'hide');
    };
    /**
     * This method is called from ui/index
     * @param palette The new color palete to use
     */
    MainGame.prototype.setupColorPalette = function (palette) {
        var sky1Handler = this.getUniformLocation(this.metaballsProgram, 'palette.sky1');
        var sky2Handler = this.getUniformLocation(this.metaballsProgram, 'palette.sky2');
        var dropColorHandler = this.getUniformLocation(this.metaballsProgram, 'palette.dropColor');
        this.GL.uniform4fv(sky1Handler, palette.sky1.toArray());
        this.GL.uniform4fv(sky2Handler, palette.sky2.toArray());
        this.GL.uniform4fv(dropColorHandler, palette.dropColor.toArray());
        this.colorPalette = palette;
    };
    MainGame.prototype.setupVisualizationRadius = function (value) {
        // TODO: Cache uniform location
        var radiusHandler = this.getUniformLocation(this.metaballsProgram, 'r');
        this.GL.uniform1f(radiusHandler, value);
        this.visualizationRadius = value;
    };
    return MainGame;
}(_App__WEBPACK_IMPORTED_MODULE_0__["App"]));



/***/ }),

/***/ "./src/sph/parameters.ts":
/*!*******************************!*\
  !*** ./src/sph/parameters.ts ***!
  \*******************************/
/*! exports provided: defaultParameters, palettes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultParameters", function() { return defaultParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "palettes", function() { return palettes; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/types.ts");

/**
 * This object shouldn't be modified directly, instead use the
 * getParameters() function on sph/index.ts
 */
var defaultParameters = {
    dt: 1e-2,
    // h: 3.2e-2,
    h: 4e-1,
    maxParticleCount: -1,
    // h: 7e-1,
    // metaballRadius: 8,
    metaballRadius: 0.00625,
    rho0: 1000,
    k: 1e3,
    mu: 0.1,
    g: 9.8,
    minXAcceleration: -5,
    maxXAcceleration: 5
};
var palettes = [
    new _types__WEBPACK_IMPORTED_MODULE_0__["ColorPalette"](_types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0x02417B), _types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0x07519B), _types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0x009DFF)),
    new _types__WEBPACK_IMPORTED_MODULE_0__["ColorPalette"](_types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0x29BBAE), _types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0x0CB3A2), _types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0xC0D346)),
    new _types__WEBPACK_IMPORTED_MODULE_0__["ColorPalette"](_types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0xFF3E23), _types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0xFE3E23), _types__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromHexColor(0xFEC223))
];


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! exports provided: vec4, ColorPalette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return vec4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPalette", function() { return ColorPalette; });
var vec4 = /** @class */ (function () {
    function vec4(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 1; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    vec4.fromHexColor = function (hexColor) {
        var max = 255;
        var r = (+hexColor >> 16) / max;
        var g = ((+hexColor & 0x00FF00) >> 8) / max;
        var b = (+hexColor & 0x0000FF) / max;
        return new vec4(r, g, b);
    };
    vec4.prototype.toArray = function () {
        return [this.x, this.y, this.z, this.w];
    };
    return vec4;
}());

;
var ColorPalette = /** @class */ (function () {
    /**
     *
     * @param sky1 Background's horizontal linear gradient start color
     * @param sky2 Background's horizontal linear gradient end color
     * @param dropColor Color of the water drop
     */
    function ColorPalette(sky1, sky2, dropColor) {
        this.sky1 = sky1;
        this.sky2 = sky2;
        this.dropColor = dropColor;
    }
    return ColorPalette;
}());

;
;
;
;


/***/ }),

/***/ "./src/ui/index.ts":
/*!*************************!*\
  !*** ./src/ui/index.ts ***!
  \*************************/
/*! exports provided: initUI, loopUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initUI", function() { return initUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loopUI", function() { return loopUI; });
/* harmony import */ var _sph_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sph/index */ "./src/sph/index.ts");
/* harmony import */ var _sph_parameters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sph/parameters */ "./src/sph/parameters.ts");


var classie = __webpack_require__(/*! ../vendors/classie */ "./src/vendors/classie.js");
var body;
var openButton;
var resetButton;
var container;
var canvas;
var colorPairs;
var particleRadiusInput;
var particlesCountInput;
var mouseInteractionInput;
var fpsInfo;
var mainGame;
var state = {
    /**
     * Is settings menu opened
     */
    isOpen: false,
    prevColorPaletteIndex: 0,
    colorPaletteIndex: 0,
    currentPalette: _sph_parameters__WEBPACK_IMPORTED_MODULE_1__["palettes"][0],
    particleRadiusComputing: 0.07,
    particleRadiusVisualization: 0.00625,
    maxParticleCount: 100
};
// this is the entry point for the ui logic
// TODO: Decide wheter use App or MainGame class
function initUI(simulation) {
    mainGame = simulation;
    body = document.body;
    openButton = document.getElementById('open-button');
    container = document.querySelector('.container-fluid');
    canvas = document.getElementById('mainCanvas');
    fpsInfo = document.getElementById('fps-info');
    particleRadiusInput = document.getElementById('particle-radius-visualization-setup');
    particlesCountInput = document.getElementById('particles-count');
    mouseInteractionInput = document.getElementById('enable-mouse-interaction');
    resetButton = document.getElementById('apply-button');
    var parameters = Object(_sph_index__WEBPACK_IMPORTED_MODULE_0__["getParameters"])();
    particleRadiusInput.value = parameters.metaballRadius + '';
    // particlesCountInput.value = parameters.h+'';
    colorPairs = [
        document.getElementById('color-option-1'),
        document.getElementById('color-option-2'),
        document.getElementById('color-option-3'),
    ];
    initEvents();
}
function loopUI() {
    if (mainGame)
        fpsInfo.innerHTML = mainGame.FPS.toFixed(2);
}
function updateColorPalette() {
    mainGame.setupColorPalette(state.currentPalette);
}
function updateParticleRadiusVisualization() {
    var value = +particleRadiusInput.value;
    mainGame.setupVisualizationRadius(value);
}
function initEvents() {
    openButton.addEventListener('click', toggleMenu);
    // close the menu element if the target it´s not the menu element or one of its descendants..
    container.addEventListener('click', function (event) {
        var target = event.target;
        if (state.isOpen && target === canvas) {
            toggleMenu();
        }
    });
    colorPairs.forEach(function (element) {
        element.addEventListener('click', selectColorPalette, false);
    });
    // On value change
    particleRadiusInput.addEventListener('input', updateParticleRadiusVisualization);
    particlesCountInput.addEventListener('input', onReset);
    mouseInteractionInput.addEventListener('input', mouseInteractionChange);
    resetButton.addEventListener('click', onReset);
}
function selectColorPalette(event) {
    var target = event.target;
    var idx = +target.getAttribute('data-position');
    state.colorPaletteIndex = idx;
    // remove the color-pair-selected class to all color paletes
    classie.remove(colorPairs[state.prevColorPaletteIndex], 'color-pair-selected');
    classie.add(colorPairs[state.colorPaletteIndex], 'color-pair-selected');
    state.prevColorPaletteIndex = state.colorPaletteIndex;
    state.currentPalette = _sph_parameters__WEBPACK_IMPORTED_MODULE_1__["palettes"][state.colorPaletteIndex];
    updateColorPalette();
}
function mouseInteractionChange() {
    mainGame.mouseInteractionEnabled = mouseInteractionInput.checked;
}
function onReset() {
    // I know i'm not checking the values on those inputs but come on, this is not a bank application
    var newParameters = Object.assign(Object(_sph_index__WEBPACK_IMPORTED_MODULE_0__["getParameters"])(), {
        h: +particlesCountInput.value
    });
    mainGame.changeSimulationParameters(newParameters);
}
function toggleMenu() {
    if (state.isOpen) {
        classie.remove(body, 'show-menu');
    }
    else {
        classie.add(body, 'show-menu');
    }
    state.isOpen = !state.isOpen;
}


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: isMobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/**
 * Function extracted from http://detectmobilebrowsers.com/
 */
function isMobile() {
    var agent = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4)))
        return true;
    else
        return false;
}


/***/ }),

/***/ "./src/vendors/classie.js":
/*!********************************!*\
  !*** ./src/vendors/classie.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( true ) {
  // AMD
  !(__WEBPACK_AMD_DEFINE_FACTORY__ = (classie),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})( window );


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYWRlcnMvZnJhZ21lbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL3ZlcnRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BoL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zcGgvaW5kaWNhdG9yc0Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BoL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwaC9wYXJhbWV0ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy92ZW5kb3JzL2NsYXNzaWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7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QUFBLG9HQUFFO0FBQ25CLENBQUMsTUFBTSxFQU1OOztBQUVELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHsgUG9zaXRpb24sIFVuaWZvcm1Mb2NhdGlvbnNDYWNoZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgYmFzZSBjbGFzcyBpcyB0aGUgaW50ZXJmYWNlIHdpdGggdGhlIGluZGV4LnRzIGZpbGVcclxuICogd2hpY2ggd2lsbCBhbGxvdyB0byB0aGUgYXBwbGljYXRpb24gdG8gZ2V0IHRoZSBnbCBjb250ZXh0IGFuZCB1dGlsaXRpZXMgdGltaW5nIHByb3BlcnRpZXNcclxuICogYXMgdGltZSBhbmQgZGVsdGEgdGltZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBcclxue1xyXG4gICAgLy8gVE9ETzogQWRkIHRpbWUgYW5kIGRlbHRhIHRpbWUgZmllbGQgdG8gdGhpcyBjbGFzc1xyXG4gICAgcHJvdGVjdGVkIEdMOldlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxuICAgIHByb3RlY3RlZCBjYW52YXM6SFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSB1bmlmb3JtTG9jYXRpb25zOiBVbmlmb3JtTG9jYXRpb25zQ2FjaGUgPSB7fTtcclxuXHJcbiAgICBtb3VzZVBvc2l0aW9uOlBvc2l0aW9uID0gbnVsbDtcclxuICAgIEZQUzpudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFRpbWUgaW4gbXMgc2luY2UgbGFzdCBmcmFtZVxyXG4gICAgICovXHJcbiAgICBkZWx0YVRpbWU6bnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbGFwc2VkIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgKi9cclxuICAgIGVsYXBzZWRUaW1lOm51bWJlcjtcclxuICAgIHB1YmxpYyBhc3BlY3RSYXRpbzpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihnbENvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgY2FudmFzRWxlbWVudDpIVE1MQ2FudmFzRWxlbWVudCwgYXNwZWN0UmF0aW86bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5HTCA9IGdsQ29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5hc3BlY3RSYXRpbyA9IGFzcGVjdFJhdGlvO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXRpbGl0eSBtZXRob2QgdG8gdGhyb3cgYW4gZXJyb3IgaWYgc2hhZGVyIGNvbXBpbGF0aW9uIGZhaWxzXHJcbiAgICAgKi9cclxuICAgIGNvbXBpbGVTaGFkZXIoc2hhZGVyU291cmNlOnN0cmluZywgc2hhZGVyVHlwZTphbnkpOldlYkdMU2hhZGVyIHtcclxuICAgICAgICBjb25zdCBzaGFkZXIgPSB0aGlzLkdMLmNyZWF0ZVNoYWRlcihzaGFkZXJUeXBlKTtcclxuICAgICAgICB0aGlzLkdMLnNoYWRlclNvdXJjZShzaGFkZXIsIHNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5HTC5jb21waWxlU2hhZGVyKHNoYWRlcik7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5HTC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLkdMLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBcIlNoYWRlciBjb21waWxlIGZhaWxlZCB3aXRoOiBcIiArIHRoaXMuR0wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNoYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFV0aWxpdHkgdG8gdGhyb3cgZXJyb3IgaWYgdGhlIGF0dHJpYnV0ZSB3YXMgbm90IGZvdW5kXHJcbiAgICAgKiBAcGFyYW0gcHJvZ3JhbSBcclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBnZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtOldlYkdMUHJvZ3JhbSwgbmFtZTpzdHJpbmcpOm51bWJlciB7XHJcbiAgICAgICAgdmFyIGF0dHJpYnV0ZUxvY2F0aW9uID0gdGhpcy5HTC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcclxuICAgICAgICBpZiAoYXR0cmlidXRlTG9jYXRpb24gPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdDYW4gbm90IGZpbmQgYXR0cmlidXRlICcgKyBuYW1lICsgJy4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXR0cmlidXRlTG9jYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW06V2ViR0xQcm9ncmFtLCBuYW1lOnN0cmluZywgaWdub3JlRXJyb3JzOmJvb2xlYW4gPSBmYWxzZSk6V2ViR0xVbmlmb3JtTG9jYXRpb24ge1xyXG4gICAgICAgIGxldCB1bmlmb3JtTG9jYXRpb24gPSB0aGlzLnVuaWZvcm1Mb2NhdGlvbnNbbmFtZV07XHJcbiAgICAgICAgaWYgKCF1bmlmb3JtTG9jYXRpb24pIHtcclxuICAgICAgICAgICB1bmlmb3JtTG9jYXRpb24gPSB0aGlzLkdMLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcclxuICAgICAgICAgICBpZiAodW5pZm9ybUxvY2F0aW9uID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgIGlmICghaWdub3JlRXJyb3JzKSB0aHJvdyAnQ2FuIG5vdCBmaW5kIHVuaWZvcm0gJyArIG5hbWUgKyAnLic7XHJcbiAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgLy8gSWYgbm8gZXJyb3JzIGNhY2hlIHRoZSB1bmlmb3JtIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgIHRoaXMudW5pZm9ybUxvY2F0aW9uc1tuYW1lXSA9IHVuaWZvcm1Mb2NhdGlvbjtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmlmb3JtTG9jYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXIoKTp2b2lkIHtcclxuICAgICAgICB0aGlzLkdMLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgICB0aGlzLkdMLmNsZWFyKHRoaXMuR0wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgLy8gdGhpcy5HTC5kcmF3QXJyYXlzKHRoaXMuR0wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNZXNoKCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5HTC5kcmF3QXJyYXlzKHRoaXMuR0wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICNyZWdpb24gQVBJIE1ldGhvZHNcclxuICAgIHB1YmxpYyBzZXR1cCgpOnZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5sb2FkKCk6dm9pZCB7XHJcbiAgICAgICAgLy8gcmVtb3ZlcyBwcmV2aW91c2x5IGNhY2hlZCB1bmlmb3JtIGxvY2F0aW9uc1xyXG4gICAgICAgIHRoaXMudW5pZm9ybUxvY2F0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb29wKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblJlc2l6ZSgpOnZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIC8vICNlbmRyZWdpb24gQVBJIE1ldGhvZHNcclxufSIsImltcG9ydCB7IE1haW5HYW1lIH0gZnJvbSAnLi9zcGgvbWFpbic7XHJcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vQXBwJztcclxuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgaW5pdFVJLCBsb29wVUkgfSBmcm9tICcuL3VpL2luZGV4JztcclxuaW1wb3J0IHsgaXNNb2JpbGUgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG5sZXQgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxubGV0IGdhbWU6IEFwcDtcclxubGV0IGVsYXBzZWRUaW1lOiBudW1iZXIgPSAwO1xyXG5sZXQgcHJldmlvdXNUaW1lOiBudW1iZXIgPSAwO1xyXG5sZXQgZGVsdGFUaW1lOiBudW1iZXIgPSAwO1xyXG5sZXQgbWF4V2lkdGg6bnVtYmVyO1xyXG5cclxuXHJcblxyXG4vLyAjcmVnaW9uIGVuZ2luZSBsb2dpY1xyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluQ2FudmFzJyk7XHJcbiAgICAvLyBJbml0aWFsaXNlIFdlYkdMIFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFnbCkge1xyXG4gICAgICAgIGFsZXJ0KCdJdCBzZWVtcyBsaWtlIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0cyB3ZWJnbCcpO1xyXG4gICAgICAgIHRocm93IFwiQ2Fubm90IGNyZWF0ZSB3ZWJnbCBjb250ZXh0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogVGhpcyBpcyBhIGJhZCBwcmFjdGljZSwgc2VlIGhlcmUgaG93IHRvIGNyZWF0ZSBhIGZ1bGwgc2NyZWVlbiBjYW52YXMgaHR0cHM6Ly93ZWJnbGZ1bmRhbWVudGFscy5vcmcvd2ViZ2wvbGVzc29ucy93ZWJnbC1hbnRpLXBhdHRlcm5zLmh0bWxcclxuICAgIC8vIGh0dHBzOi8vd2ViZ2xmdW5kYW1lbnRhbHMub3JnL3dlYmdsL3dlYmdsLXNhbWUtY29kZS1jYW52YXMtZnVsbHNjcmVlbi5odG1sXHJcbiAgICBjb25zdCByYXRpbyA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgLy8gQWRkIGNvbmRpdGlvbmFsIGluaXRpYWwgd2lkdGggYmFzZWQgb24gZGV2aWNlXHJcbiAgICAvLyAxOTIwIGZvciBkZXNrdG9wcyBhbmQgc21hbGxlciByZXNvbHV0aW9ucyBmb3Igb3RoZXJzIGRldmljZXNcclxuICAgIC8vIFRPRE86IENoZWNrIHdoeSB0aGUgc2ltdWxhdGlvbiBkb2VzIG5vdCBydW4gb24gYW5kcm9pZCBlbXVsYXRvciBhbmQgc29tZSBhbmRyb2lkIGRldmljZXNcclxuICAgIC8vIG1heWJlLCBpdCdzIGR1ZSB0byBoaWdocCB1c3NhZ2U/IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VzL2RvY3MvV2ViL0FQSS9XZWJHTF9BUEkvV2ViR0xfYmVzdF9wcmFjdGljZXNcclxuICAgIC8vIFRPRE86IFVzZSBpc01vYmlsZSgpIGZ1bmN0aW9uIHRvIGNoYW5nZSBzaW11bGF0aW9uIHBhcmFtZXRlcnNcclxuICAgIGlmIChpc01vYmlsZSgpKVxyXG4gICAgICAgIG1heFdpZHRoID0gNjQwO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIG1heFdpZHRoID0gMTkyMDtcclxuXHJcbiAgICAvLyBzZXRzIHJlbmRlciBidWZlciBzaXplXHJcbiAgICBjYW52YXMud2lkdGggPSBtYXhXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMud2lkdGggLyByYXRpbztcclxuXHJcbiAgICAvLyBNYWluR2FtZSBpbmhlcml0cyBmcm9tIEFwcCwgdXNpbmcgc29tZSBwb2x5bW9ycGhpc21cclxuICAgIC8vIHRvIGVuc3VyZSBub3QgdG8gaW50ZXJhY3Qgd2l0aCBoaWdoIGxldmVsIGNvbXBvbmVudHMgb2YgdGhlIHByb2dyYW1cclxuICAgIGNvbnN0IHNpbXVsYXRpb24gPSBuZXcgTWFpbkdhbWUoZ2wsIGNhbnZhcywgcmF0aW8pO1xyXG4gICAgZ2FtZSA9IHNpbXVsYXRpb247XHJcblxyXG4gICAgLy8gVE9ETzogQ3JlYXRlIGEgbWV0aG9kIHRvIGNoYW5nZSBzaW11bGF0aW9uIHBhcmFtZXRlcnNcclxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICB1cGRhdGVWaWV3cG9ydCgpO1xyXG4gICAgZ2FtZS5zZXR1cCgpO1xyXG4gICAgdXBkYXRlVmlld3BvcnQoKTtcclxuICAgIHJlbmRlcigwKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIGpxdWVyeSwgcmVkdXgsIGV0YyBsb2dpY1xyXG4gICAgaW5pdFVJKHNpbXVsYXRpb24pO1xyXG59XHJcbi8qKlxyXG4gKiBUaGUgbG9vcCBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gcmVuZGVyKG5vdzogbnVtYmVyKSB7XHJcbiAgICBlbGFwc2VkVGltZSA9IG5vdztcclxuICAgIGRlbHRhVGltZSA9IGVsYXBzZWRUaW1lIC0gcHJldmlvdXNUaW1lO1xyXG5cclxuICAgIC8vIFNlZSB0aGlzIHRvIGNvbXB1dGUgdGhlIGRlbHRhIHRpbWUgYW5kIHRoZSBlbGFwc2VkIGJ5IHVzaW5nXHJcbiAgICAvLyB0aGUgcmVxdWVzdCBhbmltYXRpb24gZnJhbWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjU2MTI0NTIvaHRtbDUtY2FudmFzLWdhbWUtbG9vcC1kZWx0YS10aW1lLWNhbGN1bGF0aW9uc1xyXG4gICAgZ2FtZS5GUFMgPSAxMDAwIC8gZGVsdGFUaW1lO1xyXG4gICAgZ2FtZS5lbGFwc2VkVGltZSA9IGVsYXBzZWRUaW1lO1xyXG4gICAgZ2FtZS5kZWx0YVRpbWUgPSBkZWx0YVRpbWU7XHJcbiAgICBwcmV2aW91c1RpbWUgPSBlbGFwc2VkVGltZTtcclxuICAgIGdhbWUubG9vcCgpO1xyXG5cclxuICAgIGxvb3BVSSgpO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbn1cclxuZnVuY3Rpb24gb25SZXNpemUoKSB7XHJcbiAgICAvLyBTdXBwb3J0ZWQgY2FzZXMgaW4gd2hpY2ggY2FudmFzIHNob3VsZCBiZSBva2F5XHJcbiAgICAvLyAxLiBOYXZpZ2F0b3Igc3RhcnRzIHpvb21lZC1vdXQgKGUuZzogMjUlKTogQ2FudmFzIHdpZHRoIHdpbGwgYmUgY2xhbXBlZCBhdCAxOTIwLCBzbyBpdCB3b250IGNyZWF0ZSBhIDRrIGNhbnZhcywgZ2FtZSB3aWxsIGxvb2sgZmluZS5cclxuICAgIC8vIDIuIE5hdmlnYXRvciBzdGFydHMgem9vbWVkLWluIChlLmc6IDUwMCUpOiBDYW52YXMgd2lkdGggd2lsbCBzdGFydCBhdCAxOTIwLCBnYW1lIHdpbGwgbG9vayBmaW5lLlxyXG4gICAgLy8gMy4gTmF2aWdhdG9yIHN0YXJ0cyBub3JtYWwtem9tbWVkIGFuZCBkdXJpbmcgZ2FtZXBsYXkgdXNlciBkbyB6b29tLWluOiBHYW1lIHdpbGwgbG9vayBibHVycnkgYXQgaGlnaCB6b29tIHZhbHVlc1xyXG4gICAgLy8gNC4gTmF2aWdhdG9yIHN0YXJ0cyBub3JtYWwtem9tbWVkIGFuZCBkdXJpbmcgZ2FtZXBsYXkgdXNlciBkbyB6b29tLW91dDogQ2FudmFzIHdpZHRoIHdpbGwgYmUgY2xhbXBlZCBhdCAxOTIwLCBnYW1lIHdpbGwgbG9vayBmaW5lXHJcblxyXG4gICAgLy8gZml4IHRoZSBhbnRpIHBhdHRlcm5zXHJcbiAgICAvLyBodHRwczovL3dlYmdsZnVuZGFtZW50YWxzLm9yZy93ZWJnbC9sZXNzb25zL3dlYmdsLWFudGktcGF0dGVybnMuaHRtbFxyXG4gICAgaWYgKHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzKSlcclxuICAgICAgICB1cGRhdGVWaWV3cG9ydCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVZpZXdwb3J0KCkge1xyXG4gICAgY29uc3QgeCA9IDA7XHJcbiAgICBjb25zdCB5ID0gMDtcclxuICAgIC8vIGh0dHBzOi8vd2ViZ2xmdW5kYW1lbnRhbHMub3JnL3dlYmdsL2xlc3NvbnMvd2ViZ2wtcmVzaXppbmctdGhlLWNhbnZhcy5odG1sXHJcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzk1MDEwNS9ob3ctdG8tbWFpbnRhaW4td2ViZ2wtY2FudmFzLWFzcGVjdC1yYXRpb1xyXG4gICAgZ2wudmlld3BvcnQoeCwgeSwgZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0KTtcclxuICAgIGdhbWUub25SZXNpemUoKTtcclxufVxyXG5cclxuLyoqXHJcbiAgICogUmVzaXplIGEgY2FudmFzIHRvIG1hdGNoIHRoZSBzaXplIGl0cyBkaXNwbGF5ZWQuXHJcbiAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzIFRoZSBjYW52YXMgdG8gcmVzaXplLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbXVsdGlwbGllcl0gYW1vdW50IHRvIG11bHRpcGx5IGJ5LlxyXG4gICAqICAgIFBhc3MgaW4gd2luZG93LmRldmljZVBpeGVsUmF0aW8gZm9yIG5hdGl2ZSBwaXhlbHMuXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgY2FudmFzIHdhcyByZXNpemVkLlxyXG4gICAqIEBtZW1iZXJPZiBtb2R1bGU6d2ViZ2wtdXRpbHNcclxuICAgKi9cclxuZnVuY3Rpb24gcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShjYW52YXM6SFRNTENhbnZhc0VsZW1lbnQsIG11bHRpcGxpZXI6bnVtYmVyPTEpIHtcclxuICAgIC8vIEknbSBjb25zdHJhaW5pbmcgbWF4IHJlbmRlciBidWZmZXIgd2lkdGggYmVjYXVzZSB3aGVuIGJyb3dzZXIgaXMgem9vbWVkIG91dCBjYW52YXMgY291bGQgZ2V0IHRvbyBiaWcgc2l6ZXNcclxuICAgIC8vIGNhbnZhcy5jbGllbnRXaWR0aCBpcyBiZWluZyBtb2RpZmllZCBieSBjc3MgcnVsZXNcclxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4oY2FudmFzLmNsaWVudFdpZHRoICogbXVsdGlwbGllciB8IDAsIG1heFdpZHRoKTtcclxuICAgIGNvbnN0IHJhdGlvID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAvLyBjb25zdCBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0ICogbXVsdGlwbGllciB8IDA7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB3aWR0aCAvIHJhdGlvO1xyXG4gICAgaWYgKGNhbnZhcy53aWR0aCAhPT0gd2lkdGggfHwgY2FudmFzLmhlaWdodCAhPT0gaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NpemUgY2hhbmdlZCcpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgZXZ0OiBhbnkpOiBQb3NpdGlvbiB7XHJcbiAgICBpZiAoIWV2dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRNb3VzZVBvcygpIGRpZG5cXCd0IHJlY2VpdmVkIGFuIGV2dCBhcmd1bWVudCcpO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxyXG4gICAgICAgIHk6IGV2dC5jbGllbnRZIC0gcmVjdC50b3BcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xyXG4gICAgLy8gbW91c2UgcG9zaXRpb24gb24gaW5uZXIgd2luZG93IHNjcmVlbiBjb29yZGluYXRlIHN5c3RlbVxyXG4gICAgY29uc3QgbW91c2VQb3NpdGlvbiA9IGdldE1vdXNlUG9zKGNhbnZhcywgZXZlbnQpO1xyXG4gICAgLy8gVHJhbmZvcm0gbW91c2UgcG9zaXRpb24gZnJvbSB3aW5kb3cgY29vcmRpbmF0ZXMgdG8gY2FudmFzIGNvb3JkaW5hdGVzXHJcbiAgICBjb25zdCBtb3VzZVBvc2l0aW9uQ2FudmFzID0ge1xyXG4gICAgICAgIHg6IChtb3VzZVBvc2l0aW9uLnggLyBjYW52YXMuY2xpZW50V2lkdGgpICogZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLFxyXG4gICAgICAgIHk6IChtb3VzZVBvc2l0aW9uLnkgLyBjYW52YXMuY2xpZW50SGVpZ2h0KSAqIGdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKG1vdXNlUG9zaXRpb24sIG1vdXNlUG9zaXRpb25DYW52YXMpO1xyXG4gICAgZ2FtZS5tb3VzZVBvc2l0aW9uID0gbW91c2VQb3NpdGlvbkNhbnZhcztcclxufVxyXG4vLyBMaXN0ZW4gZm9yIHdpbmRvdyByZXNpemUgZXZlbnRzXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XHJcbi8vIEluaXRpYWxpemUgYXBwbGljYXRpb25cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0KTtcclxuLy8gI2VuZHJlZ2lvbiBlbmdpbmUgbG9naWNcclxuIiwiaW1wb3J0IHsgTWV0YWJhbGxzU2hhZGVySW5mbywgU3lzdGVtU3RhdGUsIFN5c3RlbVBhcmFtZXRlcnMgfSBmcm9tICcuLi90eXBlcyc7XHJcbi8vIFRPRE86IFBhc3MgcGFydGljbGUgdmVsb2NpdHlcclxuLy8gVE9ETzogUGFzcyBjb2xvciBwcmVzZXRzXHJcbi8vIFRPRE86IFN1cHBvcnQgY2hhbmdlIG9mIG51bWJlciBvZiBwYXJ0aWNsZXMgZnJvbSB0aGUgZ3VpXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNZXRhYmFsbHNTaGFkZXJTb3VyY2Uoc3RhdGU6U3lzdGVtU3RhdGUsIHBhcmFtczpTeXN0ZW1QYXJhbWV0ZXJzKTpNZXRhYmFsbHNTaGFkZXJJbmZvIHtcclxuICAgIGNvbnN0IHsgcGl4ZWxzQ291bnQsIG46IHBhcnRpY2xlc0NvdW50fSA9IHN0YXRlO1xyXG4gICAgY29uc3QgcmFkaXVzID0gcGFyYW1zLm1ldGFiYWxsUmFkaXVzO1xyXG4gICAgLy8gY2hlY2tzIGlmIG1ldGFiYWxscyBjb3VudCBpcyBhIHBvd2VyIG9mIDJcclxuICAgIGNvbnN0IGNvdW50TG9nMiA9IE1hdGgubG9nMihwaXhlbHNDb3VudCk7XHJcbiAgICBpZiAoKGNvdW50TG9nMiAtIE1hdGguZmxvb3IoY291bnRMb2cyKSkgPiAwKSB7XHJcbiAgICAgICAgdGhyb3cgJ3BpeGVsc0NvdW50IGFyZ3VtZW50IG11c3QgYmUgYSBwb3dlciBvZiB0d28nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRleHR1cmUgd29uJ3QgYmUgYWx3YXlzIHNxdWFyZSB0ZXh0dXJlc1xyXG4gICAgY29uc3QgaGFsZkxvZyA9IGNvdW50TG9nMiAvIDI7XHJcbiAgICBjb25zdCB3aWR0aCA9IDIgKiogTWF0aC5mbG9vcihoYWxmTG9nKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IDIgKiogTWF0aC5jZWlsKGhhbGZMb2cpO1xyXG4gICAgLy8gRE9ORTogQWRkIGEgdGFpbCBpbiB0aGUgb3Bvc2l0ZSBkaXJlY3Rpb24gb2YgdGhlIHBhcnRpY2xlIHZlbG9jaXR5XHJcbiAgICAvLyAjcmVnaW9uIFNoYWRlciBTb3VyY2VcclxuICAgIGNvbnN0IHNoYWRlclNvdXJjZSA9IGBcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG51bmlmb3JtIHZlYzIgdmlld3BvcnRTaXplO1xyXG4vLyBFYWNoIHBpeGVsIGluIHRoaXMgaW1hZ2UgaXMgYSBtZXRhYmFsbCBwb3NpdGlvblxyXG4vLyB0aGUgcG9zaXRpb24gd2lsbCBiZSBlbmNvZGVkIGluIHRoZSByZyBjb21wb25lbnRzIGFuZCB0aGUgcmFkaXVzXHJcbi8vIHdpbGwgYmUgZW5jb2RlZCBpbiB0aGUgYiBjb21wb25lbnQgdGhlcmVmb3JlIGlnbm9yaW5nXHJcbi8vIGEgY29tcG9uZW50LlxyXG51bmlmb3JtIHNhbXBsZXIyRCBtZXRhYmFsbHNQb3NpdGlvbnM7XHJcblxyXG5jb25zdCBpbnQgd2lkdGggPSAke3dpZHRofTtcclxuY29uc3QgaW50IGhlaWdodCA9ICR7aGVpZ2h0fTtcclxuLy8gY29uc3QgZmxvYXQgciA9ICR7cmFkaXVzLnRvRml4ZWQoMSl9OyAvLyBwYXJ0aWNsZSByYWRpdXNcclxuLy8gdW5pZm9ybSBmbG9hdCByID0gJHtyYWRpdXN9OyAvLyBwYXJ0aWNsZSByYWRpdXNcclxudW5pZm9ybSBmbG9hdCByOyAvLyBwYXJ0aWNsZSByYWRpdXNcclxuY29uc3QgaW50IHBhcnRpY2xlc0NvdW50ID0gJHtwYXJ0aWNsZXNDb3VudH07XHJcblxyXG5zdHJ1Y3QgQ29sb3JQYWxldHRlIHtcclxuICAgIHZlYzQgc2t5MTtcclxuICAgIHZlYzQgc2t5MjtcclxuICAgIHZlYzQgZHJvcENvbG9yO1xyXG59O1xyXG5cclxudW5pZm9ybSBDb2xvclBhbGV0dGUgcGFsZXR0ZTtcclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICAgIHZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkgLyB2aWV3cG9ydFNpemUueHk7XHJcblxyXG4gICAgdmVjNCBza3kxID0gcGFsZXR0ZS5za3kxO1xyXG4gICAgdmVjNCBza3kyID0gcGFsZXR0ZS5za3kyO1xyXG4gICAgdmVjNCBiYXNlQ29sb3IgPSBtaXgoc2t5MSwgc2t5MiwgdXYueCk7XHJcblxyXG4gICAgZmxvYXQgcnIgPSByICogdmlld3BvcnRTaXplLng7XHJcblxyXG4gICAgLy8gSXRlcmF0ZSBtZXRhYmFsbHNcclxuICAgIGZsb2F0IHYgPSAwLjA7XHJcbiAgICBpbnQgY3VycmVudFBpeGVsID0gMDtcclxuICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCsrY3VycmVudFBpeGVsID4gcGFydGljbGVzQ291bnQpIGJyZWFrO1xyXG4gICAgICAgICAgICB2ZWMyIHBvc2l0aW9uVXYgPSB2ZWMyKGZsb2F0KGkpIC8gZmxvYXQod2lkdGgpLCBmbG9hdChqKSAvIGZsb2F0KGhlaWdodCkpO1xyXG4gICAgICAgICAgICB2ZWM0IG1ldGFiYWxsUG9zaXRpb24gPSB0ZXh0dXJlMkQobWV0YWJhbGxzUG9zaXRpb25zLCBwb3NpdGlvblV2KTtcclxuICAgICAgICAgICAgZmxvYXQgZHggPSBtZXRhYmFsbFBvc2l0aW9uLnggKiB2aWV3cG9ydFNpemUueCAtIGdsX0ZyYWdDb29yZC54O1xyXG4gICAgICAgICAgICBmbG9hdCBkeSA9IG1ldGFiYWxsUG9zaXRpb24ueSAqIHZpZXdwb3J0U2l6ZS55IC0gZ2xfRnJhZ0Nvb3JkLnk7XHJcbiAgICAgICAgICAgIHYgKz0gcnIqcnIvKGR4KmR4ICsgZHkqZHkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBzcGVlZCB0YWlsXHJcbiAgICAgICAgICAgIC8vIHNwZWVkIHRhaWwgcG9pbnQgMVxyXG4gICAgICAgICAgICBmbG9hdCB0YWlsUiA9IHJyICogMC43O1xyXG4gICAgICAgICAgICB2ZWMyIHZlbG9jaXR5ID0gLW1ldGFiYWxsUG9zaXRpb24uenc7XHJcbiAgICAgICAgICAgIHZlYzIgdmVsb2NpdHlEaXJlY3Rpb24gPSBub3JtYWxpemUodmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBmbG9hdCBzcGVlZCA9IGxlbmd0aCh2ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgIHZlYzIgdmVsb2NpdHlUYWlsID0gdmVsb2NpdHlEaXJlY3Rpb24gKiByICogc3BlZWQ7XHJcbiAgICAgICAgICAgIGZsb2F0IGR4diA9IGR4ICsgdmVsb2NpdHlUYWlsLng7XHJcbiAgICAgICAgICAgIGZsb2F0IGR5diA9IGR5ICsgdmVsb2NpdHlUYWlsLnk7XHJcbiAgICAgICAgICAgIHYgKz0gdGFpbFIqdGFpbFIvKGR4dipkeHYgKyBkeXYqZHl2KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNwZWVkIHRhaWwgcG9pbnQgMlxyXG4gICAgICAgICAgICBmbG9hdCB0YWlsUjIgPSByciAqIDAuNTtcclxuICAgICAgICAgICAgdmVjMiB2ZWxvY2l0eVRhaWwyID0gdmVsb2NpdHlEaXJlY3Rpb24gKiAociArIHRhaWxSKSAqIHNwZWVkO1xyXG4gICAgICAgICAgICBmbG9hdCBkeHYyID0gZHggKyB2ZWxvY2l0eVRhaWwyLng7XHJcbiAgICAgICAgICAgIGZsb2F0IGR5djIgPSBkeSArIHZlbG9jaXR5VGFpbDIueTtcclxuICAgICAgICAgICAgdiArPSB0YWlsUjIqdGFpbFIyLyhkeHYyKmR4djIgKyBkeXYyKmR5djIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodiA+IDEuMCkge1xyXG4gICAgICAgIGJhc2VDb2xvciA9IHBhbGV0dGUuZHJvcENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdsX0ZyYWdDb2xvciA9IGJhc2VDb2xvcjtcclxufVxyXG4gICAgYDtcclxuICAgIC8vICNlbmRyZWdpb24gU2hhZGVyIFNvdXJjZVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2hhZGVyU291cmNlOiBzaGFkZXJTb3VyY2UsXHJcbiAgICAgICAgdGV4dHVyZURpbWVuc2lvbnM6IHtcclxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8vIFRoZSBnbHNsY29tcGlsZXIgd291bGQgc3RyaXAgb3V0IHRoZSB1bnVzZWQgdmFyaWFibGVzIGhlbmNlIHRoZWlyIGxvY2F0aW9ucyB3aWxsIGJlIC0xLiBUbyByZXNvbHZlIHRoaXMsIHlvdSBtdXN0IHVzZSB0aGUgdmFyaWFibGUgYXQgaGFuZC4gSW4geW91ciBjYXNlLCB5b3UgYXJlIG5vdCB1c2luZyB0aGUgc3BfY2xvdWQgYW5kIHNwX2J1bXAgc2FtcGxlcnMgaGVuY2UgdGhlaXIgbG9jYXRpb25zIHdpbGwgYmUgLTEuXHJcbi8vIFRvIHJlc29sdmUgdGhpcywgdSBtdXN0IHVzZSB0aGUgc2FtcGxlciBpbiB0aGUgc2hhZGVyLlxyXG4vLyBBbm90aGVyIHRoaW5nLCB5b3UgZG9udCBoYXZlIHRvIGRlY2xhcmUgYSB1bmlmb3JtIGluIHRoZSB2ZXJ0ZXggc2hhZGVyIGlmIHRoYXQgdW5pZm9ybSBpcyBvbmx5IHVzZWQgaW4gdGhlIGZyYWdtZW50IHNoYWRlci5cclxuLy8gVGhlbiBpZiBpIGRvbid0IHVzZSB2aWV3cG9ydFNpemUgaW4gdGhlIHNoYWRlciBpdCB3b250IGhhdmUgYSBsb2NhdGlvblxyXG5leHBvcnQgY29uc3QgbWV0YWJhbGxTaGFkZXI6c3RyaW5nID0gYFxyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbnVuaWZvcm0gdmVjMiB2aWV3cG9ydFNpemU7XHJcbi8vIEVhY2ggcGl4ZWwgaW4gdGhpcyBpbWFnZSBpcyBhIG1ldGFiYWxsIHBvc2l0aW9uXHJcbi8vIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGVuY29kZWQgaW4gdGhlIHJnIGNvbXBvbmVudHMgYW5kIHRoZSByYWRpdXNcclxuLy8gd2lsbCBiZSBlbmNvZGVkIGluIHRoZSBiIGNvbXBvbmVudCB0aGVyZWZvcmUgaWdub3JpbmdcclxuLy8gYSBjb21wb25lbnQuXHJcbnVuaWZvcm0gc2FtcGxlcjJEIG1ldGFiYWxsc1Bvc2l0aW9ucztcclxuLy8gVE9ETzogUGFzcyB3aWR0aCBhbmQgaGVpZ2h0IGJlZm9yZSBzaGFkZXIgY29tcGlsYXRpb25cclxuY29uc3QgaW50IHdpZHRoID0gNDtcclxuY29uc3QgaW50IGhlaWdodCA9IDE7XHJcblxyXG52b2lkIG1haW4oKXtcclxuICAgIHZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkgLyB2aWV3cG9ydFNpemUueHk7XHJcblxyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgLy8gSXRlcmF0ZSBtZXRhYmFsbHNcclxuICAgIGZvciAoaW50IGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmVjMiBwb3NpdGlvblV2ID0gdmVjMihmbG9hdChpKSAvIGZsb2F0KHdpZHRoKSwgZmxvYXQoaikgLyBmbG9hdChoZWlnaHQpKTtcclxuICAgICAgICAgICAgdmVjNCBtZXRhYmFsbFBvc2l0aW9uID0gdGV4dHVyZTJEKG1ldGFiYWxsc1Bvc2l0aW9ucywgcG9zaXRpb25Vdik7XHJcbiAgICAgICAgICAgIGZsb2F0IGR4ID0gbWV0YWJhbGxQb3NpdGlvbi54IC0gZ2xfRnJhZ0Nvb3JkLng7XHJcbiAgICAgICAgICAgIGZsb2F0IGR5ID0gbWV0YWJhbGxQb3NpdGlvbi55IC0gZ2xfRnJhZ0Nvb3JkLnk7XHJcbiAgICAgICAgICAgIGZsb2F0IHIgPSBtZXRhYmFsbFBvc2l0aW9uLno7XHJcbiAgICAgICAgICAgIGlmIChkeCpkeCArIGR5KmR5IDwgcipyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBiYXNpY0ZyYWdtZW50OnN0cmluZyA9IGBcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG51bmlmb3JtIHZlYzIgdmlld3BvcnRTaXplO1xyXG5cclxudm9pZCBtYWluKCl7XHJcbiAgICAvLyBEcmF3IGV2ZXJ5IHBpeGVsIHJlZC5cclxuICAgIHZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkvdmlld3BvcnRTaXplLnh5O1xyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh1di54LCAwLjAsIDAuMCwgMS4wKTtcclxufVxyXG5gO1xyXG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFZlcnRleHRTaGFkZXI6c3RyaW5nID0gYFxyXG5hdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjtcclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICAgIC8vIHBvc2l0aW9uIHNwZWNpZmllcyBvbmx5IHggYW5kIHkuXHJcbiAgICAvLyBXZSBzZXQgeiB0byBiZSAwLjAsIGFuZCB3IHRvIGJlIDEuMFxyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAwLjAsIDEuMCk7XHJcbn1cclxuYDsiLCJpbXBvcnQgeyBTeXN0ZW1QYXJhbWV0ZXJzLCBTeXN0ZW1TdGF0ZSwgSW5kaWNhdG9yRnVuY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IGRlZmF1bHRQYXJhbWV0ZXJzIH0gZnJvbSAnLi9wYXJhbWV0ZXJzJztcclxuaW1wb3J0IHsgYm94SW5kaWNhdG9yRmFjdG9yeSwgY2lyY2xlSW5kaWNhdG9yRmFjdG9yeSB9IGZyb20gJy4vaW5kaWNhdG9yc0Z1bmN0aW9ucyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyYW1ldGVycygpOlN5c3RlbVBhcmFtZXRlcnMge1xyXG4gICAgLy8gY2xvbmVzIHRoaXMgb2JqZWN0IHRvIGVuc3VyZSBkZWZhdWx0UGFyYW1ldGVycyBvYmplY3QgaXMgbmV2ZXIgZGVzdHJveWVkXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcmFtZXRlcnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplQXJyYXkoZWxlbWVudHNDb3VudDpudW1iZXIsIGRlZmF1bHRWYWx1ZTpudW1iZXIgPSAwKTpudW1iZXJbXSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50c0NvdW50OyBpKyspIHtcclxuICAgICAgICBhcnJheVtpXSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbG9jU3RhdGUobjpudW1iZXIsIHBpeGVsc0NvdW50Om51bWJlcik6U3lzdGVtU3RhdGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuLFxyXG4gICAgICAgIHBpeGVsc0NvdW50LFxyXG4gICAgICAgIG1hc3M6IDEsXHJcbiAgICAgICAgcmhvOiBpbml0aWFsaXplQXJyYXkobiksIC8vIG9ubHkgYW5kIGVudHJ5IHBlciBwYXJ0aWNsZVxyXG4gICAgICAgIHg6IGluaXRpYWxpemVBcnJheShuKjIpLCAvLyBmb3IgeCBhbmQgeSBjb21wb25lbnRcclxuICAgICAgICB2aDogaW5pdGlhbGl6ZUFycmF5KG4qMiksIC8vIGZvciB4IGFuZCB5IGNvbXBvbmVudFxyXG4gICAgICAgIHY6IGluaXRpYWxpemVBcnJheShuKjIpLCAvLyBmb3IgeCBhbmQgeSBjb21wb25lbnRcclxuICAgICAgICBhOiBpbml0aWFsaXplQXJyYXkobioyKSAvLyBmb3IgeCBhbmQgeSBjb21wb25lbnRcclxuICAgIH07XHJcbn1cclxuXHJcbi8vIFRPRE86IFdoYXQgYWJvdXQgdXNpbmcgT2JqZWN0LmtleXMoKSB0byByZW1vdmUgYXV0b21hdGljYWxseSBhbGwgdGhlIHByb3BlcnRpZXMgb2Ygc3RhdGUgb2JqZWN0XHJcbmV4cG9ydCBmdW5jdGlvbiBmcmVlU3RhdGUoc3RhdGU6U3lzdGVtU3RhdGUpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHN0YXRlKSB7XHJcbiAgICAgICAgZGVsZXRlIHN0YXRlW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVsZXRlIHN0YXRlWyduJ107XHJcbiAgICAvLyBkZWxldGUgc3RhdGVbJ3BpeGVsc0NvdW50J107XHJcbiAgICAvLyBkZWxldGUgc3RhdGVbJ21hc3MnXTtcclxuICAgIC8vIGRlbGV0ZSBzdGF0ZVsncmhvJ107XHJcbiAgICAvLyBkZWxldGUgc3RhdGVbJ3gnXTtcclxuICAgIC8vIGRlbGV0ZSBzdGF0ZVsndmgnXTtcclxuICAgIC8vIGRlbGV0ZSBzdGF0ZVsndiddO1xyXG4gICAgLy8gZGVsZXRlIHN0YXRlWydhJ107XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZyZWVQYXJhbWV0ZXJzKHBhcmFtZXRlcnM6IFN5c3RlbVBhcmFtZXRlcnMpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtZXRlcnMpIHtcclxuICAgICAgICBkZWxldGUgcGFyYW1ldGVyc1trZXldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZURlbnNpdHkoc3RhdGU6U3lzdGVtU3RhdGUsIHBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycykge1xyXG4gICAgY29uc3QgeyBuLCByaG8sIHgsIG1hc3MgfSA9IHN0YXRlO1xyXG4gICAgLy8gY29uc3QgaCA9IHBhcmFtZXRlcnMubWV0YWJhbGxXaWR0aDtcclxuICAgIGNvbnN0IGggPSBwYXJhbWV0ZXJzLmg7XHJcbiAgICBjb25zdCBoMiA9IGgqaDtcclxuICAgIGNvbnN0IGg4ID0gaDIqaDIqaDIqaDI7XHJcbiAgICBjb25zdCBDID0gNCAqIG1hc3MgLyBNYXRoLlBJIC8gaDg7XHJcbiAgICBjb25zdCBDMiA9IDQgKiBtYXNzIC8gTWF0aC5QSSAvIGgyO1xyXG5cclxuICAgIC8vIFdlIHNlYXJjaCBmb3IgbmVpZ2hib3JzIG9mIG5vZGUgaSBieSBjaGVja2luZyBldmVyeSBwYXJ0aWNsZSwgd2hpY2ggaXMgbm90XHJcbiAgICAvLyB2ZXJ5IGVmZmljaWVudC4gV2UgZG8gYXQgbGVhc3QgdGFrZSBhZHZhbmdlIG9mIHRoZSBzeW1tZXRyeSBvZiB0aGUgdXBkYXRlIChpXHJcbiAgICAvLyBjb250cmlidXRlcyB0byBqIGluIHRoZSBzYW1lIHdheSB0aGF0IGogY29udHJpYnV0ZXMgdG8gaSkuXHJcblxyXG4gICAgLy8gZm9yIGVhY2ggcGFydGljbGVcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcmhvW2ldICs9IEMyO1xyXG4gICAgICAgIC8vIGl0ZXJhdGUgZWFjaCBvdGhlciBwYXJ0aWNsZVxyXG4gICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IG47IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBkeCA9IHhbMippICsgMF0gLSB4WzIqaiArIDBdO1xyXG4gICAgICAgICAgICBjb25zdCBkeSA9IHhbMippICsgMV0gLSB4WzIqaiArIDFdO1xyXG4gICAgICAgICAgICBjb25zdCByMiA9IGR4ICsgZHk7XHJcbiAgICAgICAgICAgIGNvbnN0IHogPSBoMiAtIHIyO1xyXG4gICAgICAgICAgICBpZiAoeiA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJob19paiA9IEMqeip6Kno7XHJcbiAgICAgICAgICAgICAgICByaG9baV0gKz0gcmhvX2lqO1xyXG4gICAgICAgICAgICAgICAgcmhvW2pdICs9IHJob19pajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgY29tcHV0ZSBkZW5zaXR5LFxyXG4gKiB0aGUgY29tcHV0ZSBhY2NlbCByb3V0aW5lIHRha2VzIGFkdmFudGFnZSBvZiB0aGUgc3ltbWV0cnkgb2YgdGhlIGludGVyYWN0aW9uXHJcbiAqIGZvcmNlcyAoZmludGVyYWN0X2lqID0g4oiSZmludGVyYWN0X2ppIClcclxuICogYnV0IGl0IGRvZXMgYSB2ZXJ5IGV4cGVuc2l2ZSBicnV0ZSBmb3JjZSBzZWFyY2ggZm9yXHJcbiAqIG5laWdoYm9ycy5cclxuICogVE9ETzogQXBwbHkgdGhlIEJhcm5lcy1IdXQgYWxnb3JpdGhtIHdoaWNoIGN1dHMgdGhlIGNvbXBsZXhpdHkgb2Ygbi1ib2R5IHNpbXVsYXRpb25zIGZyb20gIOKIvE8objIpICB0byAg4oi8TyhubG9nKG4pKS5cclxuICogQHBhcmFtIHN0YXRlIFxyXG4gKiBAcGFyYW0gcGFyYW1ldGVycyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlQWNjZWxlcmF0aW9uKHN0YXRlOlN5c3RlbVN0YXRlLCBwYXJhbWV0ZXJzOlN5c3RlbVBhcmFtZXRlcnMpIHtcclxuICAgIC8vIHVucGFjayBiYXNpYyBwYXJhbWV0ZXJzXHJcbiAgICBjb25zdCB7IHJobzAsIGssIG11LCBnLCBtaW5YQWNjZWxlcmF0aW9uLCBtYXhYQWNjZWxlcmF0aW9uIH0gPSBwYXJhbWV0ZXJzO1xyXG4gICAgLy8gY29uc3QgaCA9IHBhcmFtZXRlcnMubWV0YWJhbGxXaWR0aDtcclxuICAgIGNvbnN0IGggPSBwYXJhbWV0ZXJzLmg7XHJcbiAgICBjb25zdCBoMiA9IGgqaDtcclxuICAgIC8vIHVucGFjayBzeXN0ZW0gc3RhdGVcclxuICAgIGNvbnN0IHsgbWFzcywgcmhvLCB4LCB2LCBhLCBuIH0gPSBzdGF0ZTtcclxuXHJcbiAgICAvLyBjb21wdXRlIGRlbnNpdHlcclxuICAgIGNvbXB1dGVEZW5zaXR5KHN0YXRlLCBwYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAvLyBhZGQgZ3Jhdml0eSB0byBlYWNoIHBhcnRpY2xlXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbUZhY3RvciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgY29uc3QgeEFjY2VsID0gbWluWEFjY2VsZXJhdGlvbiooMS1yYW5kb21GYWN0b3IpICsgbWF4WEFjY2VsZXJhdGlvbipyYW5kb21GYWN0b3I7XHJcbiAgICAgICAgYVsyKmkgKyAwXSA9IHhBY2NlbDsgLy8geCBjb21wb25lbnRcclxuICAgICAgICAvLyBhWzIqaSArIDFdID0gLWc7IC8vIHkgY29tcG9uZW50XHJcbiAgICAgICAgYVsyKmkgKyAxXSA9IC1nOyAvLyB5IGNvbXBvbmVudFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0YW50cyBmb3IgaW50ZXJhY3Rpb24gdGVybXNcclxuICAgIGNvbnN0IENvID0gbWFzcyAvIE1hdGguUEkgLyAoaDIqaDIpO1xyXG4gICAgY29uc3QgQ3AgPSAxNSprO1xyXG4gICAgY29uc3QgQ3YgPSAtNDAqbXU7XHJcblxyXG4gICAgLy8gQ29tcHV0ZSBpbnRlcmFjdGlvbiBmb3JjZXNcclxuICAgIC8vIGZvciBlYWNoIHBhcnRpY2xlXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJob2kgPSByaG9baV07XHJcbiAgICAgICAgLy8gaXRlcmF0ZSBlYWNoIG90aGVyIHBhcnRpY2xlXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGR4ID0geFsyKmkgKyAwXSAtIHhbMipqICsgMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGR5ID0geFsyKmkgKyAxXSAtIHhbMipqICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IHIyID0gZHgqZHggKyBkeSpkeTtcclxuICAgICAgICAgICAgLy8gaXMgdGhlIGogcGFydGljbGUgaXMgaW4gdGhlIHJhZGlvdXMgaCBvZiBpP1xyXG4gICAgICAgICAgICBpZiAocjIgPCBoMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmhvaiA9IHJob1tqXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHEgPSBNYXRoLnNxcnQocjIpL2g7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1ID0gMSAtIHE7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgcmhvaSBmcm9tIHdvIHNpbmNlIGl0IGRvbid0IGFwcGVhcnMgb24gdGhlIHBhcGVyJ3MgZXF1YXRpb25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCB3byA9IENvICogdSAvIHJob2kgLyByaG9qO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd3AgPSB3byAqIENwICogKHJob2kgKyByaG9qIC0gMipyaG8wKSAqIHUvcTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHd2ID0gd28qQ3Y7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZHZ4ID0gdlsyKmkgKyAwXSAtIHZbMipqICsgMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkdnkgPSB2WzIqaSArIDFdIC0gdlsyKmogKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVbmRlcnN0YW5kIHRoaXMuXHJcbiAgICAgICAgICAgICAgICBhWzIqaSswXSArPSAod3AqZHggKyB3dipkdngpO1xyXG4gICAgICAgICAgICAgICAgYVsyKmkrMV0gKz0gKHdwKmR5ICsgd3YqZHZ5KTtcclxuICAgICAgICAgICAgICAgIGFbMipqKzBdIC09ICh3cCpkeCArIHd2KmR2eCk7XHJcbiAgICAgICAgICAgICAgICBhWzIqaisxXSAtPSAod3AqZHkgKyB3dipkdnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaW50Q3VycmVudFN0YXRlKHN0YXRlLCAnY29tcHV0ZUFjY2VsZXJhdGlvbigpJyk7XHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsZWFwZnJvZ1N0ZXAoc3RhdGU6U3lzdGVtU3RhdGUsIGR0Om51bWJlcikge1xyXG4gICAgY29uc3QgeyBhLCB2aCwgdiwgeCwgbiB9ID0gc3RhdGU7XHJcblxyXG4gICAgLy8gVE9ETzogVXNlIHRoZSBpbnRlZ2VyIHN0ZXBzIGZvcm11bGEgZm9yIHRoZSBsZWFwZnJvZ1xyXG4gICAgLy8gdGhlIGludGVnZXIgc3RlcCBmb3JtdWxhIGFyZSBsaXRlcmFsbHkgdGhlIGtpbmVtYXRpYyBlcXVhdGlvbnNcclxuICAgIC8vIHdoaWNoIHVzZSB0aGUgdGF5bG9yIHRoZXJvbSB0byBkZXNjcmliZSBkZSBwb3NpdGlvbiBpbiBtb21lbnQgdC5cclxuICAgIC8vIHNlZTogaHR0cHM6Ly93d3cuYWxnb3JpdGhtLWFyY2hpdmUub3JnL2NvbnRlbnRzL3ZlcmxldF9pbnRlZ3JhdGlvbi92ZXJsZXRfaW50ZWdyYXRpb24uaHRtbFxyXG4gICAgLy8gdGhpcyB3aWxsIHNhdmUgdXMgYSBmb3IgbG9vcFxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMipuOyArK2kpIHZoW2ldICs9IGFbaV0gKiBkdDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMipuOyArK2kpIHZbaV0gPSB2aFtpXSArIGFbaV0gKiBkdCAvIDI7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIqbjsgKytpKSB4W2ldICs9IHZoW2ldICogZHQ7XHJcblxyXG4gICAgcmVmbGVjdEJvdW5kYXJ5Q29uZGl0aW9ucyhzdGF0ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBdCB0aGUgZmlyc3Qgc3RlcCwgdGhlIGxlYXBmcm9nIGl0ZXJhdGlvbiBvbmx5IGhhcyB0aGUgaW5pdGlhbCB2ZWxvY2l0aWVzIHYwLCBzbyB3ZVxyXG4gKiBuZWVkIHRvIGRvIHNvbWV0aGluZyBzcGVjaWFsLlxyXG4gKiBAcGFyYW0gc3RhdGUgXHJcbiAqIEBwYXJhbSBkdCBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsZWFwZnJvZ1N0YXJ0KHN0YXRlOlN5c3RlbVN0YXRlLCBkdDpudW1iZXIpIHtcclxuICAgIGNvbnN0IHsgYSwgdmgsIHYsIHgsIG4gfSA9IHN0YXRlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMipuOyArK2kpIHZoW2ldID0gdltpXSArIGFbaV0gKiBkdCAvIDI7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIqbjsgKytpKSB2W2ldICs9IGFbaV0gKiBkdDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMipuOyArK2kpIHhbaV0gKz0gdmhbaV0gKiBkdDtcclxuICAgIHJlZmxlY3RCb3VuZGFyeUNvbmRpdGlvbnMoc3RhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVmbGVjdEJvdW5kYXJ5Q29uZGl0aW9ucyhzdGF0ZTpTeXN0ZW1TdGF0ZSkge1xyXG4gICAgLy8gQm91bmRhcmllcyBvZiB0aGUgY29tcHV0YXRpb25hbCBkb21haW5cclxuICAgIGNvbnN0IFhNSU4gPSAwLjA7XHJcbiAgICBjb25zdCBYTUFYID0gMS4wO1xyXG4gICAgY29uc3QgWU1JTiA9IDAuMDtcclxuICAgIGNvbnN0IFlNQVggPSAxLjA7XHJcbiAgICBjb25zdCB7IHgsIG4gfSA9IHN0YXRlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcclxuICAgICAgICBjb25zdCBpZHggPSBpICogMjtcclxuICAgICAgICBpZiAoeFtpZHggKyAwXSA8IFhNSU4pIGRhbXBSZWZsZWN0KDAsIFhNSU4sIHN0YXRlLCBpZHgpO1xyXG4gICAgICAgIGlmICh4W2lkeCArIDBdID4gWE1BWCkgZGFtcFJlZmxlY3QoMCwgWE1BWCwgc3RhdGUsIGlkeCk7XHJcbiAgICAgICAgaWYgKHhbaWR4ICsgMV0gPCBZTUlOKSBkYW1wUmVmbGVjdCgxLCBZTUlOLCBzdGF0ZSwgaWR4KTtcclxuICAgICAgICBpZiAoeFtpZHggKyAxXSA+IFlNQVgpIGRhbXBSZWZsZWN0KDEsIFlNQVgsIHN0YXRlLCBpZHgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVmbGVjdEhvcml6b250YWxMaW5lT2JzdGFjbGUoc3RhdGU6U3lzdGVtU3RhdGUsIHB0eDpudW1iZXIgPSAwLjI1LCBwdHk6bnVtYmVyID0gMC40NSwgd2lkdGg6bnVtYmVyID0gMC4wNikge1xyXG4gICAgY29uc3QgeyB4LCBuIH0gPSBzdGF0ZTtcclxuICAgIGNvbnN0IGhhbGYgPSAwLjU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xyXG4gICAgICAgIGNvbnN0IGlkeCA9IGkgKiAyO1xyXG4gICAgICAgIGNvbnN0IGlzWE92ZXJIb3Jpem9udGFsTGluZSA9IHhbaWR4ICsgMF0gPiAocHR4IC0gd2lkdGggKiBoYWxmKSAmJiB4W2lkeCArIDBdIDwgKHB0eCArIHdpZHRoICogaGFsZik7XHJcbiAgICAgICAgY29uc3QgaXNZVW5kZXJUaGVMaW5lID0geFtpZHggKyAxXSA8IHB0eTtcclxuICAgICAgICBpZiAoaXNYT3Zlckhvcml6b250YWxMaW5lICYmIGlzWVVuZGVyVGhlTGluZSkge1xyXG4gICAgICAgICAgICBkYW1wUmVmbGVjdCgxLCBwdHksIHN0YXRlLCBpZHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRhbXBSZWZsZWN0KHdoaWNoOm51bWJlciwgYmFycmllcjpudW1iZXIsIHN0YXRlOlN5c3RlbVN0YXRlLCBpZHg6bnVtYmVyKSB7XHJcbiAgICBjb25zdCB7IHZoLCB2LCB4IH0gPSBzdGF0ZTtcclxuXHJcbiAgICAvLyBDb2VmZmljaWVudCBvZiByZXNpdGl1dGlvblxyXG4gICAgY29uc3QgREFNUCA9IDAuNzU7XHJcbiAgICAvLyBJZ25vcmUgZGVnZW5lcmF0ZSBjYXNlc1xyXG4gICAgaWYgKHZbaWR4ICsgd2hpY2hdID09IDApXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIFNjYWxlIGJhY2sgdGhlIGRpc3RhbmNlIHRyYXZlbGVkIGJhc2VkIG9uIHRpbWUgZnJvbSBjb2xsaXNpb25cclxuICAgIGNvbnN0IHRib3VuY2UgPSAoeFtpZHggKyB3aGljaF0tYmFycmllcikvdltpZHggKyB3aGljaF07XHJcbiAgICAvLyB0aGUgKDEtREFNUCkgaXMgdXNlZCB0byBtYWtlIGNvbXB1dGF0aW9ucyB0YWtpbmcgaW50byBhY291bnRcclxuICAgIC8vIHRoZSBkYW1wZWQgc3BlZWQgaW4gYSBtb21lbnQgaW4gd2hpY2ggc3BlZWQgaGFzbid0IGJlZW4gZGFtcGVkIHlldFxyXG4gICAgeFtpZHggKyAwXSAtPSB2W2lkeCArIDBdKigxLURBTVApKnRib3VuY2U7XHJcbiAgICB4W2lkeCArIDFdIC09IHZbaWR4ICsgMV0qKDEtREFNUCkqdGJvdW5jZTtcclxuXHJcbiAgICAvLyBSZWZsZWN0IHRoZSBwb3NpdGlvbiBhbmQgdmVsb2NpdHlcclxuICAgIHhbaWR4ICsgd2hpY2hdID0gMipiYXJyaWVyLXhbaWR4ICsgd2hpY2hdO1xyXG4gICAgdltpZHggKyB3aGljaF0gPSAtdltpZHggKyB3aGljaF07XHJcbiAgICB2aFtpZHggKyB3aGljaF0gPSAtdmhbaWR4ICsgd2hpY2hdO1xyXG5cclxuICAgIC8vIERhbXAgdGhlIHZlbG9jaXRpZXNcclxuICAgIHZbaWR4ICsgMF0gKj0gREFNUDsgdmhbaWR4ICsgMF0gKj0gREFNUDtcclxuICAgIHZbaWR4ICsgMV0gKj0gREFNUDsgdmhbaWR4ICsgMV0gKj0gREFNUDtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxhY2VQYXJ0aWNsZXMocGFyYW1ldGVyczpTeXN0ZW1QYXJhbWV0ZXJzLCBpbmRpY2F0b3JGdW5jdGlvbjpJbmRpY2F0b3JGdW5jdGlvbik6U3lzdGVtU3RhdGUge1xyXG4gICAgY29uc3QgaCA9IHBhcmFtZXRlcnMuaDtcclxuXHJcbiAgICAvLyBzZXBhcmF0aW9uIGJldHdlZW4gcGFydGljbGVzIHdpbGwgYmUgb2YgMC4zXHJcbiAgICBjb25zdCBoaCA9IGggLyAxLjM7XHJcbiAgICBsZXQgY291bnQ6bnVtYmVyID0gMDtcclxuICAgIC8vIENvdW50IG1lc2ggcG9pbnRzIHRoYXQgZmFsbCBpbiBpbmRpY2F0ZWQgcmVnaW9uLlxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxOyB4ICs9IGhoKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDE7IHkgKz0gaGgpXHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSBpbmRpY2F0b3JGdW5jdGlvbih4LHkpID8gMSA6IDA7XHJcblxyXG4gICAgLy8gdGhlIG51bWJlciBvZiBwYXJ0aWNsZXMgbXVzdCBiZSBhIHBvd2VyIG9mIHR3b1xyXG4gICAgLy8gdG8gcmVuZGVyIGl0IG9uIHRoZSBncHVcclxuICAgIC8vIFNpbmNlIGl0J3MgcG9zc2libGUgdGhhdCB0aGUgY291bnQgaXMgbm90IGEgcG93ZXIgb2YgMlxyXG4gICAgLy8gSSdsbCBjb21wdXRlIHRoZSB0b3AtbmVhcmVzdCBjb3VudCBvZiBwaXhlbHMgcmVxdWlyZWRcclxuICAgIC8vIHRvIHRyYW5zZmVyIGFsbCB0aGUgcGFydGljbGVzLlxyXG4gICAgY29uc3QgcG93ID0gTWF0aC5jZWlsKE1hdGgubG9nMihjb3VudCkpO1xyXG4gICAgY29uc3QgdGV4dHVyZVBpeGVsc0NvdW50ID0gMiAqKiBwb3c7XHJcbiAgICAvLyBjb3VudCA9IDIgKiogcG93O1xyXG4gICAgLy8gUG9wdWxhdGUgdGhlIHBhcnRpY2xlIGRhdGEgc3RydWN0dXJlXHJcbiAgICBjb25zdCBzOlN5c3RlbVN0YXRlID0gYWxsb2NTdGF0ZShjb3VudCwgdGV4dHVyZVBpeGVsc0NvdW50KTtcclxuICAgIGxldCBwID0gMDtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTsgeCArPSBoaCkge1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTsgeSArPSBoaCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9yRnVuY3Rpb24oeCx5KSAmJiBwIDwgY291bnQpIHtcclxuICAgICAgICAgICAgICAgIHMueFsyKnArMF0gPSB4O1xyXG4gICAgICAgICAgICAgICAgcy54WzIqcCsxXSA9IHk7XHJcbiAgICAgICAgICAgICAgICBzLnZbMipwKzBdID0gMDtcclxuICAgICAgICAgICAgICAgIHMudlsyKnArMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgKytwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVNYXNzKHN0YXRlOlN5c3RlbVN0YXRlLCBwYXJhbWV0ZXJzOlN5c3RlbVBhcmFtZXRlcnMpOnZvaWQge1xyXG4gICAgc3RhdGUubWFzcyA9IDE7XHJcbiAgICBjb21wdXRlRGVuc2l0eShzdGF0ZSwgcGFyYW1ldGVycyk7XHJcblxyXG4gICAgLy8gcmVmZXJlbmNlIGRlbnNpdHlcclxuICAgIGxldCByaG8wID0gcGFyYW1ldGVycy5yaG8wO1xyXG4gICAgbGV0IHJobzJzID0gMDtcclxuICAgIGxldCByaG9zID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRlLm47ICsraSkge1xyXG4gICAgICAgIHJobzJzICs9IChzdGF0ZS5yaG9baV0pKihzdGF0ZS5yaG9baV0pO1xyXG4gICAgICAgIHJob3MgKz0gc3RhdGUucmhvW2ldO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogVW5kZXJzdGFuZCBob3cgdGhpcyBub3JtYWxpemF0aW9uIGlzIGRvbmVcclxuICAgIC8vIG1hc3MgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIGFjaGlldmUgdGhlIGRlc2lyZWQgcmVmZXJlbmNlIGRlbnNpdHlcclxuICAgIHN0YXRlLm1hc3MgKj0gKHJobzAqcmhvcyAvIHJobzJzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQYXJ0aWNsZXMocGFyYW1ldGVyczpTeXN0ZW1QYXJhbWV0ZXJzKTpTeXN0ZW1TdGF0ZVxyXG57XHJcbiAgICAvLyBPcGVuIGdsIHNoYWRlciBjb29yZGluYXRlIHN5c3RlbSBpcyBvbiB0aGUgZmlyc3QgY2FydGVzaWFuIGNvb3JkaW5hdGVcclxuICAgIGNvbnN0IHB0eCA9IDAuMjU7XHJcbiAgICBjb25zdCBwdHkgPSAwLjU7XHJcbiAgICBjb25zdCB3aWR0aCA9IDAuNTtcclxuICAgIGNvbnN0IGhlaWdodCA9IDAuNTtcclxuICAgIGNvbnN0IHM6U3lzdGVtU3RhdGUgPSBwbGFjZVBhcnRpY2xlcyhwYXJhbWV0ZXJzLCBib3hJbmRpY2F0b3JGYWN0b3J5KHB0eCwgcHR5LCB3aWR0aCwgaGVpZ2h0KSk7XHJcbiAgICAvLyBjb25zdCBjZW50ZXJYID0gMC41O1xyXG4gICAgLy8gY29uc3QgY2VudGVyWSA9IDAuNTtcclxuICAgIC8vIGNvbnN0IHJhZGl1cyA9IDAuMjU7XHJcbiAgICAvLyBjb25zdCBzOlN5c3RlbVN0YXRlID0gcGxhY2VQYXJ0aWNsZXMocGFyYW1ldGVycywgY2lyY2xlSW5kaWNhdG9yRmFjdG9yeShjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMpKTtcclxuICAgIG5vcm1hbGl6ZU1hc3MocywgcGFyYW1ldGVycyk7XHJcbiAgICAvLyBwcmludEN1cnJlbnRTdGF0ZShzLCAnYWZ0ZXIgbm9ybWFsaXplTWFzcygpJyk7XHJcbiAgICByZXR1cm4gcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHR1cmVEYXRhKHRleHR1cmVEYXRhOkZsb2F0MzJBcnJheSwgc3RhdGU6U3lzdGVtU3RhdGUsIHBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycyk6dm9pZCB7XHJcbiAgICBjb25zdCB7IG4sIHBpeGVsc0NvdW50IH0gPSBzdGF0ZTtcclxuICAgIGlmICh0ZXh0dXJlRGF0YS5sZW5ndGggIT09IChwaXhlbHNDb3VudCAqIDQpKSB0aHJvdyAnVGV4dHVyZSBkYXRhIGFycmF5IG11c3QgYmUgYW4gYXJyYXkgb2YgNCB0aW1lcyB0aGUgbnVtYmVyIG9mIHBpeGVsc0NvdW50IG9uIHRoZSBzeXN0ZW0gc3RhdGUgaW5zdGFuY2UnO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgdGV4dHVyZURhdGFbNCppICsgMF0gPSBzdGF0ZS54WzIqaSArIDBdOyAvLyB4LCBwb3NpdGlvblxyXG4gICAgICAgIHRleHR1cmVEYXRhWzQqaSArIDFdID0gc3RhdGUueFsyKmkgKyAxXTsgLy8geSwgcG9zaXRpb25cclxuICAgICAgICAvLyB2ZWxvY2l0eSBoYWxmIHN0ZXAgYmFja1xyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIGl0IG91dCB0aGlzXHJcbiAgICAgICAgLy8gdmVsb2NpdHkgZGlyZWN0aW9uXHJcbiAgICAgICAgLy8gY29uc3QgdnggPSBzdGF0ZS52WzIqaSArIDBdOyAvLyB4LCB2ZWxvY2l0eVxyXG4gICAgICAgIC8vIGNvbnN0IHZ5ID0gc3RhdGUudlsyKmkgKyAxXTsgLy8geSwgdmVsb2NpdHlcclxuICAgICAgICAvLyBjb25zdCB2TWFnID0gTWF0aC5zcXJ0KHZ4KnZ4ICsgdnkqdnkpO1xyXG4gICAgICAgIHRleHR1cmVEYXRhWzQqaSArIDJdID0gc3RhdGUudlsyKmkgKyAwXTsgLy8geCwgdmVsb2NpdHlcclxuICAgICAgICB0ZXh0dXJlRGF0YVs0KmkgKyAzXSA9IHN0YXRlLnZbMippICsgMV07IC8vIHksIHZlbG9jaXR5XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmludEN1cnJlbnRTdGF0ZShzdGF0ZTpTeXN0ZW1TdGF0ZSwgZGVzY3JpcHRpb246c3RyaW5nID0gdW5kZWZpbmVkKTp2b2lkIHtcclxuICAgIGlmIChkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0YXRlKSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0YXRlKSkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW5kaWNhdG9yRnVuY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogTm90ZSB0aGF0IHBvc2l0aW9ucyBhbmQgZGltZW5zaW9ucyBtdXN0IGJlIGdpdmVuIGluIG5vcm1hbGl6ZWQgdmFsdWVzXHJcbiAqIGluIHJhbmdlIFswLCAxXVxyXG4gKiBAcGFyYW0gcHR4IFRvcC1sZWZ0IGNvcm5lciB4IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSBwdHkgVG9wLWxlZnQgY29ybmVyIHkgcG9zaXRpb25cclxuICogQHBhcmFtIHdpZHRoIFdpZHRoIGZyb20gdG9wLWxlZnQgY29ybmVyIHBvaW50XHJcbiAqIEBwYXJhbSBoZWlnaHQgSGVpZ2h0IGZyb20gdG9wLWxlZnQgY29ybmVyIHBvaW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYm94SW5kaWNhdG9yRmFjdG9yeShwdHg6bnVtYmVyLCBwdHk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOkluZGljYXRvckZ1bmN0aW9uIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiBib3hJbmRpY2F0b3IoeDpudW1iZXIsIHk6bnVtYmVyKTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHggPiBwdHggJiYgeCA8IChwdHggKyB3aWR0aCkpICYmXHJcbiAgICAgICAgICAgICh5ID4gcHR5ICYmIHkgPCAocHR5ICsgaGVpZ2h0KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3RlIHRoYXQgcG9zaXRpb25zIGFuZCBkaW1lbnNpb25zIG11c3QgYmUgZ2l2ZW4gaW4gbm9ybWFsaXplZCB2YWx1ZXNcclxuICogaW4gcmFuZ2UgWzAsIDFdXHJcbiAqIEBwYXJhbSBjZW50ZXJYIFggY29vcmRpbmF0ZSBvZiBjaXJjbGUgY2VudGVyXHJcbiAqIEBwYXJhbSBjZW50ZXJZIFkgY29vcmRpbmF0ZSBvZiBjaXJjbGUgY2VudGVyXHJcbiAqIEBwYXJhbSByYWRpdXMgQ2lyY2xlIHJhZGl1c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNpcmNsZUluZGljYXRvckZhY3RvcnkoY2VudGVyWDpudW1iZXIsIGNlbnRlclk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKTpJbmRpY2F0b3JGdW5jdGlvbiB7XHJcbiAgICAvLyBUT0RPOiBVc2UgYSBmdW5jdGlvbiBmYWN0b3J5IHRvIGdlbmVyYWxpemUgdGhlIGNpcmNsZSBpbmRpY2F0b3JcclxuICAgIHJldHVybiBmdW5jdGlvbiBjaXJjbGVJbmRpY2F0b3IoeDpudW1iZXIsIHk6bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY2VudGVyXHJcbiAgICAgICAgY29uc3QgZHggPSAoeC1jZW50ZXJYKTtcclxuICAgICAgICBjb25zdCBkeSA9ICh5LWNlbnRlclkpO1xyXG4gICAgICAgIGNvbnN0IHIyID0gZHgqZHggKyBkeSpkeTtcclxuICAgICAgICByZXR1cm4gKHIyIDwgcmFkaXVzKnJhZGl1cyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi4vQXBwJztcclxuaW1wb3J0IHsgbWV0YWJhbGxTaGFkZXIsIGdlbmVyYXRlTWV0YWJhbGxzU2hhZGVyU291cmNlIH0gZnJvbSAnLi4vc2hhZGVycy9mcmFnbWVudHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0VmVydGV4dFNoYWRlciB9IGZyb20gJy4uL3NoYWRlcnMvdmVydGV4JztcclxuaW1wb3J0IHsgTWV0YWJhbGxzU2hhZGVySW5mbywgU3lzdGVtU3RhdGUsIFN5c3RlbVBhcmFtZXRlcnMgfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IGdldFBhcmFtZXRlcnMsIGluaXRQYXJ0aWNsZXMsIGNvbXB1dGVBY2NlbGVyYXRpb24sIGxlYXBmcm9nU3RhcnQsIGxlYXBmcm9nU3RlcCwgZ2V0VGV4dHVyZURhdGEsIHByaW50Q3VycmVudFN0YXRlLCByZWZsZWN0SG9yaXpvbnRhbExpbmVPYnN0YWNsZSwgZnJlZVN0YXRlLCBmcmVlUGFyYW1ldGVycyB9IGZyb20gJy4vaW5kZXgnO1xyXG5pbXBvcnQgeyBDb2xvclBhbGV0dGUgfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IHBhbGV0dGVzIH0gZnJvbSAnLi9wYXJhbWV0ZXJzJztcclxuY29uc3QgY2xhc3NpZSA9IHJlcXVpcmUoJy4uL3ZlbmRvcnMvY2xhc3NpZScpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBvZiBhbnkgZ2FtZSBsb2dpY1xyXG4gKiB0aGluayBvZiB0aGlzIGNsYXNzIGFzIHRoZSBzZXR1cCgpIGxvb3AoKSBtZXRob2RzIG9mIGEgcHJvY2Vzc2luZy9vcGVuZnJhbWV3b3JrcyBhcHBsaWNhdGlvblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1haW5HYW1lIGV4dGVuZHMgQXBwIHtcclxuICAgIHByaXZhdGUgdmVydGV4U2hhZGVyOldlYkdMU2hhZGVyO1xyXG4gICAgcHJpdmF0ZSBtZXRhYmFsbHNTaGFkZXI6V2ViR0xTaGFkZXI7XHJcbiAgICBwcml2YXRlIG1ldGFiYWxsc1Byb2dyYW06V2ViR0xQcm9ncmFtO1xyXG5cclxuICAgIHByaXZhdGUgdmlld3BvclNpemU6RmxvYXQzMkFycmF5O1xyXG4gICAgcHJpdmF0ZSBtZXRhYmFsbHNQb3NpdGlvbnM6RmxvYXQzMkFycmF5O1xyXG4gICAgcHJpdmF0ZSBtZXRhYmFsbHNUZXh0dXJlOldlYkdMVGV4dHVyZTtcclxuICAgIHByaXZhdGUgdmVydGV4QnVmZmVyOldlYkdMQnVmZmVyO1xyXG4gICAgcHJpdmF0ZSBzaGFkZXJJbmZvOk1ldGFiYWxsc1NoYWRlckluZm87XHJcbiAgICBwcml2YXRlIG1ldGFiYWxsc1ZlbG9jaXR5Om51bWJlcltdW10gPSBbXTtcclxuICAgIHByaXZhdGUgdGV4dHVyZURhdGE6RmxvYXQzMkFycmF5O1xyXG5cclxuICAgIHB1YmxpYyBzcGhTdGF0ZTpTeXN0ZW1TdGF0ZTtcclxuICAgIHB1YmxpYyBzcGhQYXJhbWV0ZXJzOlN5c3RlbVBhcmFtZXRlcnM7XHJcbiAgICBwdWJsaWMgaXNTZXR0aW5nVXA6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xvclBhbGV0dGU6Q29sb3JQYWxldHRlO1xyXG4gICAgcHJpdmF0ZSB2aXN1YWxpemF0aW9uUmFkaXVzOm51bWJlcjtcclxuICAgIHByaXZhdGUgX21vdXNlSW50ZXJhY3Rpb25FbmFibGVkOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZ2V0IG1vdXNlSW50ZXJhY3Rpb25FbmFibGVkICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW91c2VJbnRlcmFjdGlvbkVuYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgbW91c2VJbnRlcmFjdGlvbkVuYWJsZWQgKHZhbHVlOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9tb3VzZUludGVyYWN0aW9uRW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwKCkge1xyXG4gICAgICAgIC8vIElmIHNwaFBhcmFtZXRlcnMgaXMgdW5kZWZpbmVkXHJcbiAgICAgICAgLy8gaXMgdW5kZWZpbmVkIG9ubHkgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICBpZiAoIXRoaXMuc3BoUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICB0aGlzLnNwaFBhcmFtZXRlcnMgPSBnZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JQYWxldHRlID0gcGFsZXR0ZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMudmlzdWFsaXphdGlvblJhZGl1cyA9IHRoaXMuc3BoUGFyYW1ldGVycy5tZXRhYmFsbFJhZGl1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5zcGhQYXJhbWV0ZXJzKSB0aHJvdyAnU1BIIHBhcmFtZXRlcnMgY2FuXFwndCBiZSBudWxsJztcclxuICAgICAgICB0aGlzLnNwaFN0YXRlID0gaW5pdFBhcnRpY2xlcyh0aGlzLnNwaFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGNvbXB1dGVBY2NlbGVyYXRpb24odGhpcy5zcGhTdGF0ZSwgdGhpcy5zcGhQYXJhbWV0ZXJzKTtcclxuICAgICAgICBsZWFwZnJvZ1N0YXJ0KHRoaXMuc3BoU3RhdGUsIHRoaXMuc3BoUGFyYW1ldGVycy5kdCk7XHJcblxyXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzkwNDY2NDMvd2ViZ2wtY3JlYXRlLXRleHR1cmVcclxuICAgICAgICAvLyBQYXNzIG1ldGFiYWxscyBwb3NpdGlvbnMgdG8gdGhlIHNoYWRlciBieSB1c2luZyBhIHRleHR1cmUgMmRcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IHRoaXMuY29tcGlsZVNoYWRlcihkZWZhdWx0VmVydGV4dFNoYWRlciwgdGhpcy5HTC5WRVJURVhfU0hBREVSKTtcclxuICAgICAgICAvLyBlYWNoIHBhcnRpY2xlIGhhcyAyIGNvbXBvbmVudHNcclxuICAgICAgICB0aGlzLnNoYWRlckluZm8gPSBnZW5lcmF0ZU1ldGFiYWxsc1NoYWRlclNvdXJjZSh0aGlzLnNwaFN0YXRlLCB0aGlzLnNwaFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIHRoaXMubWV0YWJhbGxzU2hhZGVyID0gdGhpcy5jb21waWxlU2hhZGVyKHRoaXMuc2hhZGVySW5mby5zaGFkZXJTb3VyY2UsIHRoaXMuR0wuRlJBR01FTlRfU0hBREVSKTtcclxuICAgICAgICB0aGlzLm1ldGFiYWxsc1Byb2dyYW0gPSB0aGlzLkdMLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICB0aGlzLkdMLmF0dGFjaFNoYWRlcih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sIHRoaXMudmVydGV4U2hhZGVyKTtcclxuICAgICAgICB0aGlzLkdMLmF0dGFjaFNoYWRlcih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sIHRoaXMubWV0YWJhbGxzU2hhZGVyKTtcclxuICAgICAgICB0aGlzLkdMLmxpbmtQcm9ncmFtKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSk7XHJcbiAgICAgICAgdGhpcy5HTC51c2VQcm9ncmFtKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgIC8vIFNldCB1cCA0IHZlcnRpY2VzLCB3aGljaCB3ZSdsbCBkcmF3IGFzIGEgcmVjdGFuZ2xlXHJcbiAgICAgICAgLy8gdmlhIDIgdHJpYW5nbGVzXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgIEEtLS1DXHJcbiAgICAgICAgLy8gICB8ICAvfFxyXG4gICAgICAgIC8vICAgfCAvIHxcclxuICAgICAgICAvLyAgIHwvICB8XHJcbiAgICAgICAgLy8gICBCLS0tRFxyXG4gICAgICAgIC8vIE5vcm1hbGl6ZSBkZXZpY2UgY29vcmRpbmF0ZXMgc3BhY2VcclxuICAgICAgICAvLyBodHRwOi8vd3d3LmxlYXJub3BlbmdsZXMuY29tL3VuZGVyc3RhbmRpbmctb3Blbmdscy1tYXRyaWNlcy9cclxuICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAgICAgICAgIC0xLjAsIDEuMCxcclxuICAgICAgICAgICAgLTEuMCwgLTEuMCxcclxuICAgICAgICAgICAgMS4wLCAxLjAsXHJcbiAgICAgICAgICAgIDEuMCwgLTEuMFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHRoaXMudmVydGV4QnVmZmVyID0gdGhpcy5HTC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLkdMLmJpbmRCdWZmZXIodGhpcy5HTC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4QnVmZmVyKTtcclxuICAgICAgICB0aGlzLkdMLmJ1ZmZlckRhdGEodGhpcy5HTC5BUlJBWV9CVUZGRVIsIHZlcnRleERhdGEsIHRoaXMuR0wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgICAgICAvLyBUbyBtYWtlIHRoZSBnZW9tZXRyeSBpbmZvcm1hdGlvbiBhdmFpbGFibGUgaW4gdGhlIHNoYWRlciBhcyBhdHRyaWJ1dGVzLCB3ZVxyXG4gICAgICAgIC8vIG5lZWQgdG8gdGVsbCBXZWJHTCB3aGF0IHRoZSBsYXlvdXQgb2Ygb3VyIGRhdGEgaW4gdGhlIHZlcnRleCBidWZmZXIgaXMuXHJcbiAgICAgICAgLy8gY29uc3QgcG9zaXRpb25IYW5kbGUgPSB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgJ3Bvc2l0aW9uJyk7XHJcbiAgICAgICAgLy8gVE9ETyhET05FKTogQWx3YXlzIGhhdmUgdmVydGV4IGF0dHJpYiAwIGFycmF5IGVuYWJsZWQgdG8gcHJldmVudCB0aGUgYnJvd3NlciB0byBkbyBjb21wbGljYXRlZCBlbXVsYXRpb24gd2hlbiBydW5uaW5nIG9uIGRlc2t0b3AgT3BlbkdMIChlLmcuIG9uIE1hYyBPU1gpLiBUaGlzIGlzIGJlY2F1c2UgaW4gZGVza3RvcCBPcGVuR0wsIG5vdGhpbmcgZ2V0cyBkcmF3biBpZiB2ZXJ0ZXggYXR0cmliIDAgaXMgbm90IGFycmF5LWVuYWJsZWQuXHJcbiAgICAgICAgdGhpcy5HTC5iaW5kQXR0cmliTG9jYXRpb24odGhpcy5tZXRhYmFsbHNQcm9ncmFtLCAwLCAncG9zaXRpb24nKTtcclxuICAgICAgICB0aGlzLkdMLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KDApO1xyXG4gICAgICAgIC8vIGluIGMrKyB0aGlzIHdvdWxkIGJlIGRvbmUgYnkgdXNpbmcgdHlwZW9mKGZsb2F0KVxyXG4gICAgICAgIC8vIHNpemUgaW4gYnl0ZXMgcGVyIGNvbXBvbmVudFxyXG4gICAgICAgIGNvbnN0IGJ5dGVzUGVyQ29tcG9uZW50ID0gNDsgLy8gYSBmbG9hdCAzMiBiaXRzIG51bWJlciBuZWVkcyA0IGJ5dGVzXHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50Q291bnQgPSAyOyAvLyBob3cgbXVjaCBjb21wb25lbnRzIHdpbGwgaGF2ZVxyXG4gICAgICAgIGNvbnN0IGJ5dGVTaXplID0gY29tcG9uZW50Q291bnQgKiBieXRlc1BlckNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLkdMLnZlcnRleEF0dHJpYlBvaW50ZXIoMCxcclxuICAgICAgICAgICAgY29tcG9uZW50Q291bnQsIC8vIHBvc2l0aW9uIGlzIGEgdmVjMlxyXG4gICAgICAgICAgICB0aGlzLkdMLkZMT0FULCAvLyBlYWNoIGNvbXBvbmVudCBpcyBhIGZsb2F0XHJcbiAgICAgICAgICAgIGZhbHNlLCAvLyBkb24ndCBub3JtYWxpemUgdmFsdWVzXHJcbiAgICAgICAgICAgIGJ5dGVTaXplLCAvLyB0d28gNCBieXRlIGZsb2F0IGNvbXBvbmVudHMgcGVyIHZlcnRleFxyXG4gICAgICAgICAgICAwIC8vIHRoZSBzdHJpZGUsIHRoZSBkaXN0YW5jZSBpbiBieXRlcyBmcm9tIHRoZSBlbmQgb2YgY3VycmVudCBwb3NpdGlvbiB0byB0aGUgbmV4dCBwb3NpdGlvblxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMubWV0YWJhbGxzVGV4dHVyZSA9IHRoaXMuR0wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIHRoaXMuR0wuYmluZFRleHR1cmUodGhpcy5HTC5URVhUVVJFXzJELCB0aGlzLm1ldGFiYWxsc1RleHR1cmUpO1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gMDtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2hhZGVySW5mby50ZXh0dXJlRGltZW5zaW9ucy53aWR0aDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnNoYWRlckluZm8udGV4dHVyZURpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgIC8vIE5vdGUgdGhhdCBpbiBXZWJHTCwgY29udHJhcnkgdG8gT3BlbkdMLCB5b3UgaGF2ZSB0byBleHBsaWNpdGx5XHJcbiAgICAgICAgLy8gY2FsbCBnZXRFeHRlbnNpb24gYmVmb3JlIHlvdSBjYW4gdXNlIGFuIGV4dGVuc2lvbixcclxuICAgICAgICAvLyBsaWtlIE9FU190ZXh0dXJlX2Zsb2F0LiBBbmQgdGhlbiB5b3Ugd2FudCB0byBwYXNzXHJcbiAgICAgICAgLy8gZ2wuRkxPQVQgYXMgdGhlIHR5cGUgcGFyYW1ldGVyIHRvIHRleEltYWdlMkQuXHJcbiAgICAgICAgY29uc3QgZmxvYXRfdGV4dHVyZV9leHQgPSB0aGlzLkdMLmdldEV4dGVuc2lvbignT0VTX3RleHR1cmVfZmxvYXQnKTtcclxuICAgICAgICAvLyBUT0RPOiBUZXN0IHRoaXMgaWYgbm90IHN1cHBvcnRlZCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvT0VTX3RleHR1cmVfaGFsZl9mbG9hdFxyXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI4ODI3NTExL3dlYmdsLWlvcy1yZW5kZXItdG8tZmxvYXRpbmctcG9pbnQtdGV4dHVyZVxyXG4gICAgICAgIC8vIGh0dHBzOi8vd2ViZ2wyZnVuZGFtZW50YWxzLm9yZy93ZWJnbC9sZXNzb25zL3dlYmdsMS10by13ZWJnbDIuaHRtbFxyXG4gICAgICAgIGlmIChmbG9hdF90ZXh0dXJlX2V4dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKCdPRVNfdGV4dHVyZV9mbG9hdCBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgICAgIHRocm93ICdPRVNfdGV4dHVyZV9mbG9hdCBub3Qgc3VwcG9ydGVkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGlzIHRvIGEgZnVuY3Rpb24gd2hpY2ggY29udmVydHMgU3lzdGVtU3RhdGUgYW5kIFN5c3RlbVBhcmFtZXRlcnMgaW50byBhIGNodW5rIG9mIHRleHR1cmUgZGF0YSB0b1xyXG4gICAgICAgIC8vIHNlbmQgcG9zaXRpb25zIHRvIGdwdS5cclxuICAgICAgICB0aGlzLnRleHR1cmVEYXRhID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnNwaFN0YXRlLnBpeGVsc0NvdW50ICogNCk7XHJcbiAgICAgICAgZ2V0VGV4dHVyZURhdGEodGhpcy50ZXh0dXJlRGF0YSwgdGhpcy5zcGhTdGF0ZSwgdGhpcy5zcGhQYXJhbWV0ZXJzKTtcclxuICAgICAgICB0aGlzLkdMLnRleEltYWdlMkQodGhpcy5HTC5URVhUVVJFXzJELCBsZXZlbCwgdGhpcy5HTC5SR0JBLCB3aWR0aCwgaGVpZ2h0LCAwLCB0aGlzLkdMLlJHQkEsIHRoaXMuR0wuRkxPQVQsIHRoaXMudGV4dHVyZURhdGEpO1xyXG4gICAgICAgIHRoaXMuR0wudGV4UGFyYW1ldGVyaSh0aGlzLkdMLlRFWFRVUkVfMkQsIHRoaXMuR0wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLkdMLk5FQVJFU1QpO1xyXG4gICAgICAgIHRoaXMuR0wudGV4UGFyYW1ldGVyaSh0aGlzLkdMLlRFWFRVUkVfMkQsIHRoaXMuR0wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLkdMLk5FQVJFU1QpO1xyXG4gICAgICAgIHRoaXMuR0wuYmluZFRleHR1cmUodGhpcy5HTC5URVhUVVJFXzJELCBudWxsKTtcclxuXHJcbiAgICAgICAgLy8gUGFzc2luZyBtZXRhYmFsbHMgcG9zaXRpb25zIHRvIHRleHR1cmUgdW5pdCAxIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgMCBqdXN0IGZvciBmdW5cclxuICAgICAgICAvLyBGb3IgbW9yZSBkZXRhaWxzIG9uIHRleHR1cmUgdW5pdHMgYW5kIHRleHR1cmUgdGFyZ2V0cyBzZWU6XHJcbiAgICAgICAgLy8gaHR0cHM6Ly93ZWJnbDJmdW5kYW1lbnRhbHMub3JnL3dlYmdsL2xlc3NvbnMvd2ViZ2wtdGV4dHVyZS11bml0cy5odG1sXHJcbiAgICAgICAgdGhpcy5HTC5hY3RpdmVUZXh0dXJlKHRoaXMuR0wuVEVYVFVSRTEpO1xyXG4gICAgICAgIHRoaXMuR0wuYmluZFRleHR1cmUodGhpcy5HTC5URVhUVVJFXzJELCB0aGlzLm1ldGFiYWxsc1RleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuR0wudW5pZm9ybTFpKHRoaXMuR0wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgJ21ldGFiYWxsc1Bvc2l0aW9ucycpLCAxKTtcclxuXHJcbiAgICAgICAgLy8gQnkgZGVmYXVsdCBzZXRzIHRoZSBmaXJzdCBlbGVtZW50IG9uIHRoZSBwYWxldHRlcyBhcnJheVxyXG4gICAgICAgIHRoaXMuc2V0dXBDb2xvclBhbGV0dGUodGhpcy5jb2xvclBhbGV0dGUpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBWaXN1YWxpemF0aW9uUmFkaXVzKHRoaXMudmlzdWFsaXphdGlvblJhZGl1cyk7XHJcbiAgICAgICAgLy8gZHJhdyB0cmlhbmdsZXMgc3BlY2lmaWVkIGluIHNldHVwKCkgbWV0aG9kXHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIC8vIHRoaXMuZHJhd01lc2goKTtcclxuICAgICAgICB0aGlzLmlzU2V0dGluZ1VwID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbG9vcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1NldHRpbmdVcCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLkZQUyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tb3VzZVBvc2l0aW9uKTtcclxuICAgICAgICBjb21wdXRlQWNjZWxlcmF0aW9uKHRoaXMuc3BoU3RhdGUsIHRoaXMuc3BoUGFyYW1ldGVycyk7XHJcbiAgICAgICAgbGVhcGZyb2dTdGVwKHRoaXMuc3BoU3RhdGUsIHRoaXMuc3BoUGFyYW1ldGVycy5kdCk7XHJcbiAgICAgICAgaWYgKHRoaXMubW91c2VJbnRlcmFjdGlvbkVuYWJsZWQpXHJcbiAgICAgICAgICAgIC8vIE1vdmUgaG9yaXpvbnRhbCBsaW5lIGJ5IHVzaW5nIG1vdXNlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB0eCA9IHRoaXMubW91c2VQb3NpdGlvbi54IC8gdGhpcy5HTC5kcmF3aW5nQnVmZmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwdHkgPSAxIC0gKHRoaXMubW91c2VQb3NpdGlvbi55IC8gdGhpcy5HTC5kcmF3aW5nQnVmZmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJlZmxlY3RIb3Jpem9udGFsTGluZU9ic3RhY2xlKHRoaXMuc3BoU3RhdGUsIHB0eCwgcHR5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlZmxlY3RIb3Jpem9udGFsTGluZU9ic3RhY2xlKHRoaXMuc3BoU3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgZ2V0VGV4dHVyZURhdGEodGhpcy50ZXh0dXJlRGF0YSwgdGhpcy5zcGhTdGF0ZSwgdGhpcy5zcGhQYXJhbWV0ZXJzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLkZQUyk7XHJcbiAgICAgICAgLy8gdW5pdCB0ZXh0dXJlIGFuZCB0ZXh0dXJlIHdlcmUgYmluZGVkIGluIHRoZSBzZXR1cFxyXG4gICAgICAgIGNvbnN0IGxldmVsID0gMDtcclxuICAgICAgICB0aGlzLkdMLnRleEltYWdlMkQodGhpcy5HTC5URVhUVVJFXzJELCBsZXZlbCwgdGhpcy5HTC5SR0JBLCB0aGlzLnNoYWRlckluZm8udGV4dHVyZURpbWVuc2lvbnMud2lkdGgsIHRoaXMuc2hhZGVySW5mby50ZXh0dXJlRGltZW5zaW9ucy5oZWlnaHQsIDAsIHRoaXMuR0wuUkdCQSwgdGhpcy5HTC5GTE9BVCwgdGhpcy50ZXh0dXJlRGF0YSk7XHJcbiAgICAgICAgdGhpcy5kcmF3TWVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uUmVzaXplIGdldHMgY2FsbGVkIGJlZm9yZSBhbmQgYWZ0ZXIgc2V0dXBcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZXdwb3JTaXplID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMudmlld3BvclNpemUgPSBuZXcgRmxvYXQzMkFycmF5KDIpO1xyXG5cclxuICAgICAgICAvLyBzaW5jZSB0aGlzIG1ldGhvZCBnZXRzIGNhbGxlZCBiZWZvcmUgdGhlIHNldHVwLlxyXG4gICAgICAgIC8vIGl0IGlzIHBvc3NpYmxlIHRoYXQgdGhlIHByb2dyYW0gaGFzbid0IGJlZW4gY3JlYXRlZCB5ZXRcclxuICAgICAgICBpZiAodGhpcy5tZXRhYmFsbHNQcm9ncmFtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3cG9yU2l6ZVswXSA9IHRoaXMuR0wuZHJhd2luZ0J1ZmZlcldpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdwb3JTaXplWzFdID0gdGhpcy5HTC5kcmF3aW5nQnVmZmVySGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3cG9yU2l6ZUhhbmRsZSA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgJ3ZpZXdwb3J0U2l6ZScsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkdMLnVuaWZvcm0yZnYodmlld3BvclNpemVIYW5kbGUsIHRoaXMudmlld3BvclNpemUpO1xyXG4gICAgICAgICAgICAvLyBkcmF3IHRyaWFuZ2xlcyBzcGVjaWZpZWQgaW4gc2V0dXAoKSBtZXRob2RcclxuICAgICAgICAgICAgLy8gZ2xVbmlmb3JtWFhYIHNob3VsZCBiZSBhZnRlciBnbFVzZVByb2dyYW0gYW5kIGJlZm9yZSBkcmF3aW5nIGFueXRoaW5nLlxyXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgdW5pZm9ybXMgd29udCBiZSB1cGRhdGVkIGluIHRoZSBzaGFkZXIgcHJvZ3JhbVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01lc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdW5sb2FkICgpIHtcclxuICAgICAgICAvLyByZW1vdmUgdW5pZm9ybXMgbG9jYXRpb25zIGNhY2hlXHJcbiAgICAgICAgc3VwZXIudW5sb2FkKCk7XHJcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBjcmVhdGVkIHJlbGVhc2Ugc3BoU3RhdGUgYXJyYXlzIGFuZCBvdGhlciByZXNvdXJjZXNcclxuICAgICAgICBpZiAodGhpcy5zcGhTdGF0ZSkge1xyXG4gICAgICAgICAgICBmcmVlU3RhdGUodGhpcy5zcGhTdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BoU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zcGhQYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGZyZWVQYXJhbWV0ZXJzKHRoaXMuc3BoUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BoUGFyYW1ldGVycyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRldGFjaCBjdXJyZW50bHkgYXR0YWNoZWQgc2hhZGVyc1xyXG4gICAgICAgIC8vIFRPRE86IENoZWNrIGlmIHRoaXMgc2hhZGVyIGlzIGF0dGFjaGVkIHRvIGN1cnJlbnQgcHJvZ3JhbVxyXG4gICAgICAgIHRoaXMuR0wuZGV0YWNoU2hhZGVyKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgdGhpcy5tZXRhYmFsbHNTaGFkZXIpO1xyXG4gICAgICAgIHRoaXMuR0wuZGV0YWNoU2hhZGVyKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgdGhpcy52ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgICAgIHZhciBudW1UZXh0dXJlVW5pdHMgPSB0aGlzLkdMLmdldFBhcmFtZXRlcih0aGlzLkdMLk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTKTtcclxuICAgICAgICBmb3IgKHZhciB1bml0ID0gMDsgdW5pdCA8IG51bVRleHR1cmVVbml0czsgKyt1bml0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuR0wuYWN0aXZlVGV4dHVyZSh0aGlzLkdMLlRFWFRVUkUwICsgdW5pdCk7XHJcbiAgICAgICAgICAgIHRoaXMuR0wuYmluZFRleHR1cmUodGhpcy5HTC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5HTC5iaW5kQnVmZmVyKHRoaXMuR0wuQVJSQVlfQlVGRkVSLCBudWxsKTtcclxuICAgICAgICB0aGlzLkdMLmRlbGV0ZVRleHR1cmUodGhpcy5tZXRhYmFsbHNUZXh0dXJlKTtcclxuICAgICAgICB0aGlzLkdMLmRlbGV0ZUJ1ZmZlcih0aGlzLnZlcnRleEJ1ZmZlcik7XHJcbiAgICAgICAgdGhpcy5HTC5kZWxldGVQcm9ncmFtKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2ltdWxhdGlvblBhcmFtZXRlcnMgKHBhcmFtZXRlcnM6IFN5c3RlbVBhcmFtZXRlcnMpIHtcclxuICAgICAgICB0aGlzLmlzU2V0dGluZ1VwID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVubG9hZCgpO1xyXG4gICAgICAgIHRoaXMuc3BoUGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcclxuICAgICAgICB0aGlzLmlzU2V0dGluZ1VwID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Vycm9yIChtZXNzYWdlOnN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dhcm5pbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JEZXRhaWxzU3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvci1kZXRhaWxzJyk7XHJcbiAgICAgICAgZXJyb3JEZXRhaWxzU3Bhbi5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIGNsYXNzaWUuYWRkKHRoaXMuY2FudmFzLCAnaGlkZScpO1xyXG4gICAgICAgIGNsYXNzaWUucmVtb3ZlKGVycm9yRGl2LCAnaGlkZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGZyb20gdWkvaW5kZXhcclxuICAgICAqIEBwYXJhbSBwYWxldHRlIFRoZSBuZXcgY29sb3IgcGFsZXRlIHRvIHVzZVxyXG4gICAgICovXHJcbiAgICBzZXR1cENvbG9yUGFsZXR0ZSAocGFsZXR0ZTpDb2xvclBhbGV0dGUpIHtcclxuICAgICAgICBjb25zdCBza3kxSGFuZGxlciA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgJ3BhbGV0dGUuc2t5MScpO1xyXG4gICAgICAgIGNvbnN0IHNreTJIYW5kbGVyID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5tZXRhYmFsbHNQcm9ncmFtLCAncGFsZXR0ZS5za3kyJyk7XHJcbiAgICAgICAgY29uc3QgZHJvcENvbG9ySGFuZGxlciA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgJ3BhbGV0dGUuZHJvcENvbG9yJyk7XHJcblxyXG4gICAgICAgIHRoaXMuR0wudW5pZm9ybTRmdihza3kxSGFuZGxlciwgcGFsZXR0ZS5za3kxLnRvQXJyYXkoKSk7XHJcbiAgICAgICAgdGhpcy5HTC51bmlmb3JtNGZ2KHNreTJIYW5kbGVyLCBwYWxldHRlLnNreTIudG9BcnJheSgpKTtcclxuICAgICAgICB0aGlzLkdMLnVuaWZvcm00ZnYoZHJvcENvbG9ySGFuZGxlciwgcGFsZXR0ZS5kcm9wQ29sb3IudG9BcnJheSgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xvclBhbGV0dGUgPSBwYWxldHRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwVmlzdWFsaXphdGlvblJhZGl1cyh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAvLyBUT0RPOiBDYWNoZSB1bmlmb3JtIGxvY2F0aW9uXHJcbiAgICAgICAgY29uc3QgcmFkaXVzSGFuZGxlciA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSwgJ3InKTtcclxuICAgICAgICB0aGlzLkdMLnVuaWZvcm0xZihyYWRpdXNIYW5kbGVyLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlzdWFsaXphdGlvblJhZGl1cyA9IHZhbHVlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3lzdGVtUGFyYW1ldGVycywgQ29sb3JQYWxldHRlLCB2ZWM0IH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgb2JqZWN0IHNob3VsZG4ndCBiZSBtb2RpZmllZCBkaXJlY3RseSwgaW5zdGVhZCB1c2UgdGhlIFxyXG4gKiBnZXRQYXJhbWV0ZXJzKCkgZnVuY3Rpb24gb24gc3BoL2luZGV4LnRzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdFBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycyA9IHtcclxuICAgIGR0OiAxZS0yLFxyXG4gICAgLy8gaDogMy4yZS0yLFxyXG4gICAgaDogNGUtMSxcclxuICAgIG1heFBhcnRpY2xlQ291bnQ6IC0xLFxyXG4gICAgLy8gaDogN2UtMSxcclxuICAgIC8vIG1ldGFiYWxsUmFkaXVzOiA4LFxyXG4gICAgbWV0YWJhbGxSYWRpdXM6IDAuMDA2MjUsIC8vIDgvMTI4MFxyXG4gICAgcmhvMDogMTAwMCwgLy8gb3JpZ2luYWxseSAxMDAwICh3YXRlciBkZW5zaXR5IGlzIDEwMDApXHJcbiAgICBrOiAxZTMsIC8vIGJ1bGsgbW9kdWx1c1xyXG4gICAgbXU6IDAuMSwgLy8gdmlzY29zaXR5XHJcbiAgICBnOiA5LjgsXHJcbiAgICBtaW5YQWNjZWxlcmF0aW9uOiAtNSxcclxuICAgIG1heFhBY2NlbGVyYXRpb246IDVcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwYWxldHRlczpDb2xvclBhbGV0dGVbXSA9IFtcclxuICAgIG5ldyBDb2xvclBhbGV0dGUoXHJcbiAgICAgICAgdmVjNC5mcm9tSGV4Q29sb3IoMHgwMjQxN0IpLFxyXG4gICAgICAgIHZlYzQuZnJvbUhleENvbG9yKDB4MDc1MTlCKSxcclxuICAgICAgICB2ZWM0LmZyb21IZXhDb2xvcigweDAwOURGRilcclxuICAgICksXHJcbiAgICBuZXcgQ29sb3JQYWxldHRlKFxyXG4gICAgICAgIHZlYzQuZnJvbUhleENvbG9yKDB4MjlCQkFFKSxcclxuICAgICAgICB2ZWM0LmZyb21IZXhDb2xvcigweDBDQjNBMiksXHJcbiAgICAgICAgdmVjNC5mcm9tSGV4Q29sb3IoMHhDMEQzNDYpXHJcbiAgICApLFxyXG4gICAgbmV3IENvbG9yUGFsZXR0ZShcclxuICAgICAgICB2ZWM0LmZyb21IZXhDb2xvcigweEZGM0UyMyksXHJcbiAgICAgICAgdmVjNC5mcm9tSGV4Q29sb3IoMHhGRTNFMjMpLFxyXG4gICAgICAgIHZlYzQuZnJvbUhleENvbG9yKDB4RkVDMjIzKVxyXG4gICAgKVxyXG5dOyIsImV4cG9ydCBjbGFzcyB2ZWM0IHtcclxuICAgIHN0YXRpYyBmcm9tSGV4Q29sb3IgKGhleENvbG9yOm51bWJlcik6dmVjNCB7XHJcbiAgICAgICAgY29uc3QgbWF4ID0gMjU1O1xyXG4gICAgICAgIGNvbnN0IHIgPSAoK2hleENvbG9yID4+IDE2KSAvIG1heDtcclxuICAgICAgICBjb25zdCBnID0gKCgraGV4Q29sb3IgJiAweDAwRkYwMCkgPj4gOCkgLyBtYXg7XHJcbiAgICAgICAgY29uc3QgYiA9ICgraGV4Q29sb3IgJiAweDAwMDBGRikgLyBtYXg7XHJcbiAgICAgICAgcmV0dXJuIG5ldyB2ZWM0KHIsIGcsIGIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIgPSAwLCBwdWJsaWMgeTogbnVtYmVyID0gMCwgcHVibGljIHo6IG51bWJlciA9IDAsIHB1YmxpYyB3OiBudW1iZXIgPSAxKSB7XHJcbiAgICB9XHJcblxyXG4gICAgdG9BcnJheSgpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLnddO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBza3kxIEJhY2tncm91bmQncyBob3Jpem9udGFsIGxpbmVhciBncmFkaWVudCBzdGFydCBjb2xvclxyXG4gICAgICogQHBhcmFtIHNreTIgQmFja2dyb3VuZCdzIGhvcml6b250YWwgbGluZWFyIGdyYWRpZW50IGVuZCBjb2xvclxyXG4gICAgICogQHBhcmFtIGRyb3BDb2xvciBDb2xvciBvZiB0aGUgd2F0ZXIgZHJvcFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc2t5MTogdmVjNCwgcHVibGljIHNreTI6IHZlYzQsIHB1YmxpYyBkcm9wQ29sb3I6IHZlYzQpIHsgfVxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNZXRhYmFsbHNTaGFkZXJJbmZvIHtcclxuICAgIHNoYWRlclNvdXJjZTogc3RyaW5nLFxyXG4gICAgdGV4dHVyZURpbWVuc2lvbnM6IERpbWVuc2lvblxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaW1lbnNpb24ge1xyXG4gICAgd2lkdGg6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbn07XHJcblxyXG4vKipcclxuICogSG9sZHMgdGhlIHBhcmFtZXRlcnMgdGhhdCBkZXNjcmliZSB0aGUgc2ltdWxhdGlvblxyXG4gKiBUaGVzZSBwYXJhbWV0ZXJzIGFyZSBmaWxsZWQgaW4gYnkgdGhlIGdldFBhcmFtcyBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTeXN0ZW1QYXJhbWV0ZXJzIHtcclxuICAgIFtpbmRleDpzdHJpbmddOiBhbnksXHJcbiAgICAvKipcclxuICAgICAqIFBhcnRpY2xlIHJhZGl1cyBmb3IgdXNpbmcgb24gdGhlIHNpbXVsYXRpb24gY29tcHV0YXRpb25zXHJcbiAgICAgKi9cclxuICAgIGg6IG51bWJlcixcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHBhcnRpY2xlIHJhZGl1cyBvbiB2aWV3cG9ydCBzcGFjZSBmb3IgdXNpbmcgb24gdmlzdWFsaXphdGlvblxyXG4gICAgICovXHJcbiAgICBtZXRhYmFsbFJhZGl1czogbnVtYmVyLFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lIHN0ZXBcclxuICAgICAqL1xyXG4gICAgZHQ6IG51bWJlcixcclxuICAgIC8qKlxyXG4gICAgICogUmVmZXJlbmNlIGRlbnNpdHlcclxuICAgICAqL1xyXG4gICAgcmhvMDogbnVtYmVyLFxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWxrIG1vZHVsdXNcclxuICAgICAqL1xyXG4gICAgazogbnVtYmVyLFxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXNjb3NpdHlcclxuICAgICAqL1xyXG4gICAgbXU6IG51bWJlcixcclxuICAgIC8qKlxyXG4gICAgICogR3Jhdml0eSBzdHJlbmd0aFxyXG4gICAgICovXHJcbiAgICBnOiBudW1iZXIsXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtaW5pbXVtIHJhbmRvbSB4IGFjY2VsZXJhdGlvbiBmb3IgZWFjaCBwYXJ0aWNsZVxyXG4gICAgICovXHJcbiAgICBtaW5YQWNjZWxlcmF0aW9uOiBudW1iZXIsXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYXhpbXVtIHJhbmRvbSB4IGFjY2VsZXJhdGlvbiBmb3IgZWFjaCBwYXJ0aWNsZVxyXG4gICAgICovXHJcbiAgICBtYXhYQWNjZWxlcmF0aW9uOiBudW1iZXIsXHJcbiAgICBtYXhQYXJ0aWNsZUNvdW50OiBudW1iZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5pZm9ybUxvY2F0aW9uc0NhY2hlIHtcclxuICAgIFtpbmRleDogc3RyaW5nXTogV2ViR0xVbmlmb3JtTG9jYXRpb24sXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBob2xkcyB0aGUgaW5mb3JtYXRpb24gZm9yIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZVxyXG4gKiBzeXN0ZW0gYW5kIG9mIHRoZSBpbnRlZ3JhdGlvbiBhbGdvcml0aG0uXHJcbiAqIFxyXG4gKiBUaGUgYWxsb2Mgc3RhdGUgYW5kIGZyZWUgc3RhdGUgZnVuY3Rpb25zIHRha2UgY2FyZSBvZiBzdG9yYWdlIGZvciB0aGUgbG9jYWxcclxuICogc2ltdWxhdGlvbiBzdGF0ZS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3lzdGVtU3RhdGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRleCBzaWduYXR1cmUgdG8gYWxsb3cgaW5zdGFuY2VzIG9mIHRoaXMgaW50ZXJmYWNlIHRvIGJlIGFjY2VzZWQgYnkgdXNpbmcgb2JqW2tleV0gc2lnbmF0dXJlXHJcbiAgICAgKi9cclxuICAgIFtpbmRleDogc3RyaW5nXTogYW55LFxyXG4gICAgLyoqXHJcbiAgICAgKiAgTnVtYmVyIG9mIHBhcnRpY2xlc1xyXG4gICAgICovXHJcbiAgICBuOiBudW1iZXIsXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBwaXhlbHMgcmVxdWlyZWQgdG8gc2F2ZSBhbGwgdGhlIHBhcnRpY2xlcyBpbmZvcm1hdGlvblxyXG4gICAgICogaW50byBhIHBvd2VyIG9mIDIgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwaXhlbHNDb3VudDogbnVtYmVyLFxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJ0aWNsZSBtYXNzXHJcbiAgICAgKi9cclxuICAgIG1hc3M6IG51bWJlcixcclxuICAgIC8qKlxyXG4gICAgICogRGVuc2l0aWVzXHJcbiAgICAgKi9cclxuICAgIHJobzogbnVtYmVyW10sXHJcbiAgICAvKipcclxuICAgICAqIFBvc2l0aW9uc1xyXG4gICAgICovXHJcbiAgICB4OiBudW1iZXJbXSxcclxuICAgIC8qKlxyXG4gICAgICogVmVsb2NpdGllcyAoaGFsZiBzdGVwKVxyXG4gICAgICovXHJcbiAgICB2aDogbnVtYmVyW10sXHJcbiAgICAvKipcclxuICAgICAqIFZlbG9jaXRpZXMgKGZ1bGwgc3RlcClcclxuICAgICAqL1xyXG4gICAgdjogbnVtYmVyW10sXHJcbiAgICAvKipcclxuICAgICAqIEFjY2VsZXJhdGlvblxyXG4gICAgICovXHJcbiAgICBhOiBudW1iZXJbXVxyXG59XHJcblxyXG4vKipcclxuICogd2UgZGVmaW5lIHRoZSBpbml0aWFsIGdlb21ldHJ5IG9mIHRoZSBmbHVpZCBpbiB0ZXJtcyBvZiBhbiBpbmRpY2F0b3IgZnVuY3Rpb25cclxuICogdGhhdCBpcyBvbmUgZm9yIHBvaW50cyBpbiB0aGUgZG9tYWluIG9jY3VwaWVkIGJ5IGZsdWlkIGFuZCB6ZXJvIGVsc2V3aGVyZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JGdW5jdGlvbiB7XHJcbiAgICAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBvc2l0aW9uIHtcclxuICAgIHg6IG51bWJlcixcclxuICAgIHk6IG51bWJlclxyXG59OyIsImltcG9ydCB7IENvbG9yUGFsZXR0ZSwgdmVjNCwgU3lzdGVtUGFyYW1ldGVycyB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgTWFpbkdhbWUgfSBmcm9tICcuLi9zcGgvbWFpbic7XHJcbmltcG9ydCB7IGdldFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcGgvaW5kZXgnO1xyXG5pbXBvcnQgeyBwYWxldHRlcyB9IGZyb20gJy4uL3NwaC9wYXJhbWV0ZXJzJztcclxuY29uc3QgY2xhc3NpZSA9IHJlcXVpcmUoJy4uL3ZlbmRvcnMvY2xhc3NpZScpO1xyXG5cclxubGV0IGJvZHk6SFRNTEVsZW1lbnQ7XHJcbmxldCBvcGVuQnV0dG9uOkhUTUxFbGVtZW50O1xyXG5sZXQgcmVzZXRCdXR0b246SFRNTEVsZW1lbnQ7XHJcbmxldCBjb250YWluZXI6SFRNTEVsZW1lbnQ7XHJcbmxldCBjYW52YXM6SFRNTEVsZW1lbnQ7XHJcbmxldCBjb2xvclBhaXJzOkFycmF5PEhUTUxFbGVtZW50PjtcclxubGV0IHBhcnRpY2xlUmFkaXVzSW5wdXQ6SFRNTElucHV0RWxlbWVudDtcclxubGV0IHBhcnRpY2xlc0NvdW50SW5wdXQ6SFRNTElucHV0RWxlbWVudDtcclxubGV0IG1vdXNlSW50ZXJhY3Rpb25JbnB1dDpIVE1MSW5wdXRFbGVtZW50O1xyXG5sZXQgZnBzSW5mbzpIVE1MRWxlbWVudDtcclxubGV0IG1haW5HYW1lOk1haW5HYW1lO1xyXG5cclxuY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAvKipcclxuICAgICAqIElzIHNldHRpbmdzIG1lbnUgb3BlbmVkXHJcbiAgICAgKi9cclxuICAgIGlzT3BlbjogZmFsc2UsXHJcbiAgICBwcmV2Q29sb3JQYWxldHRlSW5kZXg6IDAsXHJcbiAgICBjb2xvclBhbGV0dGVJbmRleDogMCxcclxuICAgIGN1cnJlbnRQYWxldHRlOiBwYWxldHRlc1swXSxcclxuICAgIHBhcnRpY2xlUmFkaXVzQ29tcHV0aW5nOiAwLjA3LFxyXG4gICAgcGFydGljbGVSYWRpdXNWaXN1YWxpemF0aW9uOiAwLjAwNjI1LFxyXG4gICAgbWF4UGFydGljbGVDb3VudDogMTAwXHJcbn07XHJcblxyXG4vLyB0aGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIHVpIGxvZ2ljXHJcbi8vIFRPRE86IERlY2lkZSB3aGV0ZXIgdXNlIEFwcCBvciBNYWluR2FtZSBjbGFzc1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFVJIChzaW11bGF0aW9uOk1haW5HYW1lKSB7XHJcbiAgICBtYWluR2FtZSA9IHNpbXVsYXRpb247XHJcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIG9wZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKTtcclxuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXItZmx1aWQnKTtcclxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluQ2FudmFzJyk7XHJcbiAgICBmcHNJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zwcy1pbmZvJyk7XHJcbiAgICBwYXJ0aWNsZVJhZGl1c0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJ0aWNsZS1yYWRpdXMtdmlzdWFsaXphdGlvbi1zZXR1cCcpO1xyXG4gICAgcGFydGljbGVzQ291bnRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFydGljbGVzLWNvdW50Jyk7XHJcbiAgICBtb3VzZUludGVyYWN0aW9uSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuYWJsZS1tb3VzZS1pbnRlcmFjdGlvbicpO1xyXG4gICAgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwbHktYnV0dG9uJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYW1ldGVyczpTeXN0ZW1QYXJhbWV0ZXJzID0gZ2V0UGFyYW1ldGVycygpO1xyXG4gICAgcGFydGljbGVSYWRpdXNJbnB1dC52YWx1ZSA9IHBhcmFtZXRlcnMubWV0YWJhbGxSYWRpdXMrJyc7XHJcbiAgICAvLyBwYXJ0aWNsZXNDb3VudElucHV0LnZhbHVlID0gcGFyYW1ldGVycy5oKycnO1xyXG4gICAgY29sb3JQYWlycyA9IFtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itb3B0aW9uLTEnKSxcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itb3B0aW9uLTInKSxcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itb3B0aW9uLTMnKSxcclxuICAgIF1cclxuICAgIGluaXRFdmVudHMoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvb3BVSSAoKSB7XHJcbiAgICBpZiAobWFpbkdhbWUpXHJcbiAgICAgICAgZnBzSW5mby5pbm5lckhUTUwgPSBtYWluR2FtZS5GUFMudG9GaXhlZCgyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ29sb3JQYWxldHRlICgpIHtcclxuICAgIG1haW5HYW1lLnNldHVwQ29sb3JQYWxldHRlKHN0YXRlLmN1cnJlbnRQYWxldHRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUGFydGljbGVSYWRpdXNWaXN1YWxpemF0aW9uICgpIHtcclxuICAgIGNvbnN0IHZhbHVlOm51bWJlciA9ICtwYXJ0aWNsZVJhZGl1c0lucHV0LnZhbHVlO1xyXG4gICAgbWFpbkdhbWUuc2V0dXBWaXN1YWxpemF0aW9uUmFkaXVzKHZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEV2ZW50cyAoKSB7XHJcbiAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlTWVudSk7XHJcblxyXG4gICAgLy8gY2xvc2UgdGhlIG1lbnUgZWxlbWVudCBpZiB0aGUgdGFyZ2V0IGl0wrRzIG5vdCB0aGUgbWVudSBlbGVtZW50IG9yIG9uZSBvZiBpdHMgZGVzY2VuZGFudHMuLlxyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmIChzdGF0ZS5pc09wZW4gJiYgdGFyZ2V0ID09PSBjYW52YXMpIHtcclxuICAgICAgICAgICAgdG9nZ2xlTWVudSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb2xvclBhaXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0Q29sb3JQYWxldHRlLCBmYWxzZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIE9uIHZhbHVlIGNoYW5nZVxyXG4gICAgcGFydGljbGVSYWRpdXNJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZVBhcnRpY2xlUmFkaXVzVmlzdWFsaXphdGlvbik7XHJcbiAgICBwYXJ0aWNsZXNDb3VudElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25SZXNldCk7XHJcbiAgICBtb3VzZUludGVyYWN0aW9uSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBtb3VzZUludGVyYWN0aW9uQ2hhbmdlKTtcclxuICAgIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25SZXNldCk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3RDb2xvclBhbGV0dGUgKGV2ZW50Ok1vdXNlRXZlbnQpIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IDxIVE1MRWxlbWVudD4gZXZlbnQudGFyZ2V0O1xyXG4gICAgY29uc3QgaWR4ID0gK3RhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zaXRpb24nKTtcclxuICAgIHN0YXRlLmNvbG9yUGFsZXR0ZUluZGV4ID0gaWR4O1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBjb2xvci1wYWlyLXNlbGVjdGVkIGNsYXNzIHRvIGFsbCBjb2xvciBwYWxldGVzXHJcbiAgICBjbGFzc2llLnJlbW92ZSggY29sb3JQYWlyc1tzdGF0ZS5wcmV2Q29sb3JQYWxldHRlSW5kZXhdLCAnY29sb3ItcGFpci1zZWxlY3RlZCcgKTtcclxuICAgIGNsYXNzaWUuYWRkKCBjb2xvclBhaXJzW3N0YXRlLmNvbG9yUGFsZXR0ZUluZGV4XSwgJ2NvbG9yLXBhaXItc2VsZWN0ZWQnICk7XHJcbiAgICBzdGF0ZS5wcmV2Q29sb3JQYWxldHRlSW5kZXggPSBzdGF0ZS5jb2xvclBhbGV0dGVJbmRleDtcclxuICAgIHN0YXRlLmN1cnJlbnRQYWxldHRlID0gcGFsZXR0ZXNbc3RhdGUuY29sb3JQYWxldHRlSW5kZXhdO1xyXG4gICAgdXBkYXRlQ29sb3JQYWxldHRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdXNlSW50ZXJhY3Rpb25DaGFuZ2UgKCkge1xyXG4gICAgbWFpbkdhbWUubW91c2VJbnRlcmFjdGlvbkVuYWJsZWQgPSBtb3VzZUludGVyYWN0aW9uSW5wdXQuY2hlY2tlZDtcclxufVxyXG5cclxuZnVuY3Rpb24gb25SZXNldCAoKSB7XHJcbiAgICAvLyBJIGtub3cgaSdtIG5vdCBjaGVja2luZyB0aGUgdmFsdWVzIG9uIHRob3NlIGlucHV0cyBidXQgY29tZSBvbiwgdGhpcyBpcyBub3QgYSBiYW5rIGFwcGxpY2F0aW9uXHJcbiAgICBjb25zdCBuZXdQYXJhbWV0ZXJzOlN5c3RlbVBhcmFtZXRlcnMgPSBPYmplY3QuYXNzaWduKGdldFBhcmFtZXRlcnMoKSwge1xyXG4gICAgICAgIGg6ICtwYXJ0aWNsZXNDb3VudElucHV0LnZhbHVlXHJcbiAgICB9KTtcclxuICAgIG1haW5HYW1lLmNoYW5nZVNpbXVsYXRpb25QYXJhbWV0ZXJzKG5ld1BhcmFtZXRlcnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVNZW51ICgpIHtcclxuICAgIGlmIChzdGF0ZS5pc09wZW4pIHtcclxuICAgICAgICBjbGFzc2llLnJlbW92ZSggYm9keSwgJ3Nob3ctbWVudScgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xhc3NpZS5hZGQoIGJvZHksICdzaG93LW1lbnUnICk7XHJcbiAgICB9XHJcbiAgICBzdGF0ZS5pc09wZW4gPSAhc3RhdGUuaXNPcGVuO1xyXG59IiwiLyoqXHJcbiAqIEZ1bmN0aW9uIGV4dHJhY3RlZCBmcm9tIGh0dHA6Ly9kZXRlY3Rtb2JpbGVicm93c2Vycy5jb20vXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNNb2JpbGUoKTpib29sZWFuIHtcclxuICAgIGNvbnN0IGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8KDxhbnk+d2luZG93KS5vcGVyYTtcclxuICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vL2kudGVzdChhZ2VudCkgXHJcbiAgICAgICAgICAgIHx8IC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYWdlbnQuc3Vic3RyKDAsNCkpKVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxufSIsIi8qIVxuICogY2xhc3NpZSB2MS4wLjFcbiAqIGNsYXNzIGhlbHBlciBmdW5jdGlvbnNcbiAqIGZyb20gYm9uem8gaHR0cHM6Ly9naXRodWIuY29tL2RlZC9ib256b1xuICogTUlUIGxpY2Vuc2VcbiAqIFxuICogY2xhc3NpZS5oYXMoIGVsZW0sICdteS1jbGFzcycgKSAtPiB0cnVlL2ZhbHNlXG4gKiBjbGFzc2llLmFkZCggZWxlbSwgJ215LW5ldy1jbGFzcycgKVxuICogY2xhc3NpZS5yZW1vdmUoIGVsZW0sICdteS11bndhbnRlZC1jbGFzcycgKVxuICogY2xhc3NpZS50b2dnbGUoIGVsZW0sICdteS1jbGFzcycgKVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gY2xhc3MgaGVscGVyIGZ1bmN0aW9ucyBmcm9tIGJvbnpvIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm9uem9cblxuZnVuY3Rpb24gY2xhc3NSZWcoIGNsYXNzTmFtZSApIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoXnxcXFxccyspXCIgKyBjbGFzc05hbWUgKyBcIihcXFxccyt8JClcIik7XG59XG5cbi8vIGNsYXNzTGlzdCBzdXBwb3J0IGZvciBjbGFzcyBtYW5hZ2VtZW50XG4vLyBhbHRobyB0byBiZSBmYWlyLCB0aGUgYXBpIHN1Y2tzIGJlY2F1c2UgaXQgd29uJ3QgYWNjZXB0IG11bHRpcGxlIGNsYXNzZXMgYXQgb25jZVxudmFyIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3M7XG5cbmlmICggJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICkge1xuICBoYXNDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIHJldHVybiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyggYyApO1xuICB9O1xuICBhZGRDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCggYyApO1xuICB9O1xuICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSggYyApO1xuICB9O1xufVxuZWxzZSB7XG4gIGhhc0NsYXNzID0gZnVuY3Rpb24oIGVsZW0sIGMgKSB7XG4gICAgcmV0dXJuIGNsYXNzUmVnKCBjICkudGVzdCggZWxlbS5jbGFzc05hbWUgKTtcbiAgfTtcbiAgYWRkQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBpZiAoICFoYXNDbGFzcyggZWxlbSwgYyApICkge1xuICAgICAgZWxlbS5jbGFzc05hbWUgPSBlbGVtLmNsYXNzTmFtZSArICcgJyArIGM7XG4gICAgfVxuICB9O1xuICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NOYW1lID0gZWxlbS5jbGFzc05hbWUucmVwbGFjZSggY2xhc3NSZWcoIGMgKSwgJyAnICk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKCBlbGVtLCBjICkge1xuICB2YXIgZm4gPSBoYXNDbGFzcyggZWxlbSwgYyApID8gcmVtb3ZlQ2xhc3MgOiBhZGRDbGFzcztcbiAgZm4oIGVsZW0sIGMgKTtcbn1cblxudmFyIGNsYXNzaWUgPSB7XG4gIC8vIGZ1bGwgbmFtZXNcbiAgaGFzQ2xhc3M6IGhhc0NsYXNzLFxuICBhZGRDbGFzczogYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcbiAgdG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxuICAvLyBzaG9ydCBuYW1lc1xuICBoYXM6IGhhc0NsYXNzLFxuICBhZGQ6IGFkZENsYXNzLFxuICByZW1vdmU6IHJlbW92ZUNsYXNzLFxuICB0b2dnbGU6IHRvZ2dsZUNsYXNzXG59O1xuXG4vLyB0cmFuc3BvcnRcbmlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAvLyBBTURcbiAgZGVmaW5lKCBjbGFzc2llICk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIC8vIENvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gY2xhc3NpZTtcbn0gZWxzZSB7XG4gIC8vIGJyb3dzZXIgZ2xvYmFsXG4gIHdpbmRvdy5jbGFzc2llID0gY2xhc3NpZTtcbn1cblxufSkoIHdpbmRvdyApO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==