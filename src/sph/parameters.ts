import { SystemParameters, ColorPalette, vec4 } from '../types';

export const defaultParameters:SystemParameters = {
    dt: 1e-2,
    // h: 3.2e-2,
    h: 7e-2,
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
        new vec4(0.1529, 0.2352, 0.4588, 1.),
        new vec4(0.0980, 0.1647, 0.3372, 1.),
        new vec4(0.000, 0.749, 1.000, 1.0)
    ),
    new ColorPalette(
        new vec4(1, 0, 0, 1.),
        new vec4(0.9, 0, 0, 1.),
        new vec4(0, 1, 0, 1.0)
    ),
    new ColorPalette(
        new vec4(0, 0, 1, 1.),
        new vec4(0, 0, 0.9, 1.),
        new vec4(1, 0, 0, 1.0)
    )
];