import { AlertCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type ErrorMessageProps = {
  message: string;
  className?: string;
};

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'bg-destructive/15 text-destructive dark:text-red-400 text-sm p-3 rounded-md flex items-start gap-2',
        className
      )}
      role="alert"
    >
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
