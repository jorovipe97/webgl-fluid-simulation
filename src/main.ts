import { App } from './App';
import { metaballShader } from './shaders/fragments';
import { defaultVertextShader } from './shaders/vertex';


/**
 * This is the entry point of any game logic
 * think of this class as the setup() loop() methods of a processing/openframeworks application
 */
export class MainGame extends App {
    private vertexShader:WebGLShader;
    private metaballsShader:WebGLShader;
    private metaballsProgram:WebGLProgram;

    private viewporSize:Float32Array;

    setup() {
        console.log('setup');
        this.vertexShader = this.compileShader(defaultVertextShader, this.GL.VERTEX_SHADER);
        this.metaballsShader = this.compileShader(metaballShader, this.GL.FRAGMENT_SHADER);
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
        const vertexDataBuffer = this.GL.createBuffer();
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, vertexDataBuffer);
        this.GL.bufferData(this.GL.ARRAY_BUFFER, vertexData, this.GL.STATIC_DRAW);

        // To make the geometry information available in the shader as attributes, we
        // need to tell WebGL what the layout of our data in the vertex buffer is.
        const positionHandle = this.getAttribLocation(this.metaballsProgram, 'position');
        this.GL.enableVertexAttribArray(positionHandle);
        // in c++ this would be done by using typeof(float)
        const bytesPerComponents = 4; // a float 32 bits number needs 4 bytes
        const componentCount = 2; // how much components will have
        const byteSize = componentCount * bytesPerComponents;
        this.GL.vertexAttribPointer(positionHandle,
            componentCount, // position is a vec2
            this.GL.FLOAT, // each component is a float
            false, // don't normalize values
            byteSize, // two 4 byte float components per vertex
            0 // the stride, the distance in bytes from the end of current position to the next position
            );
        // draw triangles specified in setup() method
        this.updateDraw();
    }

    loop() {
        // console.log('loop');

        // this.updateDraw();
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
            this.viewporSize[0] = this.canvas.width;
            this.viewporSize[1] = this.canvas.height;
            const viewporSizeHandle = this.getUniformLocation(this.metaballsProgram, 'viewportSize');
            this.GL.uniform2fv(viewporSizeHandle, this.viewporSize);
            // draw triangles specified in setup() method
            // glUniformXXX should be after glUseProgram and before drawing anything.
            // otherwise uniforms wont be updated in the shader program
        }
        this.updateDraw();
    }
}