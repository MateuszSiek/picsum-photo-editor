'use client';

import { PicsumImageCard } from '@/components/picsumImageCard';
import { DynamicPagination } from '@/components/ui/pagination';
import { loadPicsumImages } from '@/lib/picsumApi';
import { PicsumImage } from '@/lib/types';
import { getPagination } from '@/lib/utils';
import Link from 'next/link';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const maxPagesCount = 30;
  const paginationItems = useMemo(
    () => getPagination(page, maxPagesCount),
    [page]
  );

  useEffect(() => {
    loadPicsumImages({ page }).then((data) => setImages(data));
  }, [page]);

  return (
    <div className='flex min-h-full flex-col gap-2'>
      <DynamicPagination
        pagesCount={maxPagesCount}
        paginationItems={paginationItems}
        page={page}
        className='py-2'
      />

      <div className='grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
        {images.map((image) => (
          <Link key={image.id} href={`/editor/${image.id}`}>
            <PicsumImageCard image={image} />
          </Link>
        ))}
      </div>

      <DynamicPagination
        pagesCount={maxPagesCount}
        paginationItems={paginationItems}
        page={page}
        className='py-2'
      />
    </div>
  );
}
