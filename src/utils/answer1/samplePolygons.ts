import { Point } from "../../types/geometry";

export const SQUARE: Point[] = [
  { x: 80, y: 80 },
  { x: 230, y: 80 },
  { x: 230, y: 230 },
  { x: 80, y: 230 },
];

export const L_SHAPE: Point[] = [
  { x: 320, y: 80 },
  { x: 420, y: 80 },
  { x: 420, y: 155 },
  { x: 495, y: 155 },
  { x: 495, y: 230 },
  { x: 320, y: 230 },
];

export const DEFAULT_POLYGONS: Point[][] = [
  SQUARE,
  L_SHAPE
];
