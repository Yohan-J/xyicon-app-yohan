import { Point } from '../../types/geometry';

/**
 * Squared distance between two points.
 */
export function getSquaredDistance(a: Point, b: Point): number {
  const xDistance = a.x - b.x;
  const yDistance = a.y - b.y;
  return (xDistance * xDistance) + (yDistance * yDistance);
}

/**
 * The distance between two points.
 */
export function getDistance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
