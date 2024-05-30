import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='m-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
      <div className='mx-auto max-w-screen-sm text-center'>
        <h1 className='text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl'>
          404
        </h1>
        <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>
          Something's missing.
        </p>
        <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
          Sorry, we can't find that resource. <br />
          You'll find lots to explore on the home page.
        </p>

        <Link href='/'>
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
