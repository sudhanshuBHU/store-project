'use client';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import { useMemo } from 'react';

export const UseLocationExample = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  // Get full URL (equivalent to useLocation().pathname + useLocation().search)
  const fullUrl = useMemo(() => {
    const search = searchParams.toString();
    return search ? `${pathname}?${search}` : pathname;
  }, [pathname, searchParams]);

  // Get all query parameters as object
  const queryParams = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }, [searchParams]);

  // Get specific query parameter
  const getQueryParam = (key: string) => {
    return searchParams.get(key);
  };

  // Check if current path matches a pattern
  const isActivePath = (path: string) => {
    return pathname === path;
  };

  // Check if current path starts with a pattern
  const isActivePathStartsWith = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Next.js Location Hooks</h3>
      
      <div className="space-y-2 text-sm">
        <p><strong>Pathname:</strong> {pathname}</p>
        <p><strong>Full URL:</strong> {fullUrl}</p>
        <p><strong>Query String:</strong> {searchParams.toString() || 'none'}</p>
        <p><strong>Path Params:</strong> {JSON.stringify(params)}</p>
        <p><strong>Query Params:</strong> {JSON.stringify(queryParams)}</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Examples:</h4>
        <p>Is on home page: {isActivePath('/') ? 'Yes' : 'No'}</p>
        <p>Is on post page: {isActivePathStartsWith('/post/') ? 'Yes' : 'No'}</p>
        <p>Search query: {getQueryParam('q') || 'none'}</p>
        <p>Category: {getQueryParam('category') || 'none'}</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Navigation State:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-gray-100 rounded">
            <strong>Current Path:</strong><br/>
            {pathname}
          </div>
          <div className="p-2 bg-gray-100 rounded">
            <strong>Search Params:</strong><br/>
            {searchParams.toString() || 'none'}
          </div>
        </div>
      </div>
    </div>
  );
}; 