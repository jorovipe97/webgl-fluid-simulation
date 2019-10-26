import { SystemParameters } from '../types';


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