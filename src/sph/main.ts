import { App } from '../App';
import { metaballShader, generateMetaballsShaderSource } from '../shaders/fragments';
import { defaultVertextShader } from '../shaders/vertex';
import { MetaballsShaderInfo, SystemState, SystemParameters } from '../types';
import { getParameters, initParticles, computeAcceleration, leapfrogStart, leapfrogStep, getTextureData, printCurrentState, reflectHorizontalLineObstacle, freeState, freeParameters } from './index';
import { ColorPalette } from '../types';
import { palettes } from './parameters';

/**
 * This is the entry point of any game logic
 * think of this class as the setup() loop() methods of a processing/openframeworks application
 */
export class MainGame extends App {
    private vertexShader:WebGLShader;
    private metaballsShader:WebGLShader;
    private metaballsProgram:WebGLProgram;

    private viewporSize:Float32Array;
    private metaballsPositions:Float32Array;
    private metaballsTexture:WebGLTexture;
    private vertexBuffer:WebGLBuffer;
    private shaderInfo:MetaballsShaderInfo;
    private metaballsVelocity:number[][] = [];
    private textureData:Float32Array;

    public sphState:SystemState;
    public sphParameters:SystemParameters;
    public isSettingUp:boolean = true;

    private colorPalette:ColorPalette;
    private visualizationRadius:number;
    private _mouseInteractionEnabled:boolean = true;
    get mouseInteractionEnabled () {
        return this._mouseInteractionEnabled;
    }
    set mouseInteractionEnabled (value:boolean) {
        this._mouseInteractionEnabled = value;
    }

    setup() {
        console.log('setup');
        // If sphParameters is undefined
        // is undefined only the first time
        if (!this.sphParameters) {
            this.sphParameters = getParameters();
            this.colorPalette = palettes[0];
            this.visualizationRadius = this.sphParameters.metaballRadius;
        }

        if (!this.sphParameters) throw 'SPH parameters can\'t be null';
        this.sphState = initParticles(this.sphParameters);
        computeAcceleration(this.sphState, this.sphParameters);
        leapfrogStart(this.sphState, this.sphParameters.dt);

        // https://stackoverflow.com/questions/9046643/webgl-create-texture
        // Pass metaballs positions to the shader by using a texture 2d
        this.vertexShader = this.compileShader(defaultVertextShader, this.GL.VERTEX_SHADER);
        // each particle has 2 components
        this.shaderInfo = generateMetaballsShaderSource(this.sphState, this.sphParameters);
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
        const vertexData = new Float32Array([
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
        const bytesPerComponent = 4; // a float 32 bits number needs 4 bytes
        const componentCount = 2; // how much components will have
        const byteSize = componentCount * bytesPerComponent;
        this.GL.vertexAttribPointer(0,
            componentCount, // position is a vec2
            this.GL.FLOAT, // each component is a float
            false, // don't normalize values
            byteSize, // two 4 byte float components per vertex
            0 // the stride, the distance in bytes from the end of current position to the next position
        );

        this.metaballsTexture = this.GL.createTexture();
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        const level = 0;
        const width = this.shaderInfo.textureDimensions.width;
        const height = this.shaderInfo.textureDimensions.height;
        console.log(width, height);
        // Note that in WebGL, contrary to OpenGL, you have to explicitly
        // call getExtension before you can use an extension,
        // like OES_texture_float. And then you want to pass
        // gl.FLOAT as the type parameter to texImage2D.
        const float_texture_ext = this.GL.getExtension('OES_texture_float');
        if (float_texture_ext == null) throw 'OES_texture_float not supported';
        // TODO: Move this to a function which converts SystemState and SystemParameters into a chunk of texture data to
        // send positions to gpu.
        this.textureData = new Float32Array(this.sphState.pixelsCount * 4);
        getTextureData(this.textureData, this.sphState, this.sphParameters);
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
    }

    loop() {
        if (this.isSettingUp) return;
        this.clear();
        // console.log(this.FPS);
        // console.log(this.mousePosition);
        computeAcceleration(this.sphState, this.sphParameters);
        leapfrogStep(this.sphState, this.sphParameters.dt);
        if (this.mouseInteractionEnabled)
            // Move horizontal line by using mouse
            if (this.mousePosition) {
                const ptx = this.mousePosition.x / this.GL.drawingBufferWidth;
                const pty = 1 - (this.mousePosition.y / this.GL.drawingBufferHeight);
                reflectHorizontalLineObstacle(this.sphState, ptx, pty);
            } else {
                reflectHorizontalLineObstacle(this.sphState);
            }
        getTextureData(this.textureData, this.sphState, this.sphParameters);
        // console.log(this.FPS);
        // unit texture and texture were binded in the setup
        const level = 0;
        this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, this.shaderInfo.textureDimensions.width, this.shaderInfo.textureDimensions.height, 0, this.GL.RGBA, this.GL.FLOAT, this.textureData);
        this.drawMesh();
    }

    // onResize gets called before and after setup
    onResize() {
        console.log('onResize');
        if (this.viewporSize == null)
            this.viewporSize = new Float32Array(2);

        // since this method gets called before the setup.
        // it is possible that the program hasn't been created yet
        if (this.metaballsProgram)
        {
            this.viewporSize[0] = this.GL.drawingBufferWidth;
            this.viewporSize[1] = this.GL.drawingBufferHeight;
            const viewporSizeHandle = this.getUniformLocation(this.metaballsProgram, 'viewportSize', true);
            this.GL.uniform2fv(viewporSizeHandle, this.viewporSize);
            // draw triangles specified in setup() method
            // glUniformXXX should be after glUseProgram and before drawing anything.
            // otherwise uniforms wont be updated in the shader program
        }

        if (this.metaballsProgram) {
            this.clear();
            this.drawMesh();
        }
    }

    unload () {
        // remove uniforms locations cache
        super.unload();
        // if already created release sphState arrays and other resources
        if (this.sphState) {
            freeState(this.sphState);
            this.sphState = null;
        }
        if (this.sphParameters) {
            freeParameters(this.sphParameters);
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
    }

    changeSimulationParameters (parameters: SystemParameters) {
        this.isSettingUp = true;
        this.unload();
        this.sphParameters = parameters;
        this.setup();
        this.onResize();
        this.isSettingUp = false;
    }



    /**
     * This method is called from ui/index
     * @param palette The new color palete to use
     */
    setupColorPalette (palette:ColorPalette) {
        const sky1Handler = this.getUniformLocation(this.metaballsProgram, 'palette.sky1');
        const sky2Handler = this.getUniformLocation(this.metaballsProgram, 'palette.sky2');
        const dropColorHandler = this.getUniformLocation(this.metaballsProgram, 'palette.dropColor');

        this.GL.uniform4fv(sky1Handler, palette.sky1.toArray());
        this.GL.uniform4fv(sky2Handler, palette.sky2.toArray());
        this.GL.uniform4fv(dropColorHandler, palette.dropColor.toArray());

        this.colorPalette = palette;
    }

    setupVisualizationRadius(value:number) {
        // TODO: Cache uniform location
        const radiusHandler = this.getUniformLocation(this.metaballsProgram, 'r');
        this.GL.uniform1f(radiusHandler, value);

        this.visualizationRadius = value;
    }
}