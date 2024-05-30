import {
  Options,
  parseAsBoolean,
  parseAsInteger,
  parseAsNumberLiteral,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import { useEffect, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

const DEFAULTS = {
  width: 100,
  height: 100,
  grayscale: false,
  blur: 0,
  page: 1,
};

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

// ----- QUERY PARAM HOOKS -----
type QueryReturnType<T> = [T, (v: T, s?: any) => void];

const DEFAULT_NUQS_OPTIONS: Options = { history: 'push', throttleMs: 1000 };

export function useQueryGrayScale(): QueryReturnType<boolean> {
  return useQueryState(
    'grayscale',
    parseAsBoolean
      .withDefault(DEFAULTS.grayscale)
      .withOptions(DEFAULT_NUQS_OPTIONS)
  );
}

export function useQueryBlur(): QueryReturnType<number> {
  const blurValues = Array.from({ length: 11 }, (_, i) => i);
  return useQueryState(
    'blur',
    parseAsNumberLiteral(blurValues)
      .withDefault(DEFAULTS.blur)
      .withOptions(DEFAULT_NUQS_OPTIONS)
  );
}

export function useQueryImageSize(
  withDefault?: true
): QueryReturnType<{ width: number; height: number }>;
export function useQueryImageSize(
  withDefault?: false
): QueryReturnType<{ width: number | null; height: number | null }>;

export function useQueryImageSize(withDefault: boolean = true) {
  if (withDefault) {
    return useQueryStates(
      {
        width: parseAsInteger.withDefault(DEFAULTS.width),
        height: parseAsInteger.withDefault(DEFAULTS.height),
      },
      DEFAULT_NUQS_OPTIONS
    ) as QueryReturnType<{ width: number; height: number }>;
  }

  return useQueryStates(
    {
      width: parseAsInteger,
      height: parseAsInteger,
    },
    DEFAULT_NUQS_OPTIONS
  ) as QueryReturnType<{ width: number | null; height: number | null }>;
}

export function useQueryPage(): QueryReturnType<number> {
  return useQueryState(
    'page',
    parseAsInteger.withDefault(DEFAULTS.page).withOptions(DEFAULT_NUQS_OPTIONS)
  );
}
