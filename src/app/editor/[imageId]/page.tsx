import { DesignPanel } from './designPanel';
import ImagePreview from './imagePreview';

export default function Editor({ params }: { params: { imageId: string } }) {
  return (
    <div className='grid h-full flex-1 items-stretch gap-6 md:grid-cols-[1fr_250px]'>
      <ImagePreview imageId={params.imageId} />
      <DesignPanel imageId={params.imageId} />
    </div>
  );
}
