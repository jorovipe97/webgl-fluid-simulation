import { MetaballsShaderInfo } from '../types';
// TODO: Pass particle velocity
// TODO: Pass color presets
// TODO: Support change of number of particles from the gui

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
// TODO: Add a tail in the oposite direction of the particle velocity
    const waterDropFunction = `
float gaussFalloff( float dist, float radius )
{
    return clamp(pow(360., -pow(dist/radius, 2.5) - 0.01), 0.0, 1.0);
}

float blendAdd(float base, float blend) {
    return min(base+blend,1.0);
}

vec3 blendAdd(vec3 base, vec3 blend) {
    return min(base+blend,vec3(1.0));
}

vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
    return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
}

vec3 blendAlpha(vec4 base, vec4 over)
{
    return over.rgb * over.a + base.rgb * (1. - over.a);
}

vec4 waterDrop( vec4 texel, float distToCenter, float radius ) {
    vec4 color = vec4(0.0);
    // factor will be approached to 0 if point is close to center
    // and aproached to 1 if is more distant

    float r = distToCenter;
    // outer shadow
    float hardness1 = 150.0;
    // float hardness1 = 1.0;
    float factor = hardness1 * gaussFalloff(r, radius);
    vec4 dropColor = vec4(0., 1., 0., 1.0);

    // inner shadow (closer to the particle center)
    float hardness2 = 1.0;
    float factor2 = hardness2 * gaussFalloff(r, radius);
    vec4 dropColor2 = vec4(1.000, 0.000, 0., 1.0);

    vec4 color1 = mix(texel, dropColor, max(1.0-factor, 0.0));
    vec4 color2 = mix(texel, dropColor2, max(1.0-factor2, 0.0));
    color.rgb = blendAdd(color1.rgb, color2.rgb, 0.3);

    if (distToCenter < radius) {
        color.a = 1.;
    }

    return color;
}
    `;

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

${waterDropFunction}

void main() {
    vec2 uv = gl_FragCoord.xy / viewportSize.xy;

    vec4 sky1 = vec4(0.282, 0.820, 0.800, 1.);
    vec4 sky2 = vec4(0.000, 0.808, 0.720, 1.);
    vec4 baseColor = mix(sky1, sky2, uv.x);

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
        }
    }

    if (v > 1.0) {
        baseColor = vec4(0.000, 0.749, 1.000, 1.0);
    }

    currentPixel = 0;
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
            vec4 drops = waterDrop(vec4(0.275, 0.510, 0.706, 1.), sqrt(dx*dx + dy*dy), r);
            baseColor.rgb = blendAlpha(baseColor, drops);
        }
    }

    gl_FragColor = baseColor;
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
