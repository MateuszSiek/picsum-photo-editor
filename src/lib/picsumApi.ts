import { PicsumImage } from './types';

interface Pagination {
  page?: number;
  limit?: number;
}

export function loadPicsumImages({ page = 1, limit = 30 }: Pagination = {}) {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .then((data) => data as PicsumImage[]);
}
