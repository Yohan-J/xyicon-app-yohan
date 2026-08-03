import { Point } from '../../types/geometry';
import { getSquaredDistance } from './distance-utils';
import { closestPointOnSegment } from './closestPointOnSegment';
import { isPointInPolygon } from './isPointInPolygon';

/**
 * Returns the closest point to `pos` that lies inside or on the boundary of the polygon `poly`.
 */
export function closestPointInPolygon(poly: Point[], pos: Point): Point {
  if (poly.length === 0) {
    return pos;
  }

  // Already inside (or exactly on the boundary).
  if (isPointInPolygon(poly, pos)) {
    return pos;
  }

  // Else, find the closest point.
  let closestPoint = poly[0];
  let closestDistance = Infinity;

  for (let i = 0; i < poly.length; i++) {
    const nextIndex = (i + 1) % poly.length;
    const current = poly[i];
    const next = poly[nextIndex];

    const pointOnEdge = closestPointOnSegment(current, next, pos);
    const distance = getSquaredDistance(pos, pointOnEdge);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPoint = pointOnEdge;
    }
  }

  return closestPoint;
}
