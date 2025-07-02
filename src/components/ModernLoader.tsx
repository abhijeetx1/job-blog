
import { cn } from '@/lib/utils';

interface ModernLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function ModernLoader({ size = 'md', className, text }: ModernLoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      <div className="relative">
        <div className={cn(
          "rounded-full border-2 border-primary/20 animate-spin",
          sizeClasses[size]
        )}>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
        <div className={cn(
          "absolute inset-0 rounded-full border border-primary/40 animate-ping",
          sizeClasses[size]
        )} />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}
