import { IndicatorFunction } from '../types';

/**
 * Note that positions and dimensions must be given in normalized values
 * in range [0, 1]
 * @param ptx Top-left corner x position
 * @param pty Top-left corner y position
 * @param width Width from top-left corner point
 * @param height Height from top-left corner point
 */
export function boxIndicatorFactory(ptx:number, pty:number, width:number, height:number):IndicatorFunction {
    return function boxIndicator(x:number, y:number):boolean {
        return (x > ptx && x < (ptx + width)) &&
            (y > pty && y < (pty + height));
    }
}

/**
 * Note that positions and dimensions must be given in normalized values
 * in range [0, 1]
 * @param centerX X coordinate of circle center
 * @param centerY Y coordinate of circle center
 * @param radius Circle radius
 */
export function circleIndicatorFactory(centerX:number, centerY:number, radius:number):IndicatorFunction {
    // TODO: Use a function factory to generalize the circle indicator
    return function circleIndicator(x:number, y:number):boolean
    {
        // center
        const dx = (x-centerX);
        const dy = (y-centerY);
        const r2 = dx*dx + dy*dy;
        return (r2 < radius*radius);
    }
}
