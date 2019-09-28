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
     * The particle width on visualization space
     */
    metaballWidth:number,
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
    g:number,
    /**
     * The minimum random x acceleration for each particle
     */
    minXAcceleration:number,
    /**
     * The maximum random x acceleration for each particle
     */
    maxXAcceleration:number
}

/**
 * holds the information for the current state of the
 * system and of the integration algorithm.
 * 
 * The alloc state and free state functions take care of storage for the local
 * simulation state.
 */
export interface SystemState {
    /**
     *  Number of particles
    */
    n:number,
    /**
     * Number of pixels required to save all the particles information
     * into a power of 2 texture
     */
    pixelsCount:number,
    /**
     * Particle mass
     */
    mass:number,
    /**
     * Densities
     */
    rho:number[],
    /**
     * Positions
     */
    x:number[],
    /**
     * Velocities (half step)
     */
    vh:number[],
    /**
     * Velocities (full step)
     */
    v:number[],
    /**
     * Acceleration
     */
    a:number[]
}

/**
 * we define the initial geometry of the fluid in terms of an indicator function
 * that is one for points in the domain occupied by fluid and zero elsewhere
 */
export interface IndicatorFunction {
    (x:number, y:number): boolean;
}

export interface Position {
    x:number,
    y:number
};