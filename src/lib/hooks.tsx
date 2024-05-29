import { useEffect, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

// Custom hook to calculate the optimal scale for the view based on the content size
export function useViewScale(
  wrapperRef: React.RefObject<HTMLDivElement>,
  contentSize: [number, number]
): number {
  const { width, height } = useResizeObserver<HTMLDivElement>({
    ref: wrapperRef,
  });
  const [canvasScale, setCanvasScale] = useState<number>(1);

  useEffect(() => {
    if (width && height) {
      const scale = Math.min(width / contentSize[0], height / contentSize[1]);
      setCanvasScale(scale);
    }
  }, [contentSize, width, height]);

  return canvasScale;
}
