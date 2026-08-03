import { Point } from "../../types/geometry";
import { getSquaredDistance } from "./distance-utils";
import { closestPointOnSegment } from "./closestPointOnSegment";
import { EPSILON } from "../../constants/constants";

/**
 * Determines whether a point lies inside or on the boundary of a polygon.
 */
export function isPointInPolygon(poly: Point[], pos: Point): boolean {
  const pointCount = poly.length;
  if (pointCount === 0) {
    return false;
  }

  // Check the boundary first so points on an edge/vertex are treated as inside.
  for (let i = 0; i < pointCount; i++) {
    const nextIndex = (i + 1) % pointCount;

    const current = poly[i];
    const next = poly[nextIndex];

    const pointOnEdge = closestPointOnSegment(current, next, pos);

    if (getSquaredDistance(pos, pointOnEdge) < EPSILON) {
      return true;
    }
  }

  // Standard even-odd ray cast.
  let inside = false;
  for (let i = 0; i < pointCount; i++) {
    const nextIndex = (i + 1) % pointCount;

    const current = poly[i];
    const next = poly[nextIndex];

    const currentIsAbovePosY = current.y > pos.y;
    const nextIsAbovePosY = next.y > pos.y;
    const rayCrossesEdge = currentIsAbovePosY !== nextIsAbovePosY;

    if (!rayCrossesEdge) {
      continue;
    }

    const edgeWidth = next.x - current.x;
    const edgeHeight = next.y - current.y;

    const distanceFromCurrent = pos.y - current.y;
    const perc = distanceFromCurrent / edgeHeight;
    const horizontalOffset = edgeWidth * perc;

    const intersectionX = current.x + horizontalOffset;
    if (pos.x < intersectionX) {
      inside = !inside;
    }
  }

  return inside;
}
