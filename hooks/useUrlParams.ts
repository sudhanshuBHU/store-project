'use client';
import { useSearchParams, useParams } from 'next/navigation';
import { useMemo } from 'react';

export function useUrlParams() {
  const searchParams = useSearchParams();
  const params = useParams();

  const queryParams = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [searchParams]);

  const pathParams = useMemo(() => {
    return params as Record<string, string>;
  }, [params]);

  return {
    queryParams,
    pathParams,
    searchParams,
    params
  };
} 