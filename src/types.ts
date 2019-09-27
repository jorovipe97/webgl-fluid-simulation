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
    /**
     * steps per frame
     */
    npframe:number,
    /**
     * Particle size
     */
    h:number,
    /**
     * Time step
     */
    dt:number,
    /**
     * Reference density
     */
    rho0:number,
    /**
     * Bulk modulus
     */
    k:number,
    /**
     * Viscosity
     */
    mu:number,
    /**
     * Gravity strength
     */
    g:number
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
    rho:number[], /* Densities */
    x:number[], /* Positions */
    vh:number[], /* Velocities (half step) */
    v:number[], /* Velocities (full step) */
    a:number[] /* Acceleration */
}

/**
 * we define the initial geometry of the fluid in terms of an indicator function
 * that is one for points in the domain occupied by fluid and zero elsewhere
 */
export interface IndicatorFunction {
    (x:number, y:number): boolean;
}