import React, { useRef, useEffect, useState, useCallback } from 'react';
import './PolygonCanvas.css';
import { Point } from '../../../types/geometry';
import { DEFAULT_POLYGONS } from '../../../utils/answer1/samplePolygons';
import { getDistance } from '../../../utils/answer1/distance-utils';
import { PolygonDrawHelper } from './PolygonDrawHelper';
import { DEFAULT_POS, FIRST_VERTEX_HIT_RADIUS, MIN_POLYGON_VERTICES, POS_HIT_RADIUS } from '../../../constants/polygon-constants';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;


const PolygonCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState<Point>(DEFAULT_POS);
  const [polygons, setPolygons] = useState<Point[][]>(DEFAULT_POLYGONS);
  const [inProgress, setInProgress] = useState<Point[] | null>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  const [dragging, setDragging] = useState(false);

  const getCanvasPoint = useCallback((e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top),
    };
  }, []);

  const handleReset = () => {
    setPolygons(DEFAULT_POLYGONS);
    setInProgress(null);
    setCursorPos(null);
    setPos(DEFAULT_POS);
    setDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const clickPoint = getCanvasPoint(e);

    if (getDistance(clickPoint, pos) <= POS_HIT_RADIUS) {
      setDragging(true);
      return;
    }

    if (inProgress) {
      const nearFirstVertex = getDistance(clickPoint, inProgress[0]) <= FIRST_VERTEX_HIT_RADIUS;
      if (nearFirstVertex && inProgress.length >= MIN_POLYGON_VERTICES) {
        // Closing the loop: finish this polygon and add it to the canvas.
        setPolygons((prev) => [...prev, inProgress]);
        setInProgress(null);
        setCursorPos(null);
        return;
      }
      setInProgress((prev) => (prev ? [...prev, clickPoint] : [clickPoint]));
      return;
    }

    // Clicking empty space (not on the test point, not already drawing) starts a new polygon.
    setInProgress([clickPoint]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging) {
      setPos(getCanvasPoint(e));
      return;
    }
    if (inProgress) {
      setCursorPos(getCanvasPoint(e));
    }
  };

  const stopDragging = () => setDragging(false);

  // Let Escape cancel an in-progress polygon without closing it.
  useEffect(() => {
    if (!inProgress) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInProgress(null);
        setCursorPos(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [inProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
     return; 
    }

    // Clear background.
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw every finished polygon (fill + stroke + vertex dots).
    PolygonDrawHelper.drawCompletePolygons(ctx, polygons);

    // Draw the polygon currently being created (open path + preview line to cursor).
    PolygonDrawHelper.drawPartiallyCompletePolygon(ctx, inProgress, cursorPos);

    // Draw the closest point for each polygon.
    PolygonDrawHelper.drawClosestPointOnEachPolygon(ctx, polygons, pos);

    // Draw the draggable test point on top (Pos).
    PolygonDrawHelper.drawPosPoint(ctx, pos);

  }, [polygons, inProgress, cursorPos, pos]);

  return (
    <div className="polygon-visualizer">
      <div className="polygon-controls">
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="polygon-canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      />
      {inProgress ? (
        <p className="polygon-status">
          Drawing polygon ({inProgress.length} point{inProgress.length === 1 ? '' : 's'}). Click the first vertex to close it, or press Esc to cancel.
        </p>
      ) : (
        <p className="polygon-hint">
          Drag the black point to test positions. Click empty space to start drawing a new polygon.
        </p>
      )}
    </div>
  );
};

export default PolygonCanvas;
