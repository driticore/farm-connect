import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MaxWidthWrapperProps {
  className?: string;
  children?: ReactNode;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ className, children }) => {
  return (
    <div className={cn(' max-h-screen max-w-screen-xl min-w-full px-2.5 md:px-20', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
