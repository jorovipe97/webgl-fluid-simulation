import { Position, UniformLocationsCache } from './types';

/**
 * This base class is the interface with the index.ts file
 * which will allow to the application to get the gl context and utilities timing properties
 * as time and delta time.
 */
export class App
{
    // TODO: Add time and delta time field to this class
    protected GL:WebGLRenderingContext;
    protected canvas:HTMLCanvasElement;

    private uniformLocations: UniformLocationsCache = {};

    mousePosition:Position = null;
    FPS:number;
    /**
     * Time in ms since last frame
     */
    deltaTime:number;
    /**
     * Elapsed time in milliseconds
     */
    elapsedTime:number;
    public aspectRatio:number;
    constructor(glContext: WebGLRenderingContext, canvasElement:HTMLCanvasElement, aspectRatio:number) {
        this.GL = glContext;
        this.canvas = canvasElement;
        this.aspectRatio = aspectRatio;
    }

    /**
     * Utility method to throw an error if shader compilation fails
     */
    compileShader(shaderSource:string, shaderType:any):WebGLShader {
        const shader = this.GL.createShader(shaderType);
        this.GL.shaderSource(shader, shaderSource);
        this.GL.compileShader(shader);

        if (!this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS)) {
            throw "Shader compile failed with: " + this.GL.getShaderInfoLog(shader);
        }

        return shader;
    }

    /**
     * Utility to throw error if the attribute was not found
     * @param program 
     * @param name 
     */
    getAttribLocation(program:WebGLProgram, name:string):number {
        var attributeLocation = this.GL.getAttribLocation(program, name);
        if (attributeLocation === -1) {
            throw 'Can not find attribute ' + name + '.';
        }
        return attributeLocation;
    }

    getUniformLocation(program:WebGLProgram, name:string, ignoreErrors:boolean = false):WebGLUniformLocation {
        let uniformLocation = this.uniformLocations[name];
        if (!uniformLocation) {
           uniformLocation = this.GL.getUniformLocation(program, name);
           if (uniformLocation === null) {
               if (!ignoreErrors) throw 'Can not find uniform ' + name + '.';
           } else {
               // If no errors cache the uniform location
               this.uniformLocations[name] = uniformLocation;
           }
        }
        return uniformLocation;
    }

    clear():void {
        this.GL.clearColor(0.0, 0.0, 0.0, 1.0);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
        // this.GL.drawArrays(this.GL.TRIANGLE_STRIP, 0, 4);
    }

    drawMesh():void {
        this.GL.drawArrays(this.GL.TRIANGLE_STRIP, 0, 4);
    }

    // #region API Methods
    public setup():void {

    }

    public unload():void {
        // removes previously cached uniform locations
        this.uniformLocations = {};
    }

    public loop():void {

    }

    public onResize():void {

    }
    // #endregion API Methods
}