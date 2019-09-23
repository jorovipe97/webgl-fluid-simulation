export interface MetaballsShaderInfo {
    shaderSource:string,
    textureDimensions:Dimension
};

export interface Dimension {
    width:number,
    height:number
};

/**
 * Holds the parameters that describe the simulation
 * These parameters are filled in by the getParams function
 */
export interface SystemParameters {
    npframe:number, // steps per frame
    h:number, /* Particle size */
    dt:number, /* Time step */
    rho0:number, /* Reference density */
    k:number, /* Bulk modulus */
    mu:number, /* Viscosity */
    g:number /* Gravity strength */
}

/**
 * holds the information for the current state of the
 * system and of the integration algorithm.
 * 
 * The alloc state and free state functions take care of storage for the local
 * simulation state.
 */
export interface SystemState {
    n:number, /* Number of particles */
    mass:number, /* Particle mass */
    rho:Float32Array, /* Densities */
    x:Float32Array, /* Positions */
    vh:Float32Array, /* Velocities (half step) */
    v:Float32Array, /* Velocities (full step) */
    a:Float32Array /* Acceleration */
}