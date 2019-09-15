// The glslcompiler would strip out the unused variables hence their locations will be -1. To resolve this, you must use the variable at hand. In your case, you are not using the sp_cloud and sp_bump samplers hence their locations will be -1.
// To resolve this, u must use the sampler in the shader.
// Another thing, you dont have to declare a uniform in the vertex shader if that uniform is only used in the fragment shader.
// Then if i don't use viewportSize in the shader it wont have a location
export const metaballShader:string = `
precision highp float;
uniform vec2 viewportSize;

void main(){
    // Draw every pixel red.
    vec2 uv = gl_FragCoord.xy/viewportSize.xy;
    gl_FragColor = vec4(uv.x, 0.0, 0.0, 1.0);
}
`;