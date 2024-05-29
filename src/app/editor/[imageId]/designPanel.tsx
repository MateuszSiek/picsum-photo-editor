'use client';

import {
  LabeledInput,
  LabeledSlider,
  LabeledSwitch,
} from '@/components/labeledInput';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs';

function ImageSize() {
  const [width, setWidth] = useQueryState(
    'width',
    parseAsInteger.withDefault(1)
  );
  const [height, setHeight] = useQueryState(
    'height',
    parseAsInteger.withDefault(1)
  );

  return (
    <div className='flex gap-2'>
      <LabeledInput
        onChange={(e) => setWidth(Number(e.target.value))}
        type='number'
        min={0}
        value={width}
        label={'Width'}
      />
      <LabeledInput
        onChange={(e) => setHeight(Number(e.target.value))}
        type='number'
        min={0}
        value={height}
        label={'Height'}
      />
    </div>
  );
}

function ImageBlur() {
  const [blur, setBlur] = useQueryState('blur', parseAsInteger.withDefault(0));
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
  const [grayscale, setGrayscale] = useQueryState(
    'grayscale',
    parseAsBoolean.withDefault(false)
  );

  return (
    <LabeledSwitch
      checked={grayscale}
      onCheckedChange={(v) => setGrayscale(v)}
      label={'Grayscale'}
    />
  );
}

export function DesignPanel() {
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
        <Button className='w-full'>
          <DownloadIcon className='mr-2 h-5 w-5' /> Download
        </Button>
      </div>
    </div>
  );
}
