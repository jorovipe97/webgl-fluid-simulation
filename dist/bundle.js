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
    function App(glContext, canvasElement) {
        this.GL = glContext;
        this.canvas = canvasElement;
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
        var uniformLocation = this.GL.getUniformLocation(program, name);
        if (uniformLocation === null && !ignoreErrors) {
            throw 'Can not find uniform ' + name + '.';
        }
        return uniformLocation;
    };
    App.prototype.updateDraw = function () {
        this.GL.clearColor(0.0, 0.0, 0.0, 1.0);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
        this.GL.drawArrays(this.GL.TRIANGLE_STRIP, 0, 4);
    };
    // #region API Methods
    App.prototype.setup = function () {
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
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.ts");

var canvas = document.getElementById('mainCanvas');
var gl;
var game;
var elapsedTime;
var deltaTime;
function init() {
    // Initialise WebGL 
    try {
        gl = canvas.getContext('webgl');
    }
    catch (error) {
        console.error(error);
    }
    if (!gl) {
        throw "Cannot create webgl context";
    }
    // MainGame inherits from App, using some polymorphism
    // to ensure not to interact with high level components of the program
    game = new _main__WEBPACK_IMPORTED_MODULE_0__["MainGame"](gl, canvas);
    onResize();
    game.setup();
    onResize();
    render(0);
}
/**
 * The loop function
 */
function render(now) {
    game.elapsedTime = now;
    // See this to compute the delta time and the elapsed by using
    // the request animation frame https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
    game.loop();
    requestAnimationFrame(render);
}
function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var x = 0;
    var y = 0;
    game.viewporWidth = canvas.width;
    game.viewporHeight = canvas.height;
    gl.viewport(x, y, canvas.width, canvas.height);
    game.onResize();
}
// Listen for window resize events
window.addEventListener('resize', onResize);
// Initialize application
init();


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: MainGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainGame", function() { return MainGame; });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.ts");
/* harmony import */ var _sph_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sph/index */ "./src/sph/index.ts");
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


/**
 * This is the entry point of any game logic
 * think of this class as the setup() loop() methods of a processing/openframeworks application
 */
var MainGame = /** @class */ (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.metaballsVelocity = [];
        _this.positions = [];
        return _this;
    }
    MainGame.prototype.setup = function () {
        console.log('setup');
        debugger;
        this.sphParameters = Object(_sph_index__WEBPACK_IMPORTED_MODULE_1__["getParameters"])();
        if (!this.sphParameters)
            throw 'SPH parameters can\'t be null';
        this.sphState = Object(_sph_index__WEBPACK_IMPORTED_MODULE_1__["initParticles"])(this.sphParameters);
        Object(_sph_index__WEBPACK_IMPORTED_MODULE_1__["computeAcceleration"])(this.sphState, this.sphParameters);
        Object(_sph_index__WEBPACK_IMPORTED_MODULE_1__["leapfrogStart"])(this.sphState, this.sphParameters.dt);
        // // https://stackoverflow.com/questions/9046643/webgl-create-texture
        // // Pass metaballs positions to the shader by using a texture 2d
        // const particlesCount = 2 ** 4;
        // for (let i = 0; i < particlesCount; i++) {
        //     var radius = Math.random() * 60 + 10;
        //     this.positions.push([
        //         Math.random()*(this.viewporWidth - 2 * radius),
        //         Math.random()*(this.viewporHeight - 2 * radius + radius),
        //         radius,
        //         0
        //     ]);
        //     this.metaballsVelocity.push([
        //         Math.random()*10 - 5, // vx
        //         Math.random()*10 - 5 // vy
        //     ]);
        // }
        // this.metaballsPositions = new Float32Array(this.positions.flat());
        // this.vertexShader = this.compileShader(defaultVertextShader, this.GL.VERTEX_SHADER);
        // // each metaball has 4 components
        // const metaballsShaderInfo:MetaballsShaderInfo = generateMetaballsShader(this.metaballsPositions.length / 4);
        // this.shaderInfo = metaballsShaderInfo;
        // this.metaballsShader = this.compileShader(metaballsShaderInfo.shaderSource, this.GL.FRAGMENT_SHADER);
        // this.metaballsProgram = this.GL.createProgram();
        // this.GL.attachShader(this.metaballsProgram, this.vertexShader);
        // this.GL.attachShader(this.metaballsProgram, this.metaballsShader);
        // this.GL.linkProgram(this.metaballsProgram);
        // this.GL.useProgram(this.metaballsProgram);
        // // Set up 4 vertices, which we'll draw as a rectangle
        // // via 2 triangles
        // //
        // //   A---C
        // //   |  /|
        // //   | / |
        // //   |/  |
        // //   B---D
        // // Normalize device coordinates space
        // // http://www.learnopengles.com/understanding-opengls-matrices/
        // const vertexData = new Float32Array([
        //     -1.0, 1.0,
        //     -1.0, -1.0,
        //     1.0, 1.0,
        //     1.0, -1.0
        // ]);
        // const vertexDataBuffer = this.GL.createBuffer();
        // this.GL.bindBuffer(this.GL.ARRAY_BUFFER, vertexDataBuffer);
        // this.GL.bufferData(this.GL.ARRAY_BUFFER, vertexData, this.GL.STATIC_DRAW);
        // // To make the geometry information available in the shader as attributes, we
        // // need to tell WebGL what the layout of our data in the vertex buffer is.
        // const positionHandle = this.getAttribLocation(this.metaballsProgram, 'position');
        // this.GL.enableVertexAttribArray(positionHandle);
        // // in c++ this would be done by using typeof(float)
        // const bytesPerComponents = 4; // a float 32 bits number needs 4 bytes
        // const componentCount = 2; // how much components will have
        // const byteSize = componentCount * bytesPerComponents;
        // this.GL.vertexAttribPointer(positionHandle,
        //     componentCount, // position is a vec2
        //     this.GL.FLOAT, // each component is a float
        //     false, // don't normalize values
        //     byteSize, // two 4 byte float components per vertex
        //     0 // the stride, the distance in bytes from the end of current position to the next position
        //     );
        // this.metaballsTexture = this.GL.createTexture();
        // this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        // const level = 0;
        // const width = metaballsShaderInfo.textureDimensions.width;
        // const height = metaballsShaderInfo.textureDimensions.height;
        // // Note that in WebGL, contrary to OpenGL, you have to explicitly
        // // call getExtension before you can use an extension,
        // // like OES_texture_float. And then you want to pass
        // // gl.FLOAT as the type parameter to texImage2D.
        // const float_texture_ext = this.GL.getExtension('OES_texture_float');
        // if (float_texture_ext == null) throw 'OES_texture_float not supported';
        // this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, width, height, 0, this.GL.RGBA, this.GL.FLOAT, this.metaballsPositions);
        // this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MAG_FILTER, this.GL.NEAREST);
        // this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MIN_FILTER, this.GL.NEAREST);
        // this.GL.bindTexture(this.GL.TEXTURE_2D, null);
        // // Passing metaballs positions to texture unit 1 instead of the default 0
        // this.GL.activeTexture(this.GL.TEXTURE1);
        // this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        // this.GL.uniform1i(this.GL.getUniformLocation(this.metaballsProgram, 'metaballsPositions'), 1);
        // // draw triangles specified in setup() method
        // this.updateDraw();
    };
    MainGame.prototype.loop = function () {
        Object(_sph_index__WEBPACK_IMPORTED_MODULE_1__["computeAcceleration"])(this.sphState, this.sphParameters);
        Object(_sph_index__WEBPACK_IMPORTED_MODULE_1__["leapfrogStep"])(this.sphState, this.sphParameters.dt);
        console.log('loop');
        // console.log('loop');
        // for (let i = 0; i < this.positions.length; i++) {
        //     const xId = 4 * i + 0;
        //     const yId = 4 * i + 1;
        //     const rId = 4 * i + 2;
        //     const id = i;
        //     const v = this.metaballsVelocity[id];
        //     let x = this.metaballsPositions[xId];
        //     let y = this.metaballsPositions[yId];
        //     let r = this.metaballsPositions[rId];
        //     let vx = v[0];
        //     let vy = v[1];
        //     x += vx;
        //     y += vy;
        //     if (x + r > this.viewporWidth) {
        //         x = this.viewporWidth - r;
        //         vx = -Math.abs(vx);
        //     } else if (x - r < 0) {
        //         x = r + 1;
        //         vx = Math.abs(vx);
        //     }
        //     if (y + r > this.viewporHeight) {
        //         y = this.viewporHeight - r;
        //         vy = -Math.abs(vy);
        //     } else if (y - r < 0) {
        //         y = r + 1;
        //         vy = Math.abs(vy);
        //     }
        //     this.metaballsPositions[xId] = x;
        //     this.metaballsPositions[yId] = y;
        //     this.metaballsPositions[rId] = r;
        //     v[0] = vx;
        //     v[1] = vy;
        // }
        // // Passing metaballs positions to texture unit 1 instead of the default 0
        // // unit texture and texture was binded in the setup
        // // this.GL.activeTexture(this.GL.TEXTURE1);
        // // this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        // // this.GL.uniform1i(this.GL.getUniformLocation(this.metaballsProgram, 'metaballsPositions'), 1);
        // const level = 0;
        // this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, this.shaderInfo.textureDimensions.width, this.shaderInfo.textureDimensions.height, 0, this.GL.RGBA, this.GL.FLOAT, this.metaballsPositions);
        // this.updateDraw();
    };
    // onResize gets called before and after setup
    MainGame.prototype.onResize = function () {
        console.log('onResize');
        // if (this.viewporSize == null)
        //     this.viewporSize = new Float32Array(2);
        // // since this method gets called before the setup.
        // // it is possible that the program hasn't been created yet
        // if (this.metaballsProgram)
        // {
        //     this.viewporSize[0] = this.canvas.width;
        //     this.viewporSize[1] = this.canvas.height;
        //     const viewporSizeHandle = this.getUniformLocation(this.metaballsProgram, 'viewportSize', true);
        //     this.GL.uniform2fv(viewporSizeHandle, this.viewporSize);
        //     // draw triangles specified in setup() method
        //     // glUniformXXX should be after glUseProgram and before drawing anything.
        //     // otherwise uniforms wont be updated in the shader program
        // }
        this.updateDraw();
    };
    return MainGame;
}(_App__WEBPACK_IMPORTED_MODULE_0__["App"]));



/***/ }),

/***/ "./src/sph/index.ts":
/*!**************************!*\
  !*** ./src/sph/index.ts ***!
  \**************************/
/*! exports provided: getParameters, allocState, freeState, computeDensity, computeAcceleration, leapfrogStep, leapfrogStart, reflectBoundaryConditions, dampReflect, normalizeMass, initParticles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameters", function() { return getParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allocState", function() { return allocState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeState", function() { return freeState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeDensity", function() { return computeDensity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeAcceleration", function() { return computeAcceleration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leapfrogStep", function() { return leapfrogStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leapfrogStart", function() { return leapfrogStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reflectBoundaryConditions", function() { return reflectBoundaryConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dampReflect", function() { return dampReflect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeMass", function() { return normalizeMass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initParticles", function() { return initParticles; });
/* harmony import */ var _parameters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parameters */ "./src/sph/parameters.ts");

function getParameters() {
    return _parameters__WEBPACK_IMPORTED_MODULE_0__["defaultParameters"];
}
function allocState(n) {
    return {
        n: n,
        mass: 1,
        rho: new Float32Array(n),
        x: new Float32Array(n),
        vh: new Float32Array(n),
        v: new Float32Array(n),
        a: new Float32Array(n)
    };
}
function freeState(state) {
    delete state['n'];
    delete state['mass'];
    delete state['rho'];
    delete state['x'];
    delete state['vh'];
    delete state['v'];
    delete state['a'];
}
function computeDensity(state, parameters) {
    var n = state.n, rho = state.rho, x = state.x, mass = state.mass;
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
    var h = parameters.h, rho0 = parameters.rho0, k = parameters.k, mu = parameters.mu, g = parameters.g;
    var h2 = h * h;
    // unpack system state
    var mass = state.mass, rho = state.rho, x = state.x, v = state.v, a = state.a, n = state.n;
    // compute density
    computeDensity(state, parameters);
    // add gravity to each particle
    for (var i = 0; i < n; i++) {
        a[2 * i + 0] = 0; // x component
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
            var r2 = dx + dy;
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
        if (x[0] < XMIN)
            dampReflect(0, XMIN, state, idx);
        if (x[0] > XMAX)
            dampReflect(0, XMAX, state, idx);
        if (x[1] < YMIN)
            dampReflect(1, YMIN, state, idx);
        if (x[1] > YMAX)
            dampReflect(1, YMAX, state, idx);
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
function boxIndicator(x, y) {
    return (x < 0.5) && (y < 0.5);
}
// TODO: Use a function factory to generalize the circle indicator
function circleIndicator(x, y) {
    // center
    var centerX = 0.5;
    var centerY = 0.3;
    var radius = 0.25;
    var dx = (x - centerX);
    var dy = (y - centerY);
    var r2 = dx * dx + dy * dy;
    return (r2 < radius * radius);
}
function placeParticles(parameters, indicatorFunction) {
    var h = parameters.h;
    // separation between particles will be of 0.3
    var hh = h / 1.3;
    // Count mesh points that fall in indicated region.
    var count = 0;
    for (var x = 0; x < 1; x += hh)
        for (var y = 0; y < 1; y += hh)
            count += indicatorFunction(x, y) ? 1 : 0;
    // Populate the particle data structure
    var s = allocState(count);
    var p = 0;
    for (var x = 0; x < 1; x += hh) {
        for (var y = 0; y < 1; y += hh) {
            if (indicatorFunction(x, y)) {
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
    var s = placeParticles(parameters, circleIndicator);
    normalizeMass(s, parameters);
    return s;
}


/***/ }),

/***/ "./src/sph/parameters.ts":
/*!*******************************!*\
  !*** ./src/sph/parameters.ts ***!
  \*******************************/
/*! exports provided: defaultParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultParameters", function() { return defaultParameters; });
var defaultParameters = {
    npframe: 100,
    dt: 1e-4,
    h: 5e-2,
    rho0: 1000,
    k: 1e3,
    mu: 0.1,
    g: 9.8
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NwaC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BoL3BhcmFtZXRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQUE7Ozs7R0FJRztBQUNIO0lBaUJJLGFBQVksU0FBZ0MsRUFBRSxhQUErQjtRQUN6RSxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCwyQkFBYSxHQUFiLFVBQWMsWUFBbUIsRUFB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QUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7SUFDRCxrREFBa0Q7SUFDbEQsbUVBQW1FO0lBQ25FLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFTSxTQUFTLGFBQWEsQ0FBQyxVQUEyQjtJQUVyRCxJQUFNLENBQUMsR0FBZSxjQUFjLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2xFLGFBQWEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0IsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcFFEO0FBQUE7QUFBTyxJQUFNLGlCQUFpQixHQUFvQjtJQUM5QyxPQUFPLEVBQUUsR0FBRztJQUNaLEVBQUUsRUFBRSxJQUFJO0lBQ1IsQ0FBQyxFQUFFLElBQUk7SUFDUCxJQUFJLEVBQUUsSUFBSTtJQUNWLENBQUMsRUFBRSxHQUFHO0lBQ04sRUFBRSxFQUFFLEdBQUc7SUFDUCxDQUFDLEVBQUUsR0FBRztDQUNULENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiXHJcblxyXG4vKipcclxuICogVGhpcyBiYXNlIGNsYXNzIGlzIHRoZSBpbnRlcmZhY2Ugd2l0aCB0aGUgaW5kZXgudHMgZmlsZVxyXG4gKiB3aGljaCB3aWxsIGFsbG93IHRvIHRoZSBhcHBsaWNhdGlvbiB0byBnZXQgdGhlIGdsIGNvbnRleHQgYW5kIHV0aWxpdGllcyB0aW1pbmcgcHJvcGVydGllc1xyXG4gKiBhcyB0aW1lIGFuZCBkZWx0YSB0aW1lLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcFxyXG57XHJcbiAgICAvLyBUT0RPOiBBZGQgdGltZSBhbmQgZGVsdGEgdGltZSBmaWVsZCB0byB0aGlzIGNsYXNzXHJcbiAgICBwcm90ZWN0ZWQgR0w6V2ViR0xSZW5kZXJpbmdDb250ZXh0O1xyXG4gICAgcHJvdGVjdGVkIGNhbnZhczpIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcblxyXG4gICAgdmlld3BvcldpZHRoOm51bWJlcjtcclxuICAgIHZpZXdwb3JIZWlnaHQ6bnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBOb3QgaW1wbGVtZW50ZWQgeWV0XHJcbiAgICAgKi9cclxuICAgIGRlbHRhVGltZTpudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIEVsYXBzZWQgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICAgICAqL1xyXG4gICAgZWxhcHNlZFRpbWU6bnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoZ2xDb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGNhbnZhc0VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLkdMID0gZ2xDb250ZXh0O1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFV0aWxpdHkgbWV0aG9kIHRvIHRocm93IGFuIGVycm9yIGlmIHNoYWRlciBjb21waWxhdGlvbiBmYWlsc1xyXG4gICAgICovXHJcbiAgICBjb21waWxlU2hhZGVyKHNoYWRlclNvdXJjZTpzdHJpbmcsIHNoYWRlclR5cGU6YW55KTpXZWJHTFNoYWRlciB7XHJcbiAgICAgICAgY29uc3Qgc2hhZGVyID0gdGhpcy5HTC5jcmVhdGVTaGFkZXIoc2hhZGVyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5HTC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgIHRoaXMuR0wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuR0wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgdGhpcy5HTC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJTaGFkZXIgY29tcGlsZSBmYWlsZWQgd2l0aDogXCIgKyB0aGlzLkdMLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzaGFkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVdGlsaXR5IHRvIHRocm93IGVycm9yIGlmIHRoZSBhdHRyaWJ1dGUgd2FzIG5vdCBmb3VuZFxyXG4gICAgICogQHBhcmFtIHByb2dyYW0gXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBcclxuICAgICAqL1xyXG4gICAgZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbTpXZWJHTFByb2dyYW0sIG5hbWU6c3RyaW5nKTpudW1iZXIge1xyXG4gICAgICAgIHZhciBhdHRyaWJ1dGVMb2NhdGlvbiA9IHRoaXMuR0wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSk7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZUxvY2F0aW9uID09PSAtMSkge1xyXG4gICAgICAgICAgICB0aHJvdyAnQ2FuIG5vdCBmaW5kIGF0dHJpYnV0ZSAnICsgbmFtZSArICcuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZUxvY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtOldlYkdMUHJvZ3JhbSwgbmFtZTpzdHJpbmcsIGlnbm9yZUVycm9yczpib29sZWFuID0gZmFsc2UpOldlYkdMVW5pZm9ybUxvY2F0aW9uIHtcclxuICAgICAgICB2YXIgdW5pZm9ybUxvY2F0aW9uID0gdGhpcy5HTC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSk7XHJcbiAgICAgICAgaWYgKHVuaWZvcm1Mb2NhdGlvbiA9PT0gbnVsbCAmJiAhaWdub3JlRXJyb3JzKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdDYW4gbm90IGZpbmQgdW5pZm9ybSAnICsgbmFtZSArICcuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuaWZvcm1Mb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEcmF3KCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5HTC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICAgICAgdGhpcy5HTC5jbGVhcih0aGlzLkdMLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gICAgICAgIHRoaXMuR0wuZHJhd0FycmF5cyh0aGlzLkdMLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAjcmVnaW9uIEFQSSBNZXRob2RzXHJcbiAgICBwdWJsaWMgc2V0dXAoKTp2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvb3AoKTp2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVzaXplKCk6dm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgLy8gI2VuZHJlZ2lvbiBBUEkgTWV0aG9kc1xyXG59IiwiaW1wb3J0IHsgTWFpbkdhbWUgfSBmcm9tICcuL21haW4nO1xyXG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL0FwcCc7XHJcblxyXG5jb25zdCBjYW52YXM6SFRNTENhbnZhc0VsZW1lbnQgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluQ2FudmFzJyk7XHJcbmxldCBnbDpXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XHJcbmxldCBnYW1lOkFwcDtcclxubGV0IGVsYXBzZWRUaW1lOm51bWJlcjtcclxubGV0IGRlbHRhVGltZTpudW1iZXI7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSW5pdGlhbGlzZSBXZWJHTCBcclxuICAgIHRyeSB7IFxyXG4gICAgICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XHJcbiAgICB9IGNhdGNoKCBlcnJvciApIHsgXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCAhZ2wgKSB7XHJcbiAgICAgICAgdGhyb3cgXCJDYW5ub3QgY3JlYXRlIHdlYmdsIGNvbnRleHRcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYWluR2FtZSBpbmhlcml0cyBmcm9tIEFwcCwgdXNpbmcgc29tZSBwb2x5bW9ycGhpc21cclxuICAgIC8vIHRvIGVuc3VyZSBub3QgdG8gaW50ZXJhY3Qgd2l0aCBoaWdoIGxldmVsIGNvbXBvbmVudHMgb2YgdGhlIHByb2dyYW1cclxuICAgIGdhbWUgPSBuZXcgTWFpbkdhbWUoZ2wsIGNhbnZhcyk7XHJcbiAgICBvblJlc2l6ZSgpO1xyXG4gICAgZ2FtZS5zZXR1cCgpO1xyXG4gICAgb25SZXNpemUoKTtcclxuICAgIHJlbmRlcigwKTtcclxufVxyXG4vKipcclxuICogVGhlIGxvb3AgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlcihub3c6bnVtYmVyKSB7XHJcbiAgICBnYW1lLmVsYXBzZWRUaW1lID0gbm93O1xyXG4gICAgLy8gU2VlIHRoaXMgdG8gY29tcHV0ZSB0aGUgZGVsdGEgdGltZSBhbmQgdGhlIGVsYXBzZWQgYnkgdXNpbmdcclxuICAgIC8vIHRoZSByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNTYxMjQ1Mi9odG1sNS1jYW52YXMtZ2FtZS1sb29wLWRlbHRhLXRpbWUtY2FsY3VsYXRpb25zXHJcbiAgICBnYW1lLmxvb3AoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblJlc2l6ZSgpIHtcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgIGNvbnN0IHggPSAwO1xyXG4gICAgY29uc3QgeSA9IDA7XHJcbiAgICBnYW1lLnZpZXdwb3JXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGdhbWUudmlld3BvckhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBnbC52aWV3cG9ydCh4LCB5LCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgZ2FtZS5vblJlc2l6ZSgpO1xyXG59XHJcbi8vIExpc3RlbiBmb3Igd2luZG93IHJlc2l6ZSBldmVudHNcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcclxuLy8gSW5pdGlhbGl6ZSBhcHBsaWNhdGlvblxyXG5pbml0KCk7IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9BcHAnO1xyXG5pbXBvcnQgeyBtZXRhYmFsbFNoYWRlciwgZ2VuZXJhdGVNZXRhYmFsbHNTaGFkZXIgfSBmcm9tICcuL3NoYWRlcnMvZnJhZ21lbnRzJztcclxuaW1wb3J0IHsgZGVmYXVsdFZlcnRleHRTaGFkZXIgfSBmcm9tICcuL3NoYWRlcnMvdmVydGV4JztcclxuaW1wb3J0IHsgTWV0YWJhbGxzU2hhZGVySW5mbywgU3lzdGVtU3RhdGUsIFN5c3RlbVBhcmFtZXRlcnMgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgZ2V0UGFyYW1ldGVycywgaW5pdFBhcnRpY2xlcywgY29tcHV0ZUFjY2VsZXJhdGlvbiwgbGVhcGZyb2dTdGFydCwgbGVhcGZyb2dTdGVwIH0gZnJvbSAnLi9zcGgvaW5kZXgnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IG9mIGFueSBnYW1lIGxvZ2ljXHJcbiAqIHRoaW5rIG9mIHRoaXMgY2xhc3MgYXMgdGhlIHNldHVwKCkgbG9vcCgpIG1ldGhvZHMgb2YgYSBwcm9jZXNzaW5nL29wZW5mcmFtZXdvcmtzIGFwcGxpY2F0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFpbkdhbWUgZXh0ZW5kcyBBcHAge1xyXG4gICAgcHJpdmF0ZSB2ZXJ0ZXhTaGFkZXI6V2ViR0xTaGFkZXI7XHJcbiAgICBwcml2YXRlIG1ldGFiYWxsc1NoYWRlcjpXZWJHTFNoYWRlcjtcclxuICAgIHByaXZhdGUgbWV0YWJhbGxzUHJvZ3JhbTpXZWJHTFByb2dyYW07XHJcblxyXG4gICAgcHJpdmF0ZSB2aWV3cG9yU2l6ZTpGbG9hdDMyQXJyYXk7XHJcbiAgICBwcml2YXRlIG1ldGFiYWxsc1Bvc2l0aW9uczpGbG9hdDMyQXJyYXk7XHJcbiAgICBwcml2YXRlIG1ldGFiYWxsc1RleHR1cmU6V2ViR0xUZXh0dXJlO1xyXG4gICAgcHJpdmF0ZSBzaGFkZXJJbmZvOk1ldGFiYWxsc1NoYWRlckluZm87XHJcbiAgICBwcml2YXRlIG1ldGFiYWxsc1ZlbG9jaXR5Om51bWJlcltdW10gPSBbXTtcclxuICAgIHByaXZhdGUgcG9zaXRpb25zOmFueSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgc3BoU3RhdGU6U3lzdGVtU3RhdGU7XHJcbiAgICBwcml2YXRlIHNwaFBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycztcclxuXHJcbiAgICBzZXR1cCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2V0dXAnKTtcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB0aGlzLnNwaFBhcmFtZXRlcnMgPSBnZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNwaFBhcmFtZXRlcnMpIHRocm93ICdTUEggcGFyYW1ldGVycyBjYW5cXCd0IGJlIG51bGwnO1xyXG4gICAgICAgIHRoaXMuc3BoU3RhdGUgPSBpbml0UGFydGljbGVzKHRoaXMuc3BoUGFyYW1ldGVycyk7XHJcbiAgICAgICAgY29tcHV0ZUFjY2VsZXJhdGlvbih0aGlzLnNwaFN0YXRlLCB0aGlzLnNwaFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGxlYXBmcm9nU3RhcnQodGhpcy5zcGhTdGF0ZSwgdGhpcy5zcGhQYXJhbWV0ZXJzLmR0KTtcclxuXHJcbiAgICAgICAgLy8gLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTA0NjY0My93ZWJnbC1jcmVhdGUtdGV4dHVyZVxyXG4gICAgICAgIC8vIC8vIFBhc3MgbWV0YWJhbGxzIHBvc2l0aW9ucyB0byB0aGUgc2hhZGVyIGJ5IHVzaW5nIGEgdGV4dHVyZSAyZFxyXG4gICAgICAgIC8vIGNvbnN0IHBhcnRpY2xlc0NvdW50ID0gMiAqKiA0O1xyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVzQ291bnQ7IGkrKykge1xyXG4gICAgICAgIC8vICAgICB2YXIgcmFkaXVzID0gTWF0aC5yYW5kb20oKSAqIDYwICsgMTA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucG9zaXRpb25zLnB1c2goW1xyXG4gICAgICAgIC8vICAgICAgICAgTWF0aC5yYW5kb20oKSoodGhpcy52aWV3cG9yV2lkdGggLSAyICogcmFkaXVzKSxcclxuICAgICAgICAvLyAgICAgICAgIE1hdGgucmFuZG9tKCkqKHRoaXMudmlld3BvckhlaWdodCAtIDIgKiByYWRpdXMgKyByYWRpdXMpLFxyXG4gICAgICAgIC8vICAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgIC8vICAgICAgICAgMFxyXG4gICAgICAgIC8vICAgICBdKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5tZXRhYmFsbHNWZWxvY2l0eS5wdXNoKFtcclxuICAgICAgICAvLyAgICAgICAgIE1hdGgucmFuZG9tKCkqMTAgLSA1LCAvLyB2eFxyXG4gICAgICAgIC8vICAgICAgICAgTWF0aC5yYW5kb20oKSoxMCAtIDUgLy8gdnlcclxuICAgICAgICAvLyAgICAgXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMubWV0YWJhbGxzUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnBvc2l0aW9ucy5mbGF0KCkpO1xyXG4gICAgICAgIC8vIHRoaXMudmVydGV4U2hhZGVyID0gdGhpcy5jb21waWxlU2hhZGVyKGRlZmF1bHRWZXJ0ZXh0U2hhZGVyLCB0aGlzLkdMLlZFUlRFWF9TSEFERVIpO1xyXG4gICAgICAgIC8vIC8vIGVhY2ggbWV0YWJhbGwgaGFzIDQgY29tcG9uZW50c1xyXG4gICAgICAgIC8vIGNvbnN0IG1ldGFiYWxsc1NoYWRlckluZm86TWV0YWJhbGxzU2hhZGVySW5mbyA9IGdlbmVyYXRlTWV0YWJhbGxzU2hhZGVyKHRoaXMubWV0YWJhbGxzUG9zaXRpb25zLmxlbmd0aCAvIDQpO1xyXG4gICAgICAgIC8vIHRoaXMuc2hhZGVySW5mbyA9IG1ldGFiYWxsc1NoYWRlckluZm87XHJcbiAgICAgICAgLy8gdGhpcy5tZXRhYmFsbHNTaGFkZXIgPSB0aGlzLmNvbXBpbGVTaGFkZXIobWV0YWJhbGxzU2hhZGVySW5mby5zaGFkZXJTb3VyY2UsIHRoaXMuR0wuRlJBR01FTlRfU0hBREVSKTtcclxuICAgICAgICAvLyB0aGlzLm1ldGFiYWxsc1Byb2dyYW0gPSB0aGlzLkdMLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICAvLyB0aGlzLkdMLmF0dGFjaFNoYWRlcih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sIHRoaXMudmVydGV4U2hhZGVyKTtcclxuICAgICAgICAvLyB0aGlzLkdMLmF0dGFjaFNoYWRlcih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sIHRoaXMubWV0YWJhbGxzU2hhZGVyKTtcclxuICAgICAgICAvLyB0aGlzLkdMLmxpbmtQcm9ncmFtKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSk7XHJcbiAgICAgICAgLy8gdGhpcy5HTC51c2VQcm9ncmFtKHRoaXMubWV0YWJhbGxzUHJvZ3JhbSk7XHJcblxyXG4gICAgICAgIC8vIC8vIFNldCB1cCA0IHZlcnRpY2VzLCB3aGljaCB3ZSdsbCBkcmF3IGFzIGEgcmVjdGFuZ2xlXHJcbiAgICAgICAgLy8gLy8gdmlhIDIgdHJpYW5nbGVzXHJcbiAgICAgICAgLy8gLy9cclxuICAgICAgICAvLyAvLyAgIEEtLS1DXHJcbiAgICAgICAgLy8gLy8gICB8ICAvfFxyXG4gICAgICAgIC8vIC8vICAgfCAvIHxcclxuICAgICAgICAvLyAvLyAgIHwvICB8XHJcbiAgICAgICAgLy8gLy8gICBCLS0tRFxyXG4gICAgICAgIC8vIC8vIE5vcm1hbGl6ZSBkZXZpY2UgY29vcmRpbmF0ZXMgc3BhY2VcclxuICAgICAgICAvLyAvLyBodHRwOi8vd3d3LmxlYXJub3BlbmdsZXMuY29tL3VuZGVyc3RhbmRpbmctb3Blbmdscy1tYXRyaWNlcy9cclxuICAgICAgICAvLyBjb25zdCB2ZXJ0ZXhEYXRhID0gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAgICAgLy8gICAgIC0xLjAsIDEuMCxcclxuICAgICAgICAvLyAgICAgLTEuMCwgLTEuMCxcclxuICAgICAgICAvLyAgICAgMS4wLCAxLjAsXHJcbiAgICAgICAgLy8gICAgIDEuMCwgLTEuMFxyXG4gICAgICAgIC8vIF0pO1xyXG4gICAgICAgIC8vIGNvbnN0IHZlcnRleERhdGFCdWZmZXIgPSB0aGlzLkdMLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIC8vIHRoaXMuR0wuYmluZEJ1ZmZlcih0aGlzLkdMLkFSUkFZX0JVRkZFUiwgdmVydGV4RGF0YUJ1ZmZlcik7XHJcbiAgICAgICAgLy8gdGhpcy5HTC5idWZmZXJEYXRhKHRoaXMuR0wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhEYXRhLCB0aGlzLkdMLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAgICAgLy8gLy8gVG8gbWFrZSB0aGUgZ2VvbWV0cnkgaW5mb3JtYXRpb24gYXZhaWxhYmxlIGluIHRoZSBzaGFkZXIgYXMgYXR0cmlidXRlcywgd2VcclxuICAgICAgICAvLyAvLyBuZWVkIHRvIHRlbGwgV2ViR0wgd2hhdCB0aGUgbGF5b3V0IG9mIG91ciBkYXRhIGluIHRoZSB2ZXJ0ZXggYnVmZmVyIGlzLlxyXG4gICAgICAgIC8vIGNvbnN0IHBvc2l0aW9uSGFuZGxlID0gdGhpcy5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sICdwb3NpdGlvbicpO1xyXG4gICAgICAgIC8vIHRoaXMuR0wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25IYW5kbGUpO1xyXG4gICAgICAgIC8vIC8vIGluIGMrKyB0aGlzIHdvdWxkIGJlIGRvbmUgYnkgdXNpbmcgdHlwZW9mKGZsb2F0KVxyXG4gICAgICAgIC8vIGNvbnN0IGJ5dGVzUGVyQ29tcG9uZW50cyA9IDQ7IC8vIGEgZmxvYXQgMzIgYml0cyBudW1iZXIgbmVlZHMgNCBieXRlc1xyXG4gICAgICAgIC8vIGNvbnN0IGNvbXBvbmVudENvdW50ID0gMjsgLy8gaG93IG11Y2ggY29tcG9uZW50cyB3aWxsIGhhdmVcclxuICAgICAgICAvLyBjb25zdCBieXRlU2l6ZSA9IGNvbXBvbmVudENvdW50ICogYnl0ZXNQZXJDb21wb25lbnRzO1xyXG4gICAgICAgIC8vIHRoaXMuR0wudmVydGV4QXR0cmliUG9pbnRlcihwb3NpdGlvbkhhbmRsZSxcclxuICAgICAgICAvLyAgICAgY29tcG9uZW50Q291bnQsIC8vIHBvc2l0aW9uIGlzIGEgdmVjMlxyXG4gICAgICAgIC8vICAgICB0aGlzLkdMLkZMT0FULCAvLyBlYWNoIGNvbXBvbmVudCBpcyBhIGZsb2F0XHJcbiAgICAgICAgLy8gICAgIGZhbHNlLCAvLyBkb24ndCBub3JtYWxpemUgdmFsdWVzXHJcbiAgICAgICAgLy8gICAgIGJ5dGVTaXplLCAvLyB0d28gNCBieXRlIGZsb2F0IGNvbXBvbmVudHMgcGVyIHZlcnRleFxyXG4gICAgICAgIC8vICAgICAwIC8vIHRoZSBzdHJpZGUsIHRoZSBkaXN0YW5jZSBpbiBieXRlcyBmcm9tIHRoZSBlbmQgb2YgY3VycmVudCBwb3NpdGlvbiB0byB0aGUgbmV4dCBwb3NpdGlvblxyXG4gICAgICAgIC8vICAgICApO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1ldGFiYWxsc1RleHR1cmUgPSB0aGlzLkdMLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICAvLyB0aGlzLkdMLmJpbmRUZXh0dXJlKHRoaXMuR0wuVEVYVFVSRV8yRCwgdGhpcy5tZXRhYmFsbHNUZXh0dXJlKTtcclxuICAgICAgICAvLyBjb25zdCBsZXZlbCA9IDA7XHJcbiAgICAgICAgLy8gY29uc3Qgd2lkdGggPSBtZXRhYmFsbHNTaGFkZXJJbmZvLnRleHR1cmVEaW1lbnNpb25zLndpZHRoO1xyXG4gICAgICAgIC8vIGNvbnN0IGhlaWdodCA9IG1ldGFiYWxsc1NoYWRlckluZm8udGV4dHVyZURpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgIC8vIC8vIE5vdGUgdGhhdCBpbiBXZWJHTCwgY29udHJhcnkgdG8gT3BlbkdMLCB5b3UgaGF2ZSB0byBleHBsaWNpdGx5XHJcbiAgICAgICAgLy8gLy8gY2FsbCBnZXRFeHRlbnNpb24gYmVmb3JlIHlvdSBjYW4gdXNlIGFuIGV4dGVuc2lvbixcclxuICAgICAgICAvLyAvLyBsaWtlIE9FU190ZXh0dXJlX2Zsb2F0LiBBbmQgdGhlbiB5b3Ugd2FudCB0byBwYXNzXHJcbiAgICAgICAgLy8gLy8gZ2wuRkxPQVQgYXMgdGhlIHR5cGUgcGFyYW1ldGVyIHRvIHRleEltYWdlMkQuXHJcbiAgICAgICAgLy8gY29uc3QgZmxvYXRfdGV4dHVyZV9leHQgPSB0aGlzLkdMLmdldEV4dGVuc2lvbignT0VTX3RleHR1cmVfZmxvYXQnKTtcclxuICAgICAgICAvLyBpZiAoZmxvYXRfdGV4dHVyZV9leHQgPT0gbnVsbCkgdGhyb3cgJ09FU190ZXh0dXJlX2Zsb2F0IG5vdCBzdXBwb3J0ZWQnO1xyXG4gICAgICAgIC8vIHRoaXMuR0wudGV4SW1hZ2UyRCh0aGlzLkdMLlRFWFRVUkVfMkQsIGxldmVsLCB0aGlzLkdMLlJHQkEsIHdpZHRoLCBoZWlnaHQsIDAsIHRoaXMuR0wuUkdCQSwgdGhpcy5HTC5GTE9BVCwgdGhpcy5tZXRhYmFsbHNQb3NpdGlvbnMpO1xyXG4gICAgICAgIC8vIHRoaXMuR0wudGV4UGFyYW1ldGVyaSh0aGlzLkdMLlRFWFRVUkVfMkQsIHRoaXMuR0wuVEVYVFVSRV9NQUdfRklMVEVSLCB0aGlzLkdMLk5FQVJFU1QpO1xyXG4gICAgICAgIC8vIHRoaXMuR0wudGV4UGFyYW1ldGVyaSh0aGlzLkdMLlRFWFRVUkVfMkQsIHRoaXMuR0wuVEVYVFVSRV9NSU5fRklMVEVSLCB0aGlzLkdMLk5FQVJFU1QpO1xyXG4gICAgICAgIC8vIHRoaXMuR0wuYmluZFRleHR1cmUodGhpcy5HTC5URVhUVVJFXzJELCBudWxsKTtcclxuXHJcbiAgICAgICAgLy8gLy8gUGFzc2luZyBtZXRhYmFsbHMgcG9zaXRpb25zIHRvIHRleHR1cmUgdW5pdCAxIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgMFxyXG4gICAgICAgIC8vIHRoaXMuR0wuYWN0aXZlVGV4dHVyZSh0aGlzLkdMLlRFWFRVUkUxKTtcclxuICAgICAgICAvLyB0aGlzLkdMLmJpbmRUZXh0dXJlKHRoaXMuR0wuVEVYVFVSRV8yRCwgdGhpcy5tZXRhYmFsbHNUZXh0dXJlKTtcclxuICAgICAgICAvLyB0aGlzLkdMLnVuaWZvcm0xaSh0aGlzLkdMLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sICdtZXRhYmFsbHNQb3NpdGlvbnMnKSwgMSk7XHJcblxyXG4gICAgICAgIC8vIC8vIGRyYXcgdHJpYW5nbGVzIHNwZWNpZmllZCBpbiBzZXR1cCgpIG1ldGhvZFxyXG4gICAgICAgIC8vIHRoaXMudXBkYXRlRHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvb3AoKSB7XHJcbiAgICAgICAgY29tcHV0ZUFjY2VsZXJhdGlvbih0aGlzLnNwaFN0YXRlLCB0aGlzLnNwaFBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGxlYXBmcm9nU3RlcCh0aGlzLnNwaFN0YXRlLCB0aGlzLnNwaFBhcmFtZXRlcnMuZHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsb29wJyk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdsb29wJyk7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBjb25zdCB4SWQgPSA0ICogaSArIDA7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHlJZCA9IDQgKiBpICsgMTtcclxuICAgICAgICAvLyAgICAgY29uc3QgcklkID0gNCAqIGkgKyAyO1xyXG4gICAgICAgIC8vICAgICBjb25zdCBpZCA9IGk7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHYgPSB0aGlzLm1ldGFiYWxsc1ZlbG9jaXR5W2lkXTtcclxuICAgICAgICAvLyAgICAgbGV0IHggPSB0aGlzLm1ldGFiYWxsc1Bvc2l0aW9uc1t4SWRdO1xyXG4gICAgICAgIC8vICAgICBsZXQgeSA9IHRoaXMubWV0YWJhbGxzUG9zaXRpb25zW3lJZF07XHJcbiAgICAgICAgLy8gICAgIGxldCByID0gdGhpcy5tZXRhYmFsbHNQb3NpdGlvbnNbcklkXTtcclxuICAgICAgICAvLyAgICAgbGV0IHZ4ID0gdlswXTtcclxuICAgICAgICAvLyAgICAgbGV0IHZ5ID0gdlsxXTtcclxuXHJcbiAgICAgICAgLy8gICAgIHggKz0gdng7XHJcbiAgICAgICAgLy8gICAgIHkgKz0gdnk7XHJcblxyXG4gICAgICAgIC8vICAgICBpZiAoeCArIHIgPiB0aGlzLnZpZXdwb3JXaWR0aCkge1xyXG4gICAgICAgIC8vICAgICAgICAgeCA9IHRoaXMudmlld3BvcldpZHRoIC0gcjtcclxuICAgICAgICAvLyAgICAgICAgIHZ4ID0gLU1hdGguYWJzKHZ4KTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIGlmICh4IC0gciA8IDApIHtcclxuICAgICAgICAvLyAgICAgICAgIHggPSByICsgMTtcclxuICAgICAgICAvLyAgICAgICAgIHZ4ID0gTWF0aC5hYnModngpO1xyXG4gICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICBpZiAoeSArIHIgPiB0aGlzLnZpZXdwb3JIZWlnaHQpIHtcclxuICAgICAgICAvLyAgICAgICAgIHkgPSB0aGlzLnZpZXdwb3JIZWlnaHQgLSByO1xyXG4gICAgICAgIC8vICAgICAgICAgdnkgPSAtTWF0aC5hYnModnkpO1xyXG4gICAgICAgIC8vICAgICB9IGVsc2UgaWYgKHkgLSByIDwgMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgeSA9IHIgKyAxO1xyXG4gICAgICAgIC8vICAgICAgICAgdnkgPSBNYXRoLmFicyh2eSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIHRoaXMubWV0YWJhbGxzUG9zaXRpb25zW3hJZF0gPSB4O1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1ldGFiYWxsc1Bvc2l0aW9uc1t5SWRdID0geTtcclxuICAgICAgICAvLyAgICAgdGhpcy5tZXRhYmFsbHNQb3NpdGlvbnNbcklkXSA9IHI7XHJcbiAgICAgICAgLy8gICAgIHZbMF0gPSB2eDtcclxuICAgICAgICAvLyAgICAgdlsxXSA9IHZ5O1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gLy8gUGFzc2luZyBtZXRhYmFsbHMgcG9zaXRpb25zIHRvIHRleHR1cmUgdW5pdCAxIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgMFxyXG4gICAgICAgIC8vIC8vIHVuaXQgdGV4dHVyZSBhbmQgdGV4dHVyZSB3YXMgYmluZGVkIGluIHRoZSBzZXR1cFxyXG4gICAgICAgIC8vIC8vIHRoaXMuR0wuYWN0aXZlVGV4dHVyZSh0aGlzLkdMLlRFWFRVUkUxKTtcclxuICAgICAgICAvLyAvLyB0aGlzLkdMLmJpbmRUZXh0dXJlKHRoaXMuR0wuVEVYVFVSRV8yRCwgdGhpcy5tZXRhYmFsbHNUZXh0dXJlKTtcclxuICAgICAgICAvLyAvLyB0aGlzLkdMLnVuaWZvcm0xaSh0aGlzLkdMLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLm1ldGFiYWxsc1Byb2dyYW0sICdtZXRhYmFsbHNQb3NpdGlvbnMnKSwgMSk7XHJcbiAgICAgICAgLy8gY29uc3QgbGV2ZWwgPSAwO1xyXG4gICAgICAgIC8vIHRoaXMuR0wudGV4SW1hZ2UyRCh0aGlzLkdMLlRFWFRVUkVfMkQsIGxldmVsLCB0aGlzLkdMLlJHQkEsIHRoaXMuc2hhZGVySW5mby50ZXh0dXJlRGltZW5zaW9ucy53aWR0aCwgdGhpcy5zaGFkZXJJbmZvLnRleHR1cmVEaW1lbnNpb25zLmhlaWdodCwgMCwgdGhpcy5HTC5SR0JBLCB0aGlzLkdMLkZMT0FULCB0aGlzLm1ldGFiYWxsc1Bvc2l0aW9ucyk7XHJcbiAgICAgICAgLy8gdGhpcy51cGRhdGVEcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb25SZXNpemUgZ2V0cyBjYWxsZWQgYmVmb3JlIGFuZCBhZnRlciBzZXR1cFxyXG4gICAgb25SZXNpemUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uUmVzaXplJyk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMudmlld3BvclNpemUgPT0gbnVsbClcclxuICAgICAgICAvLyAgICAgdGhpcy52aWV3cG9yU2l6ZSA9IG5ldyBGbG9hdDMyQXJyYXkoMik7XHJcblxyXG4gICAgICAgIC8vIC8vIHNpbmNlIHRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIGJlZm9yZSB0aGUgc2V0dXAuXHJcbiAgICAgICAgLy8gLy8gaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgcHJvZ3JhbSBoYXNuJ3QgYmVlbiBjcmVhdGVkIHlldFxyXG4gICAgICAgIC8vIGlmICh0aGlzLm1ldGFiYWxsc1Byb2dyYW0pXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnZpZXdwb3JTaXplWzBdID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICAgICAgLy8gICAgIHRoaXMudmlld3BvclNpemVbMV0gPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHZpZXdwb3JTaXplSGFuZGxlID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5tZXRhYmFsbHNQcm9ncmFtLCAndmlld3BvcnRTaXplJywgdHJ1ZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuR0wudW5pZm9ybTJmdih2aWV3cG9yU2l6ZUhhbmRsZSwgdGhpcy52aWV3cG9yU2l6ZSk7XHJcbiAgICAgICAgLy8gICAgIC8vIGRyYXcgdHJpYW5nbGVzIHNwZWNpZmllZCBpbiBzZXR1cCgpIG1ldGhvZFxyXG4gICAgICAgIC8vICAgICAvLyBnbFVuaWZvcm1YWFggc2hvdWxkIGJlIGFmdGVyIGdsVXNlUHJvZ3JhbSBhbmQgYmVmb3JlIGRyYXdpbmcgYW55dGhpbmcuXHJcbiAgICAgICAgLy8gICAgIC8vIG90aGVyd2lzZSB1bmlmb3JtcyB3b250IGJlIHVwZGF0ZWQgaW4gdGhlIHNoYWRlciBwcm9ncmFtXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMudXBkYXRlRHJhdygpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3lzdGVtUGFyYW1ldGVycywgU3lzdGVtU3RhdGUsIEluZGljYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0UGFyYW1ldGVycyB9IGZyb20gJy4vcGFyYW1ldGVycyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyYW1ldGVycygpOlN5c3RlbVBhcmFtZXRlcnMge1xyXG4gICAgcmV0dXJuIGRlZmF1bHRQYXJhbWV0ZXJzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxsb2NTdGF0ZShuOm51bWJlcik6U3lzdGVtU3RhdGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuOiBuLFxyXG4gICAgICAgIG1hc3M6IDEsXHJcbiAgICAgICAgcmhvOiBuZXcgRmxvYXQzMkFycmF5KG4pLFxyXG4gICAgICAgIHg6IG5ldyBGbG9hdDMyQXJyYXkobiksXHJcbiAgICAgICAgdmg6IG5ldyBGbG9hdDMyQXJyYXkobiksXHJcbiAgICAgICAgdjogbmV3IEZsb2F0MzJBcnJheShuKSxcclxuICAgICAgICBhOiBuZXcgRmxvYXQzMkFycmF5KG4pXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZnJlZVN0YXRlKHN0YXRlOlN5c3RlbVN0YXRlKSB7XHJcbiAgICBkZWxldGUgc3RhdGVbJ24nXTtcclxuICAgIGRlbGV0ZSBzdGF0ZVsnbWFzcyddO1xyXG4gICAgZGVsZXRlIHN0YXRlWydyaG8nXTtcclxuICAgIGRlbGV0ZSBzdGF0ZVsneCddO1xyXG4gICAgZGVsZXRlIHN0YXRlWyd2aCddO1xyXG4gICAgZGVsZXRlIHN0YXRlWyd2J107XHJcbiAgICBkZWxldGUgc3RhdGVbJ2EnXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVEZW5zaXR5KHN0YXRlOlN5c3RlbVN0YXRlLCBwYXJhbWV0ZXJzOlN5c3RlbVBhcmFtZXRlcnMpIHtcclxuICAgIGNvbnN0IHsgbiwgcmhvLCB4LCBtYXNzIH0gPSBzdGF0ZTtcclxuICAgIGNvbnN0IGggPSBwYXJhbWV0ZXJzLmg7XHJcbiAgICBjb25zdCBoMiA9IGgqaDtcclxuICAgIGNvbnN0IGg4ID0gaDIqaDIqaDIqaDI7XHJcbiAgICBjb25zdCBDID0gNCAqIG1hc3MgLyBNYXRoLlBJIC8gaDg7XHJcbiAgICBjb25zdCBDMiA9IDQgKiBtYXNzIC8gTWF0aC5QSSAvIGgyO1xyXG5cclxuICAgIC8vIFdlIHNlYXJjaCBmb3IgbmVpZ2hib3JzIG9mIG5vZGUgaSBieSBjaGVja2luZyBldmVyeSBwYXJ0aWNsZSwgd2hpY2ggaXMgbm90XHJcbiAgICAvLyB2ZXJ5IGVmZmljaWVudC4gV2UgZG8gYXQgbGVhc3QgdGFrZSBhZHZhbmdlIG9mIHRoZSBzeW1tZXRyeSBvZiB0aGUgdXBkYXRlIChpXHJcbiAgICAvLyBjb250cmlidXRlcyB0byBqIGluIHRoZSBzYW1lIHdheSB0aGF0IGogY29udHJpYnV0ZXMgdG8gaSkuXHJcblxyXG4gICAgLy8gZm9yIGVhY2ggcGFydGljbGVcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcmhvW2ldICs9IEMyO1xyXG4gICAgICAgIC8vIGl0ZXJhdGUgZWFjaCBvdGhlciBwYXJ0aWNsZVxyXG4gICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IG47IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBkeCA9IHhbMippICsgMF0gLSB4WzIqaiArIDBdO1xyXG4gICAgICAgICAgICBjb25zdCBkeSA9IHhbMippICsgMV0gLSB4WzIqaiArIDFdO1xyXG4gICAgICAgICAgICBjb25zdCByMiA9IGR4ICsgZHk7XHJcbiAgICAgICAgICAgIGNvbnN0IHogPSBoMiAtIHIyO1xyXG4gICAgICAgICAgICBpZiAoeiA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJob19paiA9IEMqeip6Kno7XHJcbiAgICAgICAgICAgICAgICByaG9baV0gKz0gcmhvX2lqO1xyXG4gICAgICAgICAgICAgICAgcmhvW2pdICs9IHJob19pajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgY29tcHV0ZSBkZW5zaXR5LFxyXG4gKiB0aGUgY29tcHV0ZSBhY2NlbCByb3V0aW5lIHRha2VzIGFkdmFudGFnZSBvZiB0aGUgc3ltbWV0cnkgb2YgdGhlIGludGVyYWN0aW9uXHJcbiAqIGZvcmNlcyAoZmludGVyYWN0X2lqID0g4oiSZmludGVyYWN0X2ppIClcclxuICogYnV0IGl0IGRvZXMgYSB2ZXJ5IGV4cGVuc2l2ZSBicnV0ZSBmb3JjZSBzZWFyY2ggZm9yXHJcbiAqIG5laWdoYm9ycy5cclxuICogVE9ETzogQXBwbHkgdGhlIEJhcm5lcy1IdXQgYWxnb3JpdGhtIHdoaWNoIGN1dHMgdGhlIGNvbXBsZXhpdHkgb2Ygbi1ib2R5IHNpbXVsYXRpb25zIGZyb20gIOKIvE8objIpICB0byAg4oi8TyhubG9nKG4pKS5cclxuICogQHBhcmFtIHN0YXRlIFxyXG4gKiBAcGFyYW0gcGFyYW1ldGVycyBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlQWNjZWxlcmF0aW9uKHN0YXRlOlN5c3RlbVN0YXRlLCBwYXJhbWV0ZXJzOlN5c3RlbVBhcmFtZXRlcnMpIHtcclxuICAgIC8vIHVucGFjayBiYXNpYyBwYXJhbWV0ZXJzXHJcbiAgICBjb25zdCB7aCwgcmhvMCwgaywgbXUsIGd9ID0gcGFyYW1ldGVycztcclxuICAgIGNvbnN0IGgyID0gaCpoO1xyXG4gICAgLy8gdW5wYWNrIHN5c3RlbSBzdGF0ZVxyXG4gICAgY29uc3QgeyBtYXNzLCByaG8sIHgsIHYsIGEsIG4gfSA9IHN0YXRlO1xyXG5cclxuICAgIC8vIGNvbXB1dGUgZGVuc2l0eVxyXG4gICAgY29tcHV0ZURlbnNpdHkoc3RhdGUsIHBhcmFtZXRlcnMpO1xyXG5cclxuICAgIC8vIGFkZCBncmF2aXR5IHRvIGVhY2ggcGFydGljbGVcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgYVsyKmkgKyAwXSA9IDA7IC8vIHggY29tcG9uZW50XHJcbiAgICAgICAgYVsyKmkgKyAxXSA9IC1nOyAvLyB5IGNvbXBvbmVudFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0YW50cyBmb3IgaW50ZXJhY3Rpb24gdGVybXNcclxuICAgIGNvbnN0IENvID0gbWFzcyAvIE1hdGguUEkgLyAoaDIqaDIpO1xyXG4gICAgY29uc3QgQ3AgPSAxNSprO1xyXG4gICAgY29uc3QgQ3YgPSAtNDAqbXU7XHJcblxyXG4gICAgLy8gQ29tcHV0ZSBpbnRlcmFjdGlvbiBmb3JjZXNcclxuICAgIC8vIGZvciBlYWNoIHBhcnRpY2xlXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJob2kgPSByaG9baV07XHJcbiAgICAgICAgLy8gaXRlcmF0ZSBlYWNoIG90aGVyIHBhcnRpY2xlXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGR4ID0geFsyKmkgKyAwXSAtIHhbMipqICsgMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGR5ID0geFsyKmkgKyAxXSAtIHhbMipqICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IHIyID0gZHggKyBkeTtcclxuICAgICAgICAgICAgLy8gaXMgdGhlIGogcGFydGljbGUgaXMgaW4gdGhlIHJhZGlvdXMgaCBvZiBpP1xyXG4gICAgICAgICAgICBpZiAocjIgPCBoMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmhvaiA9IHJob1tqXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHEgPSBNYXRoLnNxcnQocjIpL2g7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1ID0gMSAtIHE7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgcmhvaSBmcm9tIHdvIHNpbmNlIGl0IGRvbid0IGFwcGVhcnMgb24gdGhlIHBhcGVyJ3MgZXF1YXRpb25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCB3byA9IENvICogdSAvIHJob2kgLyByaG9qO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd3AgPSB3byAqIENwICogKHJob2kgKyByaG9qIC0gMipyaG8wKSAqIHUvcTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHd2ID0gd28qQ3Y7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZHZ4ID0gdlsyKmkgKyAwXSAtIHZbMipqICsgMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkdnkgPSB2WzIqaSArIDFdIC0gdlsyKmogKyAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVbmRlcnN0YW5kIHRoaXMuXHJcbiAgICAgICAgICAgICAgICBhWzIqaSswXSArPSAod3AqZHggKyB3dipkdngpO1xyXG4gICAgICAgICAgICAgICAgYVsyKmkrMV0gKz0gKHdwKmR5ICsgd3YqZHZ5KTtcclxuICAgICAgICAgICAgICAgIGFbMipqKzBdIC09ICh3cCpkeCArIHd2KmR2eCk7XHJcbiAgICAgICAgICAgICAgICBhWzIqaisxXSAtPSAod3AqZHkgKyB3dipkdnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGVhcGZyb2dTdGVwKHN0YXRlOlN5c3RlbVN0YXRlLCBkdDpudW1iZXIpIHtcclxuICAgIGNvbnN0IHsgYSwgdmgsIHYsIHgsIG4gfSA9IHN0YXRlO1xyXG5cclxuICAgIC8vIFRPRE86IFVzZSB0aGUgaW50ZWdlciBzdGVwcyBmb3JtdWxhIGZvciB0aGUgbGVhcGZyb2dcclxuICAgIC8vIHRoZSBpbnRlZ2VyIHN0ZXAgZm9ybXVsYSBhcmUgbGl0ZXJhbGx5IHRoZSBraW5lbWF0aWMgZXF1YXRpb25zXHJcbiAgICAvLyB3aGljaCB1c2UgdGhlIHRheWxvciB0aGVyb20gdG8gZGVzY3JpYmUgZGUgcG9zaXRpb24gaW4gbW9tZW50IHQuXHJcbiAgICAvLyBzZWU6IGh0dHBzOi8vd3d3LmFsZ29yaXRobS1hcmNoaXZlLm9yZy9jb250ZW50cy92ZXJsZXRfaW50ZWdyYXRpb24vdmVybGV0X2ludGVncmF0aW9uLmh0bWxcclxuICAgIC8vIHRoaXMgd2lsbCBzYXZlIHVzIGEgZm9yIGxvb3BcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIqbjsgKytpKSB2aFtpXSArPSBhW2ldICogZHQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIqbjsgKytpKSB2W2ldID0gdmhbaV0gKyBhW2ldICogZHQgLyAyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyKm47ICsraSkgeFtpXSArPSB2aFtpXSAqIGR0O1xyXG5cclxuICAgIHJlZmxlY3RCb3VuZGFyeUNvbmRpdGlvbnMoc3RhdGUpO1xyXG59XHJcblxyXG4vKipcclxuICogQXQgdGhlIGZpcnN0IHN0ZXAsIHRoZSBsZWFwZnJvZyBpdGVyYXRpb24gb25seSBoYXMgdGhlIGluaXRpYWwgdmVsb2NpdGllcyB2MCwgc28gd2VcclxuICogbmVlZCB0byBkbyBzb21ldGhpbmcgc3BlY2lhbC5cclxuICogQHBhcmFtIHN0YXRlIFxyXG4gKiBAcGFyYW0gZHQgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbGVhcGZyb2dTdGFydChzdGF0ZTpTeXN0ZW1TdGF0ZSwgZHQ6bnVtYmVyKSB7XHJcbiAgICBjb25zdCB7IGEsIHZoLCB2LCB4LCBuIH0gPSBzdGF0ZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIqbjsgKytpKSB2aFtpXSA9IHZbaV0gKyBhW2ldICogZHQgLyAyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyKm47ICsraSkgdltpXSArPSBhW2ldICogZHQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIqbjsgKytpKSB4W2ldICs9IHZoW2ldICogZHQ7XHJcbiAgICByZWZsZWN0Qm91bmRhcnlDb25kaXRpb25zKHN0YXRlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZmxlY3RCb3VuZGFyeUNvbmRpdGlvbnMoc3RhdGU6U3lzdGVtU3RhdGUpIHtcclxuICAgIC8vIEJvdW5kYXJpZXMgb2YgdGhlIGNvbXB1dGF0aW9uYWwgZG9tYWluXHJcbiAgICBjb25zdCBYTUlOID0gMC4wO1xyXG4gICAgY29uc3QgWE1BWCA9IDEuMDtcclxuICAgIGNvbnN0IFlNSU4gPSAwLjA7XHJcbiAgICBjb25zdCBZTUFYID0gMS4wO1xyXG4gICAgY29uc3QgeyB4LCBuIH0gPSBzdGF0ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgaWR4ID0gaSAqIDI7XHJcbiAgICAgICAgaWYgKHhbMF0gPCBYTUlOKSBkYW1wUmVmbGVjdCgwLCBYTUlOLCBzdGF0ZSwgaWR4KTtcclxuICAgICAgICBpZiAoeFswXSA+IFhNQVgpIGRhbXBSZWZsZWN0KDAsIFhNQVgsIHN0YXRlLCBpZHgpO1xyXG4gICAgICAgIGlmICh4WzFdIDwgWU1JTikgZGFtcFJlZmxlY3QoMSwgWU1JTiwgc3RhdGUsIGlkeCk7XHJcbiAgICAgICAgaWYgKHhbMV0gPiBZTUFYKSBkYW1wUmVmbGVjdCgxLCBZTUFYLCBzdGF0ZSwgaWR4KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRhbXBSZWZsZWN0KHdoaWNoOm51bWJlciwgYmFycmllcjpudW1iZXIsIHN0YXRlOlN5c3RlbVN0YXRlLCBpZHg6bnVtYmVyKSB7XHJcbiAgICBjb25zdCB7IHZoLCB2LCB4IH0gPSBzdGF0ZTtcclxuXHJcbiAgICAvLyBDb2VmZmljaWVudCBvZiByZXNpdGl1dGlvblxyXG4gICAgY29uc3QgREFNUCA9IDAuNzU7XHJcbiAgICAvLyBJZ25vcmUgZGVnZW5lcmF0ZSBjYXNlc1xyXG4gICAgaWYgKHZbaWR4ICsgd2hpY2hdID09IDApXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIFNjYWxlIGJhY2sgdGhlIGRpc3RhbmNlIHRyYXZlbGVkIGJhc2VkIG9uIHRpbWUgZnJvbSBjb2xsaXNpb25cclxuICAgIGNvbnN0IHRib3VuY2UgPSAoeFtpZHggKyB3aGljaF0tYmFycmllcikvdltpZHggKyB3aGljaF07XHJcbiAgICAvLyB0aGUgKDEtREFNUCkgaXMgdXNlZCB0byBtYWtlIGNvbXB1dGF0aW9ucyB0YWtpbmcgaW50byBhY291bnRcclxuICAgIC8vIHRoZSBkYW1wZWQgc3BlZWQgaW4gYSBtb21lbnQgaW4gd2hpY2ggc3BlZWQgaGFzbid0IGJlZW4gZGFtcGVkIHlldFxyXG4gICAgeFtpZHggKyAwXSAtPSB2W2lkeCArIDBdKigxLURBTVApKnRib3VuY2U7XHJcbiAgICB4W2lkeCArIDFdIC09IHZbaWR4ICsgMV0qKDEtREFNUCkqdGJvdW5jZTtcclxuXHJcbiAgICAvLyBSZWZsZWN0IHRoZSBwb3NpdGlvbiBhbmQgdmVsb2NpdHlcclxuICAgIHhbaWR4ICsgd2hpY2hdID0gMipiYXJyaWVyLXhbaWR4ICsgd2hpY2hdO1xyXG4gICAgdltpZHggKyB3aGljaF0gPSAtdltpZHggKyB3aGljaF07XHJcbiAgICB2aFtpZHggKyB3aGljaF0gPSAtdmhbaWR4ICsgd2hpY2hdO1xyXG5cclxuICAgIC8vIERhbXAgdGhlIHZlbG9jaXRpZXNcclxuICAgIHZbaWR4ICsgMF0gKj0gREFNUDsgdmhbaWR4ICsgMF0gKj0gREFNUDtcclxuICAgIHZbaWR4ICsgMV0gKj0gREFNUDsgdmhbaWR4ICsgMV0gKj0gREFNUDtcclxufVxyXG5cclxuZnVuY3Rpb24gYm94SW5kaWNhdG9yKHg6bnVtYmVyLCB5Om51bWJlcik6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHggPCAwLjUpICYmICh5IDwgMC41KTtcclxufVxyXG5cclxuLy8gVE9ETzogVXNlIGEgZnVuY3Rpb24gZmFjdG9yeSB0byBnZW5lcmFsaXplIHRoZSBjaXJjbGUgaW5kaWNhdG9yXHJcbmZ1bmN0aW9uIGNpcmNsZUluZGljYXRvcih4Om51bWJlciwgeTpudW1iZXIpOmJvb2xlYW5cclxue1xyXG4gICAgLy8gY2VudGVyXHJcbiAgICBjb25zdCBjZW50ZXJYID0gMC41O1xyXG4gICAgY29uc3QgY2VudGVyWSA9IDAuMztcclxuICAgIGNvbnN0IHJhZGl1cyA9IDAuMjU7XHJcblxyXG4gICAgY29uc3QgZHggPSAoeC1jZW50ZXJYKTtcclxuICAgIGNvbnN0IGR5ID0gKHktY2VudGVyWSk7XHJcbiAgICBjb25zdCByMiA9IGR4KmR4ICsgZHkqZHk7XHJcbiAgICByZXR1cm4gKHIyIDwgcmFkaXVzKnJhZGl1cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlUGFydGljbGVzKHBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycywgaW5kaWNhdG9yRnVuY3Rpb246SW5kaWNhdG9yRnVuY3Rpb24pOlN5c3RlbVN0YXRlIHtcclxuICAgIGNvbnN0IGggPSBwYXJhbWV0ZXJzLmg7XHJcbiAgICAvLyBzZXBhcmF0aW9uIGJldHdlZW4gcGFydGljbGVzIHdpbGwgYmUgb2YgMC4zXHJcbiAgICBjb25zdCBoaCA9IGggLyAxLjM7XHJcblxyXG4gICAgLy8gQ291bnQgbWVzaCBwb2ludHMgdGhhdCBmYWxsIGluIGluZGljYXRlZCByZWdpb24uXHJcbiAgICBsZXQgY291bnQ6bnVtYmVyID0gMDtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTsgeCArPSBoaClcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDE7IHkgKz0gaGgpXHJcbiAgICAgICAgICAgIGNvdW50ICs9IGluZGljYXRvckZ1bmN0aW9uKHgseSkgPyAxIDogMDtcclxuXHJcbiAgICAvLyBQb3B1bGF0ZSB0aGUgcGFydGljbGUgZGF0YSBzdHJ1Y3R1cmVcclxuICAgIGNvbnN0IHM6U3lzdGVtU3RhdGUgPSBhbGxvY1N0YXRlKGNvdW50KTtcclxuICAgIGxldCBwID0gMDtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTsgeCArPSBoaCkge1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTsgeSArPSBoaCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9yRnVuY3Rpb24oeCx5KSkge1xyXG4gICAgICAgICAgICAgICAgcy54WzIqcCswXSA9IHg7XHJcbiAgICAgICAgICAgICAgICBzLnhbMipwKzFdID0geTtcclxuICAgICAgICAgICAgICAgIHMudlsyKnArMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgcy52WzIqcCsxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICArK3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU1hc3Moc3RhdGU6U3lzdGVtU3RhdGUsIHBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycyk6dm9pZCB7XHJcbiAgICBzdGF0ZS5tYXNzID0gMTtcclxuICAgIGNvbXB1dGVEZW5zaXR5KHN0YXRlLCBwYXJhbWV0ZXJzKTtcclxuICAgIC8vIHJlZmVyZW5jZSBkZW5zaXR5XHJcbiAgICBsZXQgcmhvMCA9IHBhcmFtZXRlcnMucmhvMDtcclxuICAgIGxldCByaG8ycyA9IDA7XHJcbiAgICBsZXQgcmhvcyA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5uOyArK2kpIHtcclxuICAgICAgICByaG8ycyArPSAoc3RhdGUucmhvW2ldKSooc3RhdGUucmhvW2ldKTtcclxuICAgICAgICByaG9zICs9IHN0YXRlLnJob1tpXTtcclxuICAgIH1cclxuICAgIC8vIFRPRE86IFVuZGVyc3RhbmQgaG93IHRoaXMgbm9ybWFsaXphdGlvbiBpcyBkb25lXHJcbiAgICAvLyBtYXNzIG5lY2Vzc2FyeSBpbiBvcmRlciB0byBhY2hpZXZlIHRoZSBkZXNpcmVkIHJlZmVyZW5jZSBkZW5zaXR5XHJcbiAgICBzdGF0ZS5tYXNzICo9IChyaG8wKnJob3MgLyByaG8ycyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UGFydGljbGVzKHBhcmFtZXRlcnM6U3lzdGVtUGFyYW1ldGVycyk6U3lzdGVtU3RhdGVcclxue1xyXG4gICAgY29uc3QgczpTeXN0ZW1TdGF0ZSA9IHBsYWNlUGFydGljbGVzKHBhcmFtZXRlcnMsIGNpcmNsZUluZGljYXRvcik7XHJcbiAgICBub3JtYWxpemVNYXNzKHMsIHBhcmFtZXRlcnMpO1xyXG4gICAgcmV0dXJuIHM7XHJcbn0iLCJpbXBvcnQgeyBTeXN0ZW1QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0UGFyYW1ldGVyczpTeXN0ZW1QYXJhbWV0ZXJzID0ge1xyXG4gICAgbnBmcmFtZTogMTAwLFxyXG4gICAgZHQ6IDFlLTQsXHJcbiAgICBoOiA1ZS0yLFxyXG4gICAgcmhvMDogMTAwMCxcclxuICAgIGs6IDFlMyxcclxuICAgIG11OiAwLjEsXHJcbiAgICBnOiA5LjhcclxufTsiXSwic291cmNlUm9vdCI6IiJ9