import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const loadingVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-10 w-10',
      },
      variant: {
        primary: 'border-[#222] border-r-white',
        secondary: 'border-white/30 border-r-white',
        destructive: 'border-destructive/30 border-r-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
  },
);

interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  withText?: boolean;
  text?: string;
}

export function Loading({
  className,
  size,
  variant,
  withText = false,
  text = 'Yuklanmoqda...',
  ...props
}: LoadingProps) {
  return (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      <div
        className={loadingVariants({ size, variant })}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{text}</span>
      </div>
      {withText && (
        <span className="text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loading size="xl" withText />
    </div>
  );
}
