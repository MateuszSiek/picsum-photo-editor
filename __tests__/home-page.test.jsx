import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Home from '../src/app/page';

const mockImages = [
  {
    id: 1,
    author: 'Mock Author 1',
    width: 1000,
    height: 1000,
    url: 'mock.url/1',
    download_url: 'mock-download.url/1',
  },
  {
    id: 2,
    author: 'Mock Author 2',
    width: 1000,
    height: 1500,
    url: 'mock.url/2',
    download_url: 'mock-download.url/2',
  },
];

jest.mock('../src/lib/hooks', () => ({
  useQueryPage: () => [1, jest.fn()],
}));

jest.mock('../src/lib/picsumApi', () => ({
  loadPicsumImages: () => new Promise((resolve) => resolve(mockImages)),
  getScaledPicsumImageURL: (id, width, height) =>
    `mock-scaled.url/${id}/${width}/${height}`,
}));


describe('Page', () => {
  it('Render images', async () => {
    const homePage = await act(async () => render(<Home />));

    const image1 = screen.getByAltText('Mock Author 1');
    expect(image1.src).toContain('http://localhost/mock-scaled.url/1/500/500');

    const image2 = screen.getByAltText('Mock Author 2');
    expect(image2.src).toContain('http://localhost/mock-scaled.url/2/500/750');

    const items = await screen.findAllByText(/^Mock Author [0-9]$/);
    expect(items).toHaveLength(2);
    
    expect(homePage).toMatchSnapshot()
  });
});
