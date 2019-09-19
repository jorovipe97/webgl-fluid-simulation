import { App } from './App';
import { metaballShader, generateMetaballsShader } from './shaders/fragments';
import { defaultVertextShader } from './shaders/vertex';
import { MetaballsShaderInfo } from './types';


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
    private shaderInfo:MetaballsShaderInfo;
    private metaballsVelocity:number[][] = []

    setup() {
        console.log('setup');
        // https://stackoverflow.com/questions/9046643/webgl-create-texture
        // Pass metaballs positions to the shader by using a texture 2d
        const particlesCount = 16;
        for (let i = 0; i < particlesCount; i++) {
            
        }
        const positions:any = [
            // [x, y, r, 0]
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
            [Math.random()*this.viewporWidth, Math.random()*this.viewporHeight, Math.random()*100, 0],
        ];
        positions.forEach(() => {
            this.metaballsVelocity.push([
                Math.random()*10 - 5, // vx
                Math.random()*10 - 5 // vy
            ]);
        });
        this.metaballsPositions = new Float32Array(positions.flat());
        this.vertexShader = this.compileShader(defaultVertextShader, this.GL.VERTEX_SHADER);
        // each metaball has 4 components
        const metaballsShaderInfo:MetaballsShaderInfo = generateMetaballsShader(this.metaballsPositions.length / 4);
        this.shaderInfo = metaballsShaderInfo;
        this.metaballsShader = this.compileShader(metaballsShaderInfo.shaderSource, this.GL.FRAGMENT_SHADER);
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

        this.metaballsTexture = this.GL.createTexture();
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        const level = 0;
        const width = metaballsShaderInfo.textureDimensions.width;
        const height = metaballsShaderInfo.textureDimensions.height;
        // Note that in WebGL, contrary to OpenGL, you have to explicitly
        // call getExtension before you can use an extension,
        // like OES_texture_float. And then you want to pass
        // gl.FLOAT as the type parameter to texImage2D.
        const float_texture_ext = this.GL.getExtension('OES_texture_float');
        if (float_texture_ext == null) throw 'OES_texture_float not supported';
        this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, width, height, 0, this.GL.RGBA, this.GL.FLOAT, this.metaballsPositions);
        this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MAG_FILTER, this.GL.NEAREST);
        this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MIN_FILTER, this.GL.NEAREST);
        this.GL.bindTexture(this.GL.TEXTURE_2D, null);

        // Passing metaballs positions to texture unit 1 instead of the default 0
        this.GL.activeTexture(this.GL.TEXTURE1);
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        this.GL.uniform1i(this.GL.getUniformLocation(this.metaballsProgram, 'metaballsPositions'), 1);

        // draw triangles specified in setup() method
        this.updateDraw();
    }

    loop() {
        // console.log('loop');
        for (let i = 0; i < this.metaballsPositions.length; i++) {
            const xId = 4 * i + 0;
            const yId = 4 * i + 1;
            const rId = 4 * i + 2;
            const v = this.metaballsVelocity[Math.floor(i / 4)];
            let x = this.metaballsPositions[xId];
            let y = this.metaballsPositions[yId];
            let r = this.metaballsPositions[rId];
            let vx = v[0];
            let vy = v[1];

            x += vx;
            y += vy;

            if (x + r > this.viewporWidth) {
                x = this.viewporWidth - r;
                vx = -Math.abs(vx);
            } else if (x - r < 0) {
                x = r + 1;
                vx = Math.abs(vx);
            }

            if (y + r > this.viewporHeight) {
                y = this.viewporHeight - r;
                vy = -Math.abs(vy);
            } else if (y - r < 0) {
                y = r + 1;
                vy = Math.abs(vy);
            }

            this.metaballsPositions[xId] = x;
            this.metaballsPositions[yId] = y;
            this.metaballsPositions[rId] = r;
            v[0] = vx;
            v[1] = vy;
        }

        // Passing metaballs positions to texture unit 1 instead of the default 0
        // unit texture and texture was binded in the setup
        // this.GL.activeTexture(this.GL.TEXTURE1);
        // this.GL.bindTexture(this.GL.TEXTURE_2D, this.metaballsTexture);
        // this.GL.uniform1i(this.GL.getUniformLocation(this.metaballsProgram, 'metaballsPositions'), 1);
        const level = 0;
        this.GL.texImage2D(this.GL.TEXTURE_2D, level, this.GL.RGBA, this.shaderInfo.textureDimensions.width, this.shaderInfo.textureDimensions.height, 0, this.GL.RGBA, this.GL.FLOAT, this.metaballsPositions);

        this.updateDraw();
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
            const viewporSizeHandle = this.getUniformLocation(this.metaballsProgram, 'viewportSize', true);
            this.GL.uniform2fv(viewporSizeHandle, this.viewporSize);
            // draw triangles specified in setup() method
            // glUniformXXX should be after glUseProgram and before drawing anything.
            // otherwise uniforms wont be updated in the shader program
        }
        this.updateDraw();
    }
}