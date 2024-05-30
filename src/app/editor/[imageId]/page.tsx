'use client';

import { useRouter } from 'next/navigation';
import { PicsumImage } from '@/lib/types';
import { CanvasContextProvider } from './context';
import { DesignPanel } from './designPanel';
import ImagePreview from './imagePreview';
import { useEffect, useState } from 'react';
import { loadPicsumImage } from '@/lib/picsumApi';

export default function Editor({ params }: { params: { imageId: string } }) {
  const imageId = params.imageId;
  const [image, setImage] = useState<PicsumImage>();
  const router = useRouter();

  useEffect(() => {
    loadPicsumImage(imageId)
      .then(setImage)
      .catch((e) => {
        router.replace('/404');
      });
  }, [imageId]);

  return (
    <div className='grid h-full flex-1 items-stretch gap-6 md:grid-cols-[1fr_250px]'>
      <CanvasContextProvider>
        <ImagePreview image={image} />
        <DesignPanel image={image} />
      </CanvasContextProvider>
    </div>
  );
}
