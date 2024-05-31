import {
  useQueryBlur,
  useQueryGrayScale,
  useViewScale,
  useQueryImageSize,
} from '@/lib/hooks';
import { PicsumImage } from '@/lib/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { CanvasContext } from './context';
import { LoadingSpinner } from '@/components/ui/spinner';

export function calculateDrawParameters(
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number
) {
  const canvasAspect = canvasWidth / canvasHeight;
  const imageAspect = imageWidth / imageHeight;
  let drawWidth, drawHeight, offsetX, offsetY;
  if (canvasAspect > imageAspect) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imageAspect;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imageAspect;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }
  return { drawWidth, drawHeight, offsetX, offsetY };
}

function ImageCanvas({
  image,
  width,
  height,
  style,
}: {
  image?: PicsumImage;
  width: number;
  height: number;
  style: React.CSSProperties;
}) {
  const { canvasRef, setCanvasReady } = useContext(CanvasContext);
  const [canvasImage, setCanvasImage] = useState<HTMLImageElement | null>(null);
  const [grayscale] = useQueryGrayScale();
  const [blur] = useQueryBlur();

  useEffect(() => {
    // https://issues.chromium.org/issues/328755781
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        const context = canvasRef?.current?.getContext('2d');
        if (context) {
          context.fillStyle = 'transparent';
          context.fillRect(0, 0, 1, 1);
        }
      }
    });
  }, [canvasRef]);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image.download_url;
      img.onload = () => setCanvasImage(img);
      img.setAttribute('crossOrigin', 'anonymous');
    }
  }, [image]);

  useEffect(() => {
    // Draw the image with filters on the canvas
    const ctx = canvasRef?.current?.getContext('2d');
    if (canvasImage && image && ctx) {
      ctx.clearRect(0, 0, width, height);

      let filter = 'none';
      if (grayscale || blur) {
        filter = `${grayscale ? 'grayscale(100%)' : ''} ${blur ? `blur(${blur}px)` : ''}`;
      }
      ctx.filter = filter;
      const { drawWidth, drawHeight, offsetX, offsetY } =
        calculateDrawParameters(width, height, image.width, image.height);
      ctx.drawImage(canvasImage, offsetX, offsetY, drawWidth, drawHeight);
      setCanvasReady(true);
    }
  }, [
    canvasImage,
    image,
    width,
    height,
    blur,
    grayscale,
    canvasRef,
    setCanvasReady,
  ]);

  return (
    <>
      {!canvasImage && (
        <LoadingSpinner className='absolute left-0 right-0 top-20 m-auto' />
      )}
      <canvas
        className='absolute left-0 right-0 m-auto rounded-md'
        style={style}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </>
  );
}

export default function ImagePreview({ image }: { image?: PicsumImage }) {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [{ width, height }] = useQueryImageSize();

  const canvasScale = useViewScale(canvasWrapperRef, [width, height]);

  return (
    <div ref={canvasWrapperRef} className='relative'>
      <ImageCanvas
        image={image}
        width={width}
        height={height}
        style={{
          width: `${width * canvasScale}px`,
          height: `${height * canvasScale}px`,
        }}
      />
    </div>
  );
}
