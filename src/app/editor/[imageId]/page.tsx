import { Card } from '@/components/ui/card';
import { DesignPanel } from './designPanel';

export default function Editor({ params }: { params: { imageId: string } }) {
  return (
    <div className='container h-full p-0'>
      <div className='grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]'>
        <Card>Preview</Card>
        <DesignPanel />
      </div>
    </div>
  );
}
