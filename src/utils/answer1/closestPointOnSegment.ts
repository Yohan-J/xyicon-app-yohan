import { EPSILON } from "../../constants/constants";
import { Point } from "../../types/geometry";

/**
 * Returns the closest point on segment `a` to `b` to a given position.
 */
export function closestPointOnSegment(a: Point, b: Point, pos: Point): Point {
  const segmentX = b.x - a.x;
  const segmentY = b.y - a.y;

  const segmentLengthSquared = segmentX * segmentX + segmentY * segmentY;

  // If the segment is just a single point.
  if (segmentLengthSquared < EPSILON) {
    return {
      x: a.x,
      y: a.y
    };
  }

  // `pos` point relative to `a` point.
  const pointX = pos.x - a.x;
  const pointY = pos.y - a.y;

  let posOnSegmentPerc =
    (pointX * segmentX + pointY * segmentY) / segmentLengthSquared;

  // Clamp the value between 0 and 1.
  posOnSegmentPerc = Math.max(0, Math.min(1, posOnSegmentPerc));

  return {
    x: a.x + (segmentX * posOnSegmentPerc),
    y: a.y + (segmentY * posOnSegmentPerc),
  };
}
