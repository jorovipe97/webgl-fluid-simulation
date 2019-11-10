export class vec4 {
    static fromHexColor (hexColor:number):vec4 {
        const max = 255;
        const r = (+hexColor >> 16) / max;
        const g = ((+hexColor & 0x00FF00) >> 8) / max;
        const b = (+hexColor & 0x0000FF) / max;
        return new vec4(r, g, b);
    }

    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {
    }

    toArray(): number[] {
        return [this.x, this.y, this.z, this.w];
    }
};

export class ColorPalette {

    /**
     * 
     * @param sky1 Background's horizontal linear gradient start color
     * @param sky2 Background's horizontal linear gradient end color
     * @param dropColor Color of the water drop
     */
    constructor(public sky1: vec4, public sky2: vec4, public dropColor: vec4) { }
};

export interface MetaballsShaderInfo {
    shaderSource: string,
    textureDimensions: Dimension
};

export interface Dimension {
    width: number,
    height: number
};

/**
 * Holds the parameters that describe the simulation
 * These parameters are filled in by the getParams function
 */
export interface SystemParameters {
    [index:string]: any,
    /**
     * Particle radius for using on the simulation computations
     */
    h: number,
    /**
     * The particle radius on viewport space for using on visualization
     */
    metaballRadius: number,
    /**
     * Time step
     */
    dt: number,
    /**
     * Reference density
     */
    rho0: number,
    /**
     * Bulk modulus
     */
    k: number,
    /**
     * Viscosity
     */
    mu: number,
    /**
     * Gravity strength
     */
    g: number,
    /**
     * The minimum random x acceleration for each particle
     */
    minXAcceleration: number,
    /**
     * The maximum random x acceleration for each particle
     */
    maxXAcceleration: number,
    maxParticleCount: number,
}

export interface UniformLocationsCache {
    [index: string]: WebGLUniformLocation,
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
     * Index signature to allow instances of this interface to be accesed by using obj[key] signature
     */
    [index: string]: any,
    /**
     *  Number of particles
     */
    n: number,
    /**
     * Number of pixels required to save all the particles information
     * into a power of 2 texture
     */
    pixelsCount: number,
    /**
     * Particle mass
     */
    mass: number,
    /**
     * Densities
     */
    rho: number[],
    /**
     * Positions
     */
    x: number[],
    /**
     * Velocities (half step)
     */
    vh: number[],
    /**
     * Velocities (full step)
     */
    v: number[],
    /**
     * Acceleration
     */
    a: number[]
}

/**
 * we define the initial geometry of the fluid in terms of an indicator function
 * that is one for points in the domain occupied by fluid and zero elsewhere
 */
export interface IndicatorFunction {
    (x: number, y: number): boolean;
}

export interface Position {
    x: number,
    y: number
};