import { getPagination } from '../src/lib/utils';

const PaginationItemType = {
  Page: 'page',
  Ellipsis: 'ellipsis',
};

describe('getPagination', () => {
  it('returns all pages when totalPages is less than or equal to pagination size', () => {
    const result = getPagination(1, 5);
    const expected = [
      { type: 'page', value: 1 },
      { type: 'page', value: 2 },
      { type: 'page', value: 3 },
      { type: 'page', value: 4 },
      { type: 'page', value: 5 },
    ];
    expect(result).toEqual(expected);
  });

  it('returns correct pagination when currentPage is in the first segment', () => {
    const result = getPagination(2, 10);
    const expected = [
        { type: 'page', value: 1 },
        { type: 'page', value: 2 },
        { type: 'page', value: 3 },
        { type: 'page', value: 4 },
        { type: 'page', value: 5 },
        { type: 'ellipsis' },
    ];
    expect(result).toEqual(expected);
  });

  it('returns correct pagination when currentPage is in the last segment', () => {
    const result = getPagination(9, 10);
    const expected = [
      { type: PaginationItemType.Page, value: 1 },
      { type: PaginationItemType.Ellipsis },
      { type: PaginationItemType.Page, value: 7 },
      { type: PaginationItemType.Page, value: 8 },
      { type: PaginationItemType.Page, value: 9 },
      { type: PaginationItemType.Page, value: 10 },
    ];
    expect(result).toEqual(expected);
  });

  it('returns correct pagination when currentPage is in the middle segment', () => {
    const result = getPagination(5, 10);
    const expected = [
      { type: PaginationItemType.Page, value: 1 },
      { type: PaginationItemType.Ellipsis },
      { type: PaginationItemType.Page, value: 4 },
      { type: PaginationItemType.Page, value: 5 },
      { type: PaginationItemType.Page, value: 6 },
      { type: PaginationItemType.Ellipsis },
    ];
    expect(result).toEqual(expected);
  });

  it('handles edge cases where currentPage is less than 1', () => {
    const result = getPagination(-2, 5);
    const expected = [
      { type: PaginationItemType.Page, value: 1 },
      { type: PaginationItemType.Page, value: 2 },
      { type: PaginationItemType.Page, value: 3 },
      { type: PaginationItemType.Page, value: 4 },
      { type: PaginationItemType.Page, value: 5 },
    ];
    expect(result).toEqual(expected);
  });

  it('handles edge cases where currentPage is greater than totalPages', () => {
    const result = getPagination(10, 5);
    const expected = [
      { type: PaginationItemType.Page, value: 1 },
      { type: PaginationItemType.Page, value: 2 },
      { type: PaginationItemType.Page, value: 3 },
      { type: PaginationItemType.Page, value: 4 },
      { type: PaginationItemType.Page, value: 5 },
    ];
    expect(result).toEqual(expected);
  });
});
