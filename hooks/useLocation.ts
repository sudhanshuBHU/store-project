'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface Location {
  pathname: string;
  search: string;
  hash: string;
  href: string;
}

export function useLocation(): Location {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    const search = searchParams.toString();
    const href = search ? `${pathname}?${search}` : pathname;
    
    // Extract hash from pathname if present
    const hashMatch = pathname.match(/#(.+)$/);
    const hash = hashMatch ? `#${hashMatch[1]}` : '';
    const cleanPathname = hashMatch ? pathname.replace(/#.+$/, '') : pathname;

    return {
      pathname: cleanPathname,
      search: search ? `?${search}` : '',
      hash,
      href
    };
  }, [pathname, searchParams]);
} 