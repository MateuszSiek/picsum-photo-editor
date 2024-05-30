'use client';

import * as React from 'react';
import { SliderProps } from '@radix-ui/react-slider';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { Switch } from './ui/switch';
import { Input, InputProps } from './ui/input';
import { cn } from '@/lib/utils';

type LabeledInputProps = InputProps & { label: string };

export function LabeledInput({
  label,
  className,
  ...props
}: LabeledInputProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Label>{label}</Label>

      <Input {...props} />
    </div>
  );
}

type LabeledSwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> & { label: string };

export function LabeledSwitch({ label, ...props }: LabeledSwitchProps) {
  return (
    <div className='flex items-center justify-between'>
      <Label>{label}</Label>

      <Switch {...props} />
    </div>
  );
}

type LabeledSliderProps = SliderProps & { label: string };

export function LabeledSlider({ label, ...props }: LabeledSliderProps) {
  return (
    <div className='grid gap-2'>
      <div className='flex items-center justify-between'>
        <Label>{label}</Label>
        <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
          {props.value}
        </span>
      </div>
      <Slider
        {...props}
        className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
      />
    </div>
  );
}
