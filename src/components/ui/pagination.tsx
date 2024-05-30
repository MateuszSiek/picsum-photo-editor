import * as React from 'react';
import Link from 'next/link';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'> & { disabled?: boolean }
>(({ className, disabled, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      '',
      disabled ? 'pointer-events-none opacity-50' : '',
      className
    )}
    {...props}
  />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeftIcon className='h-4 w-4' />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className='h-4 w-4' />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export enum PaginationItemType {
  Page = 'page',
  Ellipsis = 'ellipsis',
}

export interface PaginationItemData {
  type: PaginationItemType;
  value?: number;
}

type DynamicPaginationProps = {
  page: number;
  pagesCount: number;
  paginationItems: PaginationItemData[];
  className?: string;
};

const DynamicPagination = ({
  page,
  paginationItems,
  className,
  pagesCount,
}: DynamicPaginationProps) => {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem disabled={page === 1}>
          <PaginationPrevious href={`?page=${page - 1}`} />
        </PaginationItem>
        {paginationItems.map((item, index) => {
          switch (item.type) {
            case PaginationItemType.Page:
              return (
                <PaginationItem className='hidden sm:list-item' key={index}>
                  <PaginationLink
                    isActive={page === item.value}
                    href={`?page=${item.value}`}
                  >
                    {item.value}
                  </PaginationLink>
                </PaginationItem>
              );
            case PaginationItemType.Ellipsis:
              return (
                <PaginationEllipsis className='hidden sm:flex' key={index} />
              );
          }
        })}
        <PaginationItem disabled={page + 1 > pagesCount}>
          <PaginationNext href={`?page=${page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
DynamicPagination.displayName = 'DynamicPagination';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  DynamicPagination,
};
