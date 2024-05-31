import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Editor from '../src/app/editor/[imageId]/page';
import { calculateDrawParameters } from '../src/app/editor/[imageId]/imagePreview';
import { useRouter } from 'next/navigation';

const mockImage = [
  {
    id: 1,
    author: 'Mock Author 1',
    width: 1000,
    height: 1000,
    url: 'mock.url/1',
    download_url: 'mock-download.url/1',
  },
];

jest.mock('../src/lib/hooks', () => ({
  useQueryImageSize: () => [{ width: 400, height: 300 }, jest.fn()],
  useQueryBlur: () => [4, jest.fn()],
  useQueryGrayScale: () => [true, jest.fn()],
  useViewScale: jest.fn((x) => 10),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../src/lib/picsumApi', () => ({
  loadPicsumImage: () => new Promise((resolve) => resolve(mockImage)),
  getScaledPicsumImageURL: (id, width, height) =>
    `mock-scaled.url/${id}/${width}/${height}`,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Page', () => {
  it('Render images', async () => {
    const editorPage = await act(async () =>
      render(<Editor params={{ imageId: 1 }} />)
    );

    expect(editorPage).toMatchSnapshot();
  });
});

describe('imagePreview/calculateDrawParameters', () => {
  it('calculates correct parameters when canvas and image have same aspect ratio', () => {
    const result = calculateDrawParameters(800, 600, 400, 300);
    const expected = {
      drawWidth: 800,
      drawHeight: 600,
      offsetX: 0,
      offsetY: 0,
    };
    expect(result).toEqual(expected);
  });

  it('calculates correct parameters when canvas is wider than image', () => {
    const result = calculateDrawParameters(1200, 600, 800, 600);
    const expected = {
      drawWidth: 1200,
      drawHeight: 900,
      offsetX: 0,
      offsetY: -150,
    };
    expect(result).toEqual(expected);
  });

  it('calculates correct parameters when canvas is taller than image', () => {
    const result = calculateDrawParameters(600, 1200, 600, 800);
    const expected = {
      drawWidth: 900,
      drawHeight: 1200,
      offsetX: -150,
      offsetY: 0,
    };
    expect(result).toEqual(expected);
  });

  it('calculates correct parameters when image is wider than canvas', () => {
    const result = calculateDrawParameters(800, 600, 1600, 600);
    const expected = {
      drawWidth: 1600,
      drawHeight: 600,
      offsetX: -400,
      offsetY: 0,
    };
    expect(result).toEqual(expected);
  });

  it('calculates correct parameters when image is taller than canvas', () => {
    const result = calculateDrawParameters(600, 800, 600, 1600);
    const expected = {
      drawWidth: 600,
      drawHeight: 1600,
      offsetX: 0,
      offsetY: -400,
    };
    expect(result).toEqual(expected);
  });

  it('handles edge case where canvas and image sizes are equal', () => {
    const result = calculateDrawParameters(1000, 1000, 1000, 1000);
    const expected = {
      drawWidth: 1000,
      drawHeight: 1000,
      offsetX: 0,
      offsetY: 0,
    };
    expect(result).toEqual(expected);
  });
});
