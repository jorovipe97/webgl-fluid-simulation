import { SystemParameters, SystemState } from '../types';

export function getParameters(parameters:SystemParameters) {
    throw 'Not implemented';
}

export function allocState(n:number) {
    throw 'Not implemented';
}

export function freeState(state:SystemState) {
    throw 'Not implemented';
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

}

export function dampReflect(which:number, barrier:number, x:any, v:any, vh:any) {
    // Coefficient of resitiution
    const DAMP = 0.75;
    // Ignore degenerate cases
    if (v[which] == 0)
        return;

    // Scale back the distance traveled based on time from collision
    const tbounce = (x[which]-barrier)/v[which];
    // the (1-DAMP) is used to make computations taking into acount
    // the damped speed in a moment in which speed hasn't been damped yet
    x[0] -= v[0]*(1-DAMP)*tbounce;
    x[1] -= v[1]*(1-DAMP)*tbounce;

    // Reflect the position and velocity
    x[which] = 2*barrier-x[which];
    v[which] = -v[which];
    vh[which] = -vh[which];

    // Damp the velocities
    v[0] *= DAMP; vh[0] *= DAMP;
    v[1] *= DAMP; vh[1] *= DAMP;
}