'use client';
import { useViewScale } from '@/lib/hooks';
import { loadPicsumImage } from '@/lib/picsumApi';
import { PicsumImage } from '@/lib/types';
import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';

function calculateDrawParameters(
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasImage, setCanvasImage] = useState<HTMLImageElement | null>(null);
  const [grayscale] = useQueryState('grayscale', parseAsBoolean);
  const [blur] = useQueryState('blur', parseAsInteger);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image.download_url;
      img.onload = () => setCanvasImage(img);
    }
  }, [image]);

  useEffect(() => {
    // Draw the image with filters on the canvas
    const ctx = canvasRef.current?.getContext('2d');
    if (canvasImage && image && ctx) {
      ctx.clearRect(0, 0, width, height);

      ctx.filter = `${grayscale ? 'grayscale(100%)' : ''} ${blur ? `blur(${blur}px)` : ''}`;
      const { drawWidth, drawHeight, offsetX, offsetY } =
        calculateDrawParameters(width, height, image.width, image.height);
      ctx.drawImage(canvasImage, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [canvasImage, image, width, height, blur, grayscale]);

  return (
    <canvas
      className='absolute left-0 right-0 m-auto rounded-md'
      style={style}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
}

export default function ImagePreview({ imageId }: { imageId: string }) {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [width] = useQueryState('width', parseAsInteger.withDefault(100));
  const [height] = useQueryState('height', parseAsInteger.withDefault(100));
  const [image, setImage] = useState<PicsumImage>();

  const canvasScale = useViewScale(canvasWrapperRef, [width, height]);

  useEffect(() => {
    loadPicsumImage(imageId).then(setImage);
  }, [imageId]);

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
