import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { InlineLink } from '@/components/ui/inlineLink';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'PicsumEditor',
  description: 'A simple image editor using picsum.photos',
};

const Header = () => {
  return (
    <header className='w-full border-b border-border/40 bg-background/95'>
      <div className='container flex h-12 max-w-screen-2xl items-center justify-between gap-4'>
        <Link
          className='inline-flex items-center justify-center gap-2'
          href={`/`}
        >
          <Pencil2Icon width={20} height={20} className='relative top-[-1px]' />
          <div>PicsumEditor</div>
        </Link>
        <p className='hidden text-sm text-muted-foreground sm:inline'>
          Easilly edit images from{' '}
          <InlineLink href='https://picsum.photos/'>picsum.photos</InlineLink>
        </p>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className='container flex h-16 max-w-screen-2xl items-center text-sm text-muted-foreground'>
        <p>
          Build by{' '}
          <InlineLink href='https://msiek.com'>Mateusz Siek</InlineLink> using{' '}
          <InlineLink href='https://picsum.photos/'>picsum.photos</InlineLink>
        </p>
      </div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className={cn(inter.className, 'flex h-full flex-col')}>
        <Header />
        <div className='container flex max-w-screen-2xl flex-1 flex-col px-8 py-4'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
