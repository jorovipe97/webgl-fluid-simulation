import { MetaballsShaderInfo } from '../types';


export function generateMetaballsShader(particlesCount:number, pixelsCount:number):MetaballsShaderInfo {
    // checks if metaballs count is a power of 2
    const countLog2 = Math.log2(pixelsCount);
    if ((countLog2 - Math.floor(countLog2)) > 0) {
        throw 'pixelsCount argument must be a power of two';
    }

    // texture won't be always square textures
    const halfLog = countLog2 / 2;
    const width = 2 ** Math.floor(halfLog);
    const height = 2 ** Math.ceil(halfLog);
    console.log(width, height);

    // #region Shader Source
    const shaderSource = `
precision highp float;
uniform vec2 viewportSize;
// Each pixel in this image is a metaball position
// the position will be encoded in the rg components and the radius
// will be encoded in the b component therefore ignoring
// a component.
uniform sampler2D metaballsPositions;
// TODO: Pass width and height before shader compilation
const int width = ${width};
const int height = ${height};
const int particlesCount = ${particlesCount};

void main(){
    vec2 uv = gl_FragCoord.xy / viewportSize.xy;

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    // Iterate metaballs
    float v = 0.0;
    int currentPixel = 0;
    for (int j = 0; j < height; j++)
    {
        for (int i = 0; i < width; i++)
        {
            if (++currentPixel > particlesCount) break;
            vec2 positionUv = vec2(float(i) / float(width), float(j) / float(height));
            vec4 metaballPosition = texture2D(metaballsPositions, positionUv);
            float dx = metaballPosition.x * viewportSize.x - gl_FragCoord.x;
            float dy = metaballPosition.y * viewportSize.y - gl_FragCoord.y;
            float r = metaballPosition.z;
            v += r*r/(dx*dx + dy*dy);
            // if (dx*dx + dy*dy < r*r)
            // {
            //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            // }
        }
    }

    // float smothedvalue = smoothstep(
    //     0.0,
    //     10.0,
    //     v
    // );
    // gl_FragColor = vec4(clamp(smothedvalue, 0.0, 1.0), 0.0, 0.0, 1.0);

    if (gl_FragCoord.x > viewportSize.x * 0.5) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    // gl_FragColor = vec4(uv.x, 0.0, 0.0, 1.0);

    if (v > 1.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
    `;
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
export const metaballShader:string = `
precision highp float;
uniform vec2 viewportSize;
// Each pixel in this image is a metaball position
// the position will be encoded in the rg components and the radius
// will be encoded in the b component therefore ignoring
// a component.
uniform sampler2D metaballsPositions;
// TODO: Pass width and height before shader compilation
const int width = 4;
const int height = 1;

void main(){
    vec2 uv = gl_FragCoord.xy / viewportSize.xy;

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    // Iterate metaballs
    for (int j = 0; j < height; j++)
    {
        for (int i = 0; i < width; i++)
        {
            vec2 positionUv = vec2(float(i) / float(width), float(j) / float(height));
            vec4 metaballPosition = texture2D(metaballsPositions, positionUv);
            float dx = metaballPosition.x - gl_FragCoord.x;
            float dy = metaballPosition.y - gl_FragCoord.y;
            float r = metaballPosition.z;
            if (dx*dx + dy*dy < r*r)
            {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
    }
}
`;

export const basicFragment:string = `
precision highp float;
uniform vec2 viewportSize;

void main(){
    // Draw every pixel red.
    vec2 uv = gl_FragCoord.xy/viewportSize.xy;
    gl_FragColor = vec4(uv.x, 0.0, 0.0, 1.0);
}
`;