import * as React from "react";
import random from "lodash/random";

const CanvasContext = React.createContext(null);
const FrameContext = React.createContext(0);

export const Canvas = ({ height, width, dpr, isAnimating, children }: CanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const actualWidth = width * dpr;
  const actualHeight = height * dpr;

  // the canvas' context is stored once it's created
  const [context, setContext] = React.useState(null);
  React.useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext !== null) {
        canvasContext.scale(dpr, dpr);
        canvasContext.globalCompositeOperation = "soft-light";
        setContext(canvasContext);
      }
    }
  }, [dpr]);

  // making the component and the context re-render at every frame
  const [frameCount, setFrameCount] = React.useState(0);
  React.useEffect(() => {
    let frameId: number;
    if (isAnimating) {
      frameId = requestAnimationFrame(() => {
        setFrameCount(frameCount + 1);
      });
    }
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isAnimating, frameCount, setFrameCount]);

  // whenever the canvas' dimensions change, it's automatically cleared
  // we need to re-draw all its children in this case */
  React.useLayoutEffect(() => {
    setFrameCount(random(1, true));
  }, [width, height]);

  // we need to clear the whole canvas before drawing the children
  if (context !== null) {
    context.clearRect(0, 0, actualWidth, actualHeight);
  }

  return (
    <CanvasContext.Provider value={context}>
      <FrameContext.Provider value={frameCount}>
        { canvasRef.current !== null ? <canvas
          ref={canvasRef}
          height={actualHeight}
          width={actualWidth}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            zIndex: 9,
            width,
            height,
          }}
        />
         : null}
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  );
};

export const useCanvas = (): CanvasRenderingContext2D => {
  React.useContext(FrameContext);
  const renderingContext = React.useContext<CanvasRenderingContext2D>(CanvasContext);
  return renderingContext;
};

export function useAnimation<T>(initialValue: T, valueUpdater: (T) => T) {
  const animatedValue = React.useRef(initialValue);
  animatedValue.current = valueUpdater(animatedValue.current);
  return animatedValue.current;
};

export class CanvasProps {
  height: number;
  width: number;
  dpr: number;
  isAnimating: boolean;
  children: React.ReactNode;
}