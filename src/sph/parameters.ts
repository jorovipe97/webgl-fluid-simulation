import { SystemParameters, ColorPalette, vec4 } from '../types';

/**
 * This object shouldn't be modified directly, instead use the 
 * getParameters() function on sph/index.ts
 */
export const defaultParameters:SystemParameters = {
    dt: 1e-2,
    // h: 3.2e-2,
    h: 4e-1,
    maxParticleCount: -1,
    // h: 7e-1,
    // metaballRadius: 8,
    metaballRadius: 0.00625, // 8/1280
    rho0: 1000, // originally 1000 (water density is 1000)
    k: 1e3, // bulk modulus
    mu: 0.1, // viscosity
    g: 9.8,
    minXAcceleration: -5,
    maxXAcceleration: 5
};

export const palettes:ColorPalette[] = [
    new ColorPalette(
        vec4.fromHexColor(0x02417B),
        vec4.fromHexColor(0x07519B),
        vec4.fromHexColor(0x009DFF)
    ),
    new ColorPalette(
        vec4.fromHexColor(0x29BBAE),
        vec4.fromHexColor(0x0CB3A2),
        vec4.fromHexColor(0xC0D346)
    ),
    new ColorPalette(
        vec4.fromHexColor(0xFF3E23),
        vec4.fromHexColor(0xFE3E23),
        vec4.fromHexColor(0xFEC223)
    )
];