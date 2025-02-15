import { PicsumImage, Pagination } from './types';

export function getScaledPicsumImageURL(
  id: string,
  width: number,
  height: number
) {
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}

export function loadPicsumImages({ page = 1, limit = 30 }: Pagination = {}) {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .then((data) => data as PicsumImage[]);
}

export function loadPicsumImage(id: string) {
  return fetch(`https://picsum.photos/id/${id}/info`)
    .then((res) => res.json())
    .then((data) => data as PicsumImage);
}
