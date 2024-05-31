'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { PicsumImageCard } from '@/components/picsumImageCard';
import { DynamicPagination } from '@/components/ui/pagination';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useQueryPage } from '@/lib/hooks';
import { loadPicsumImages } from '@/lib/picsumApi';
import { PicsumImage } from '@/lib/types';
import { getPagination } from '@/lib/utils';

function ImagesGrid({ images, page }: { images: PicsumImage[]; page: number }) {
  const maxPagesCount = 30;
  const paginationItems = useMemo(
    () => getPagination(page, maxPagesCount),
    [page]
  );

  return (
    <>
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
        className='sticky bottom-2 w-fit rounded-full bg-white p-2'
      />
    </>
  );
}

export default function Home() {
  const [page] = useQueryPage();
  const [images, setImages] = useState<PicsumImage[] | undefined>();
  const router = useRouter();

  useEffect(() => {
    loadPicsumImages({ page })
      .then((data) => setImages(data))
      .catch((e) => {
        router.replace('/404');
      });
  }, [page]);

  return (
    <div className='flex min-h-full flex-col gap-2'>
      {images && <ImagesGrid images={images} page={page} />}
      {!images && <LoadingSpinner size={32} className='m-auto' />}
    </div>
  );
}
