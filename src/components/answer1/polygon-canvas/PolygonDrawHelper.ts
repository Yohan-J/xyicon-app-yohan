import { CLOSEST_RADIUS, FIRST_VERTEX_HIT_RADIUS, POS_RADIUS, VERTEX_RADIUS } from "../../../constants/polygon-constants";
import { Point } from "../../../types/geometry";
import { closestPointInPolygon } from "../../../utils/answer1/closestPointInPolygon";


export namespace PolygonDrawHelper {

  export function drawCompletePolygons(ctx: CanvasRenderingContext2D, polygons: Point[][]) {
    for (const poly of polygons) {
      if (poly.length === 0) {
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x, poly[i].y);
      }
      ctx.closePath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#1d4ed8';
      for (const v of poly) {
        ctx.beginPath();
        ctx.arc(v.x, v.y, VERTEX_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  export function drawPartiallyCompletePolygon(
    ctx: CanvasRenderingContext2D,
    inProgress: Point[] | null,
    cursorPos: Point | null
  ) {
    if (!inProgress) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(inProgress[0].x, inProgress[0].y);
    for (let i = 1; i < inProgress.length; i++) {
      ctx.lineTo(inProgress[i].x, inProgress[i].y);
    }
    if (cursorPos) {
      ctx.lineTo(cursorPos.x, cursorPos.y);
    }
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    for (const v of inProgress) {
      ctx.beginPath();
      ctx.arc(v.x, v.y, VERTEX_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    // Highlight the first vertex to display where to click to close the polygon.
    ctx.beginPath();
    ctx.arc(inProgress[0].x, inProgress[0].y, FIRST_VERTEX_HIT_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  export function drawClosestPointOnEachPolygon(ctx: CanvasRenderingContext2D, polygons: Point[][], pos: Point) {
    for (const poly of polygons) {
      if (poly.length === 0) {
        continue;
      }

      const closest = closestPointInPolygon(poly, pos);

      ctx.beginPath();
      ctx.arc(closest.x, closest.y, CLOSEST_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = '#1d4ed8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  export function drawPosPoint(ctx: CanvasRenderingContext2D, pos: Point) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, POS_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#070000';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

}
