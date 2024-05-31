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

const QUERY_DEFAULTS = {
  width: 100,
  height: 100,
  grayscale: false,
  blur: 0,
  page: 1,
};

type QueryReturnType<T> = [T, (v: T, s?: any) => void];

const DEFAULT_NUQS_OPTIONS: Options = { history: 'push', throttleMs: 1000 };

export function useQueryGrayScale(): QueryReturnType<boolean> {
  return useQueryState(
    'grayscale',
    parseAsBoolean
      .withDefault(QUERY_DEFAULTS.grayscale)
      .withOptions(DEFAULT_NUQS_OPTIONS)
  );
}

export function useQueryBlur(): QueryReturnType<number> {
  const blurValues = Array.from({ length: 11 }, (_, i) => i);
  return useQueryState(
    'blur',
    parseAsNumberLiteral(blurValues)
      .withDefault(QUERY_DEFAULTS.blur)
      .withOptions(DEFAULT_NUQS_OPTIONS)
  );
}

export function useQueryImageSize() {
  return useQueryStates(
    {
      width: parseAsInteger.withDefault(QUERY_DEFAULTS.width),
      height: parseAsInteger.withDefault(QUERY_DEFAULTS.height),
    },
    DEFAULT_NUQS_OPTIONS
  );
}

export function useQueryImageSizeNoDefault() {
  return useQueryStates(
    {
      width: parseAsInteger,
      height: parseAsInteger,
    },
    DEFAULT_NUQS_OPTIONS
  );
}

export function useQueryPage(): QueryReturnType<number> {
  const pageValues = Array.from({ length: 31 }, (_, i) => i);
  return useQueryState(
    'page',
    parseAsNumberLiteral(pageValues)
      .withDefault(QUERY_DEFAULTS.page)
      .withOptions(DEFAULT_NUQS_OPTIONS)
  );
}
