import {
  LabeledInput,
  LabeledSlider,
  LabeledSwitch,
} from '@/components/labeledInput';
import { Button } from '@/components/ui/button';
import { loadPicsumImage } from '@/lib/picsumApi';
import { PicsumImage } from '@/lib/types';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useContext, useEffect, useState } from 'react';
import { CanvasContext } from './context';
import {
  useQueryBlur,
  useQueryGrayScale,
  useQueryImageSize,
} from '@/lib/hooks';

function ImageSize() {
  const [{ width, height }, setSize] = useQueryImageSize();

  return (
    <div className='flex gap-2'>
      <LabeledInput
        className='flex-1'
        onChange={(e) => setSize({ width: Number(e.target.value), height })}
        type='number'
        min={0}
        value={width}
        label={'Width'}
      />
      <LabeledInput
        className='flex-1'
        onChange={(e) => setSize({ height: Number(e.target.value), width })}
        type='number'
        min={0}
        value={height}
        label={'Height'}
      />
    </div>
  );
}

function ImageBlur() {
  const [blur, setBlur] = useQueryBlur();
  return (
    <LabeledSlider
      max={10}
      min={0}
      step={1}
      onValueChange={(v: number[]) => setBlur(v[0])}
      value={[blur]}
      label={'Blur'}
    />
  );
}

function ImageGrayscale() {
  const [grayscale, setGrayscale] = useQueryGrayScale();

  return (
    <LabeledSwitch
      checked={grayscale}
      onCheckedChange={(v) => setGrayscale(v)}
      label={'Grayscale'}
    />
  );
}

function DonwloadButton() {
  const { canvasRef, canvasReady } = useContext(CanvasContext);

  const downloadImage = () => {
    if (canvasRef) {
      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = canvasRef.current?.toDataURL('image/png')!;
      link.click();
      link.remove();
    }
  };

  return (
    <Button disabled={!canvasReady} onClick={downloadImage} className='w-full'>
      <DownloadIcon className='mr-2 h-5 w-5' /> Download
    </Button>
  );
}

export function DesignPanel({ image }: { image?: PicsumImage }) {
  const [{ width, height }, setSize] = useQueryImageSize(false);

  useEffect(() => {
    if (!image) return;
    if (!width || !height)
      setSize(
        { width: image.width, height: image.height },
        { history: 'replace' }
      );
  }, [image]);

  return (
    <div className='flex flex-col'>
      <ImageSize />
      <div className='pt-4'>
        <ImageBlur />
      </div>
      <div className='pt-8'>
        <ImageGrayscale />
      </div>
      <div className='pt-6'>
        <DonwloadButton />
      </div>
    </div>
  );
}
