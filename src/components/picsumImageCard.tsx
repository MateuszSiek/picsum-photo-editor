import { PicsumImage } from '@/lib/types';
import { Card } from './ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getScaledPicsumImageURL } from '@/lib/picsumApi';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

function getScaledImageSize(
  image: PicsumImage,
  minWidth: number = 500
): { width: number; height: number } {
  const { width: originalWidth, height: originalHeight } = image;
  if (originalWidth <= minWidth) {
    // If the original width is already smaller than or equal to the minimum width,
    // keep the original size.
    return { width: originalWidth, height: originalHeight };
  }

  // Scale the dimensions proportionally to maintain the aspect ratio.
  const scaleFactor = minWidth / originalWidth;
  const scaledWidth = minWidth;
  const scaledHeight = Math.round(originalHeight * scaleFactor);

  return { width: scaledWidth, height: scaledHeight };
}

export function PicsumImageCard({ image }: { image: PicsumImage }) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { author } = image;
  // we dont need previews in full size so we query for the scaled image
  const { width, height } = getScaledImageSize(image);
  const url = getScaledPicsumImageURL(image.id, width, height);
  return (
    <Card className='group relative overflow-hidden'>
      <img
        src={url}
        alt={author}
        className={cn(
          'h-48 w-full rounded-md object-cover transition-opacity duration-700',
          hasLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setHasLoaded(true)}
      />
      <div className='text-sm text-white opacity-0 transition-opacity duration-700 ease-in group-hover:opacity-100'>
        <span className='absolute left-1/2 top-1 -translate-x-1/2 drop-shadow-md'>
          Click to edit
        </span>
        <div className='absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/10 via-70% to-black/10 to-transparent to-90% pb-1 pt-8 text-center'>
          <p className='inline-flex items-center justify-center gap-1'>
            <AvatarIcon width={20} />
            {author}
          </p>
        </div>
      </div>
    </Card>
  );
}
