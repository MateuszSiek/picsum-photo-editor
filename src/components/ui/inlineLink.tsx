import { cn } from '@/lib/utils';
import React from 'react';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const InlineLink = React.forwardRef<HTMLInputElement, LinkProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <a
        type={type}
        className={cn('font-medium underline underline-offset-4', className)}
        {...props}
      />
    );
  }
);
InlineLink.displayName = 'InlineLink';

export { InlineLink };
