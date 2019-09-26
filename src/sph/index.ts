import { SystemParameters, SystemState, IndicatorFunction } from '../types';

export function getParameters(parameters:SystemParameters) {
    throw 'Not implemented';
}

export function allocState(n:number):SystemState {
    return {
        n: n,
        mass: 1,
        rho: new Float32Array(n),
        x: new Float32Array(n),
        vh: new Float32Array(n),
        v: new Float32Array(n),
        a: new Float32Array(n)
    };
}

export function freeState(state:SystemState) {
    delete state['n'];
    delete state['mass'];
    delete state['rho'];
    delete state['x'];
    delete state['vh'];
    delete state['v'];
    delete state['a'];
}

export function computeDensity(state:SystemState, parameters:SystemParameters) {
    const { n, rho, x, mass } = state;
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
        for (let j = i + 1; i < n; j++) {
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
    const {h, rho0, k, mu, g} = parameters;
    const h2 = h*h;
    // unpack system state
    const { mass, rho, x, v, a, n } = state;

    // compute density
    computeDensity(state, parameters);

    // add gravity to each particle
    for (let i = 0; i < n; i++) {
        a[2*i + 0] = 0; // x component
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
        for (let j = i + 1; i < n; j++) {
            const dx = x[2*i + 0] - x[2*j + 0];
            const dy = x[2*i + 1] - x[2*j + 1];
            const r2 = dx + dy;
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
        if (x[0] < XMIN) dampReflect(0, XMIN, state, idx);
        if (x[0] > XMAX) dampReflect(0, XMAX, state, idx);
        if (x[1] < YMIN) dampReflect(1, YMIN, state, idx);
        if (x[1] > YMAX) dampReflect(1, YMAX, state, idx);
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

function boxIndicator(x:number, y:number):boolean {
    return (x < 0.5) && (y < 0.5);
}

// TODO: Use a function factory to generalize the circle indicator
function circleIndicator(x:number, y:number):boolean
{
    // center
    const centerX = 0.5;
    const centerY = 0.3;
    const radius = 0.25;

    const dx = (x-centerX);
    const dy = (y-centerY);
    const r2 = dx*dx + dy*dy;
    return (r2 < radius*radius);
}

function placeParticles(parameters:SystemParameters, indicatorFunction:IndicatorFunction):SystemState {
    const h = parameters.h;
    // separation between particles will be of 0.3
    const hh = h / 1.3;

    // Count mesh points that fall in indicated region.
    let count:number = 0;
    for (let x = 0; x < 1; x += hh)
        for (let y = 0; y < 1; y += hh)
            count += indicatorFunction(x,y) ? 1 : 0;

    // Populate the particle data structure
    const s:SystemState = allocState(count);
    let p = 0;
    for (let x = 0; x < 1; x += hh) {
        for (let y = 0; y < 1; y += hh) {
            if (indicatorFunction(x,y)) {
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

function initParticles(parameters:SystemParameters):SystemState
{
    const s:SystemState = placeParticles(parameters, circleIndicator);
    normalizeMass(s, parameters);
    return s;
}