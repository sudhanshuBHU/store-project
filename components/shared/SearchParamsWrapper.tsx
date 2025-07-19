'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface SearchParamsWrapperProps {
  children: (action: string) => React.ReactNode;
  fallback?: React.ReactNode;
}

function SearchParamsContent({ children }: { children: (action: string) => React.ReactNode }) {
  const searchParams = useSearchParams();
  const action = searchParams.get('action') || 'sell';
  
  return <>{children(action)}</>;
}

export function SearchParamsWrapper({ children, fallback }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <SearchParamsContent>
        {children}
      </SearchParamsContent>
    </Suspense>
  );
} 