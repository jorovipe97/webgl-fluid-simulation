import { SystemParameters, SystemState, IndicatorFunction } from '../types';
import { defaultParameters } from './parameters';
import { boxIndicatorFactory, circleIndicatorFactory } from './indicatorsFunctions';

export function getParameters():SystemParameters {
    // clones this object to ensure defaultParameters object is never destroyed
    return Object.assign({}, defaultParameters);
}

function initializeArray(elementsCount:number, defaultValue:number = 0):number[] {
    const array = [];
    for (let i = 0; i < elementsCount; i++) {
        array[i] = defaultValue;
    }
    return array;
}

export function allocState(n:number, pixelsCount:number):SystemState {
    return {
        n,
        pixelsCount,
        mass: 1,
        rho: initializeArray(n), // only and entry per particle
        x: initializeArray(n*2), // for x and y component
        vh: initializeArray(n*2), // for x and y component
        v: initializeArray(n*2), // for x and y component
        a: initializeArray(n*2) // for x and y component
    };
}

// TODO: What about using Object.keys() to remove automatically all the properties of state object
export function freeState(state:SystemState) {
    for (const key in state) {
        delete state[key];
    }

    // delete state['n'];
    // delete state['pixelsCount'];
    // delete state['mass'];
    // delete state['rho'];
    // delete state['x'];
    // delete state['vh'];
    // delete state['v'];
    // delete state['a'];
}
export function freeParameters(parameters: SystemParameters) {
    for (const key in parameters) {
        delete parameters[key];
    }
}

export function computeDensity(state:SystemState, parameters:SystemParameters) {
    const { n, rho, x, mass } = state;
    // const h = parameters.metaballWidth;
    const h = parameters.h;
    const h2 = h*h;
    const h8 = h2*h2*h2*h2;
    const C = 4 * mass / Math.PI / h8;
    const C2 = 4 * mass / Math.PI / h2;

    // We search for neighbors of node i by checking every particle, which is not
    // very efficient. We do at least take advange of the symmetry of the update (i
    // contributes to j in the same way that j contributes to i).

    // for each particle
    for (let i = 0; i < n; i++) {
        rho[i] += C2;
        // iterate each other particle
        for (let j = i + 1; j < n; j++) {
            const dx = x[2*i + 0] - x[2*j + 0];
            const dy = x[2*i + 1] - x[2*j + 1];
            const r2 = dx + dy;
            const z = h2 - r2;
            if (z > 0) {
                const rho_ij = C*z*z*z;
                rho[i] += rho_ij;
                rho[j] += rho_ij;
            }
        }
    }
}

/**
 * Like compute density,
 * the compute accel routine takes advantage of the symmetry of the interaction
 * forces (finteract_ij = −finteract_ji )
 * but it does a very expensive brute force search for
 * neighbors.
 * TODO: Apply the Barnes-Hut algorithm which cuts the complexity of n-body simulations from  ∼O(n2)  to  ∼O(nlog(n)).
 * @param state 
 * @param parameters 
 */
export function computeAcceleration(state:SystemState, parameters:SystemParameters) {
    // unpack basic parameters
    const { rho0, k, mu, g, minXAcceleration, maxXAcceleration } = parameters;
    // const h = parameters.metaballWidth;
    const h = parameters.h;
    const h2 = h*h;
    // unpack system state
    const { mass, rho, x, v, a, n } = state;

    // compute density
    computeDensity(state, parameters);

    // add gravity to each particle
    for (let i = 0; i < n; i++) {
        const randomFactor = Math.random();
        const xAccel = minXAcceleration*(1-randomFactor) + maxXAcceleration*randomFactor;
        a[2*i + 0] = xAccel; // x component
        // a[2*i + 1] = -g; // y component
        a[2*i + 1] = -g; // y component
    }

    // constants for interaction terms
    const Co = mass / Math.PI / (h2*h2);
    const Cp = 15*k;
    const Cv = -40*mu;

    // Compute interaction forces
    // for each particle
    for (let i = 0; i < n; i++) {
        const rhoi = rho[i];
        // iterate each other particle
        for (let j = i + 1; j < n; j++) {
            const dx = x[2*i + 0] - x[2*j + 0];
            const dy = x[2*i + 1] - x[2*j + 1];
            const r2 = dx*dx + dy*dy;
            // is the j particle is in the radious h of i?
            if (r2 < h2) {
                const rhoj = rho[j];
                const q = Math.sqrt(r2)/h;
                const u = 1 - q;
                // TODO: Remove rhoi from wo since it don't appears on the paper's equations
                const wo = Co * u / rhoi / rhoj;
                const wp = wo * Cp * (rhoi + rhoj - 2*rho0) * u/q;
                const wv = wo*Cv;

                const dvx = v[2*i + 0] - v[2*j + 0];
                const dvy = v[2*i + 1] - v[2*j + 1];

                // TODO: Understand this.
                a[2*i+0] += (wp*dx + wv*dvx);
                a[2*i+1] += (wp*dy + wv*dvy);
                a[2*j+0] -= (wp*dx + wv*dvx);
                a[2*j+1] -= (wp*dy + wv*dvy);
            }
        }
    }

    // printCurrentState(state, 'computeAcceleration()');
    // debugger;

}

export function leapfrogStep(state:SystemState, dt:number) {
    const { a, vh, v, x, n } = state;

    // TODO: Use the integer steps formula for the leapfrog
    // the integer step formula are literally the kinematic equations
    // which use the taylor therom to describe de position in moment t.
    // see: https://www.algorithm-archive.org/contents/verlet_integration/verlet_integration.html
    // this will save us a for loop

    for (let i = 0; i < 2*n; ++i) vh[i] += a[i] * dt;
    for (let i = 0; i < 2*n; ++i) v[i] = vh[i] + a[i] * dt / 2;
    for (let i = 0; i < 2*n; ++i) x[i] += vh[i] * dt;

    reflectBoundaryConditions(state);
}

/**
 * At the first step, the leapfrog iteration only has the initial velocities v0, so we
 * need to do something special.
 * @param state 
 * @param dt 
 */
export function leapfrogStart(state:SystemState, dt:number) {
    const { a, vh, v, x, n } = state;

    for (let i = 0; i < 2*n; ++i) vh[i] = v[i] + a[i] * dt / 2;
    for (let i = 0; i < 2*n; ++i) v[i] += a[i] * dt;
    for (let i = 0; i < 2*n; ++i) x[i] += vh[i] * dt;
    reflectBoundaryConditions(state);
}

export function reflectBoundaryConditions(state:SystemState) {
    // Boundaries of the computational domain
    const XMIN = 0.0;
    const XMAX = 1.0;
    const YMIN = 0.0;
    const YMAX = 1.0;
    const { x, n } = state;
    for (let i = 0; i < n; ++i) {
        const idx = i * 2;
        if (x[idx + 0] < XMIN) dampReflect(0, XMIN, state, idx);
        if (x[idx + 0] > XMAX) dampReflect(0, XMAX, state, idx);
        if (x[idx + 1] < YMIN) dampReflect(1, YMIN, state, idx);
        if (x[idx + 1] > YMAX) dampReflect(1, YMAX, state, idx);
    }
}

export function reflectHorizontalLineObstacle(state:SystemState, ptx:number = 0.25, pty:number = 0.45, width:number = 0.06) {
    const { x, n } = state;
    const half = 0.5;
    for (let i = 0; i < n; ++i) {
        const idx = i * 2;
        const isXOverHorizontalLine = x[idx + 0] > (ptx - width * half) && x[idx + 0] < (ptx + width * half);
        const isYUnderTheLine = x[idx + 1] < pty;
        if (isXOverHorizontalLine && isYUnderTheLine) {
            dampReflect(1, pty, state, idx);
        }
    }
}

export function dampReflect(which:number, barrier:number, state:SystemState, idx:number) {
    const { vh, v, x } = state;

    // Coefficient of resitiution
    const DAMP = 0.75;
    // Ignore degenerate cases
    if (v[idx + which] == 0)
        return;

    // Scale back the distance traveled based on time from collision
    const tbounce = (x[idx + which]-barrier)/v[idx + which];
    // the (1-DAMP) is used to make computations taking into acount
    // the damped speed in a moment in which speed hasn't been damped yet
    x[idx + 0] -= v[idx + 0]*(1-DAMP)*tbounce;
    x[idx + 1] -= v[idx + 1]*(1-DAMP)*tbounce;

    // Reflect the position and velocity
    x[idx + which] = 2*barrier-x[idx + which];
    v[idx + which] = -v[idx + which];
    vh[idx + which] = -vh[idx + which];

    // Damp the velocities
    v[idx + 0] *= DAMP; vh[idx + 0] *= DAMP;
    v[idx + 1] *= DAMP; vh[idx + 1] *= DAMP;
}

function placeParticles(parameters:SystemParameters, indicatorFunction:IndicatorFunction):SystemState {
    const h = parameters.h;

    // separation between particles will be of 0.3
    const hh = h / 1.3;
    let count:number = 0;
    // Count mesh points that fall in indicated region.
    for (let x = 0; x < 1; x += hh)
            for (let y = 0; y < 1; y += hh)
                count += indicatorFunction(x,y) ? 1 : 0;

    // the number of particles must be a power of two
    // to render it on the gpu
    console.log('count', count);
    // Since it's possible that the count is not a power of 2
    // I'll compute the top-nearest count of pixels required
    // to transfer all the particles.
    const pow = Math.ceil(Math.log2(count));
    const texturePixelsCount = 2 ** pow;
    // count = 2 ** pow;
    console.log('texturePixels', texturePixelsCount);
    // Populate the particle data structure
    const s:SystemState = allocState(count, texturePixelsCount);
    let p = 0;
    for (let x = 0; x < 1; x += hh) {
        for (let y = 0; y < 1; y += hh) {
            if (indicatorFunction(x,y) && p < count) {
                s.x[2*p+0] = x;
                s.x[2*p+1] = y;
                s.v[2*p+0] = 0;
                s.v[2*p+1] = 0;
                ++p;
            }
        }
    }
    return s;
}

export function normalizeMass(state:SystemState, parameters:SystemParameters):void {
    state.mass = 1;
    computeDensity(state, parameters);

    // reference density
    let rho0 = parameters.rho0;
    let rho2s = 0;
    let rhos = 0;

    for (let i = 0; i < state.n; ++i) {
        rho2s += (state.rho[i])*(state.rho[i]);
        rhos += state.rho[i];
    }
    // TODO: Understand how this normalization is done
    // mass necessary in order to achieve the desired reference density
    state.mass *= (rho0*rhos / rho2s);
}

export function initParticles(parameters:SystemParameters):SystemState
{
    // Open gl shader coordinate system is on the first cartesian coordinate
    const ptx = 0.25;
    const pty = 0.5;
    const width = 0.5;
    const height = 0.5;
    const s:SystemState = placeParticles(parameters, boxIndicatorFactory(ptx, pty, width, height));
    // const centerX = 0.5;
    // const centerY = 0.5;
    // const radius = 0.25;
    // const s:SystemState = placeParticles(parameters, circleIndicatorFactory(centerX, centerY, radius));
    normalizeMass(s, parameters);
    printCurrentState(s, 'after normalizeMass()');
    return s;
}

export function getTextureData(textureData:Float32Array, state:SystemState, parameters:SystemParameters):void {
    const { n, pixelsCount } = state;
    if (textureData.length !== (pixelsCount * 4)) throw 'Texture data array must be an array of 4 times the number of pixelsCount on the system state instance';

    for (let i = 0; i < n; i++) {
        textureData[4*i + 0] = state.x[2*i + 0]; // x, position
        textureData[4*i + 1] = state.x[2*i + 1]; // y, position
        // velocity half step back
        // TODO: Check it out this
        // velocity direction
        // const vx = state.v[2*i + 0]; // x, velocity
        // const vy = state.v[2*i + 1]; // y, velocity
        // const vMag = Math.sqrt(vx*vx + vy*vy);
        textureData[4*i + 2] = state.v[2*i + 0]; // x, velocity
        textureData[4*i + 3] = state.v[2*i + 1]; // y, velocity
    }
}

export function printCurrentState(state:SystemState, description:string = undefined):void {
    if (description) {
        console.log(description, JSON.parse(JSON.stringify(state)));
    } else {
        console.log(JSON.parse(JSON.stringify(state)));
    }
}