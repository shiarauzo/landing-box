import { useEffect, useRef } from 'react';
import styles from './GridBox.module.css';

interface GridBoxProps {
  depth?: number;
  cameraZ?: number;
}

export function GridBox({ depth: _depth, cameraZ: _cameraZ }: GridBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawGrid(ctx, rect.width, rect.height);
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;

      // Center point (vanishing point)
      const cx = width / 2;
      const cy = height / 2;

      // Back wall dimensions (the inner rectangle)
      const backWidth = width * 0.25;
      const backHeight = height * 0.35;
      const backLeft = cx - backWidth / 2;
      const backRight = cx + backWidth / 2;
      const backTop = cy - backHeight / 2;
      const backBottom = cy + backHeight / 2;

      const gridLines = 14; // Number of divisions
      const depthLines = 10; // Cross-section lines

      // ========== FLOOR (bottom trapezoid) ==========
      // Lines from bottom edge to back wall bottom
      for (let i = 0; i <= gridLines; i++) {
        const t = i / gridLines;
        const outerX = t * width;
        const innerX = backLeft + t * backWidth;
        ctx.beginPath();
        ctx.moveTo(outerX, height);
        ctx.lineTo(innerX, backBottom);
        ctx.stroke();
      }

      // Horizontal lines on floor
      for (let d = 1; d <= depthLines; d++) {
        const t = d / (depthLines + 1);
        const y = height - t * (height - backBottom);
        const leftX = t * backLeft;
        const rightX = width - t * (width - backRight);
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      // ========== CEILING (top trapezoid) ==========
      // Lines from top edge to back wall top
      for (let i = 0; i <= gridLines; i++) {
        const t = i / gridLines;
        const outerX = t * width;
        const innerX = backLeft + t * backWidth;
        ctx.beginPath();
        ctx.moveTo(outerX, 0);
        ctx.lineTo(innerX, backTop);
        ctx.stroke();
      }

      // Horizontal lines on ceiling
      for (let d = 1; d <= depthLines; d++) {
        const t = d / (depthLines + 1);
        const y = t * backTop;
        const leftX = t * backLeft;
        const rightX = width - t * (width - backRight);
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      // ========== LEFT WALL (left trapezoid) ==========
      // Lines from left edge to back wall left
      for (let i = 0; i <= gridLines; i++) {
        const t = i / gridLines;
        const outerY = t * height;
        const innerY = backTop + t * backHeight;
        ctx.beginPath();
        ctx.moveTo(0, outerY);
        ctx.lineTo(backLeft, innerY);
        ctx.stroke();
      }

      // Vertical lines on left wall
      for (let d = 1; d <= depthLines; d++) {
        const t = d / (depthLines + 1);
        const x = t * backLeft;
        const topY = t * backTop;
        const bottomY = height - t * (height - backBottom);
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
      }

      // ========== RIGHT WALL (right trapezoid) ==========
      // Lines from right edge to back wall right
      for (let i = 0; i <= gridLines; i++) {
        const t = i / gridLines;
        const outerY = t * height;
        const innerY = backTop + t * backHeight;
        ctx.beginPath();
        ctx.moveTo(width, outerY);
        ctx.lineTo(backRight, innerY);
        ctx.stroke();
      }

      // Vertical lines on right wall
      for (let d = 1; d <= depthLines; d++) {
        const t = d / (depthLines + 1);
        const x = width - t * (width - backRight);
        const topY = t * backTop;
        const bottomY = height - t * (height - backBottom);
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
      }

      // ========== BACK WALL (center rectangle with grid) ==========
      // Outline
      ctx.strokeRect(backLeft, backTop, backWidth, backHeight);

      // Vertical lines
      for (let i = 1; i < gridLines; i++) {
        const t = i / gridLines;
        const x = backLeft + t * backWidth;
        ctx.beginPath();
        ctx.moveTo(x, backTop);
        ctx.lineTo(x, backBottom);
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 1; i < gridLines; i++) {
        const t = i / gridLines;
        const y = backTop + t * backHeight;
        ctx.beginPath();
        ctx.moveTo(backLeft, y);
        ctx.lineTo(backRight, y);
        ctx.stroke();
      }

      // ========== FLOATING BOXES inside the room ==========
      ctx.fillStyle = '#1a1a1a';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;

      // Box 1 - larger, closer
      const box1 = {
        x: cx - 40,
        y: cy + 20,
        w: 60,
        h: 70,
      };
      ctx.fillRect(box1.x, box1.y, box1.w, box1.h);
      ctx.strokeRect(box1.x, box1.y, box1.w, box1.h);

      // Box 2 - medium, middle depth
      const box2 = {
        x: cx + 10,
        y: cy - 30,
        w: 45,
        h: 55,
      };
      ctx.fillRect(box2.x, box2.y, box2.w, box2.h);
      ctx.strokeRect(box2.x, box2.y, box2.w, box2.h);

      // Box 3 - smaller, further back
      const box3 = {
        x: cx - 15,
        y: cy + 50,
        w: 30,
        h: 35,
      };
      ctx.fillRect(box3.x, box3.y, box3.w, box3.h);
      ctx.strokeRect(box3.x, box3.y, box3.w, box3.h);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={styles.gridContainer}>
      <canvas ref={canvasRef} className={styles.gridCanvas} />
    </div>
  );
}
