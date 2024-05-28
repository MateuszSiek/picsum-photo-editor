import { PicsumImage } from '@/lib/types';
import { Card } from './ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
  const url = `https://picsum.photos/id/${image.id}/${width}/${height}`;
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
      <div className='absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/10 via-70% to-black/10 to-transparent to-90% p-1 text-center text-sm text-white opacity-0 duration-500 ease-in group-hover:opacity-100'>
        <p>{author}</p>
      </div>
    </Card>
  );
}
