'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>>(
  ({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)} {...props}>
      <ProgressPrimitive.Indicator className='h-full w-full bg-primary transition-transform' style={{ transform: `scaleX(${(value || 0) / 100})`, transformOrigin: 'left' }} />
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
