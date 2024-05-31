import {
  PaginationItemData,
  PaginationItemType,
} from '@/components/ui/pagination';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function which calculate pagination items based on current page and total pages
// The function assures that pagination component always have the same amount of buttons
export function getPagination(
  currentPage: number,
  totalPages: number
): PaginationItemData[] {
  const paginationSize = 6;
  const pagination: PaginationItemData[] = [];

  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  if (totalPages <= paginationSize) {
    // If total pages are less than or equal to pagination size, fill with page numbers
    for (let i = 1; i <= totalPages; i++) {
      pagination.push({ type: PaginationItemType.Page, value: i });
    }
  } else {
    const halfSize = Math.floor(paginationSize / 2);

    if (currentPage <= halfSize) {
      // Current page is in the first segment
      for (let i = 1; i < paginationSize; i++) {
        pagination.push({ type: PaginationItemType.Page, value: i });
      }
      pagination.push({ type: PaginationItemType.Ellipsis });
    } else if (currentPage >= totalPages - halfSize + 1) {
      // Current page is in the last segment
      pagination.push({ type: PaginationItemType.Page, value: 1 });
      pagination.push({ type: PaginationItemType.Ellipsis });
      for (let i = totalPages - paginationSize + 3; i <= totalPages; i++) {
        pagination.push({ type: PaginationItemType.Page, value: i });
      }
    } else {
      // Current page is in the middle segment
      pagination.push({ type: PaginationItemType.Page, value: 1 });
      pagination.push({ type: PaginationItemType.Ellipsis });

      for (
        let i = currentPage - halfSize + 2;
        i <= currentPage + halfSize - 2;
        i++
      ) {
        pagination.push({ type: PaginationItemType.Page, value: i });
      }

      pagination.push({ type: PaginationItemType.Ellipsis });
    }
  }

  return pagination;
}
