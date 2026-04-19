import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 dark:text-primary-foreground',
        destructive:
          'bg-red-600 text-white shadow-lg hover:bg-red-700',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-muted hover:border-primary dark:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80',
        ghost: 
          'text-muted-foreground hover:bg-muted hover:text-foreground',
        link: 
          'text-primary underline-offset-4 hover:underline',
        gradient: 
          'bg-gradient-to-r from-emerald-600 to-teal-600 text-foreground shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:from-emerald-500 hover:to-teal-500 dark:text-white',
        glow:
          'bg-primary text-foreground shadow-[0_0_20px_hsl(152_76%_42%/0.4)] hover:shadow-[0_0_30px_hsl(152_76%_42%/0.6)] hover:bg-primary/90 dark:text-primary-foreground',
      },
      size: {
        default: 'h-10 px-5 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
