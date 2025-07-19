'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const NavigationExample = () => {
  const router = useRouter();

  // Navigate programmatically with parameters
  const navigateToPost = (id: string) => {
    router.push(`/post/${id}`);
  };

  // Navigate with query strings
  const navigateToSearch = (query: string, category?: string) => {
    const params = new URLSearchParams();
    params.set('q', query);
    if (category) params.set('category', category);
    params.set('sort', 'newest');
    
    router.push(`/search?${params.toString()}`);
  };

  // Navigate with both path params and query strings
  const navigateToPostWithQuery = (id: string, category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('highlight', 'true');
    
    router.push(`/post/${id}?${params.toString()}`);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Navigation Examples</h3>
      
      {/* Link with path parameters */}
      <div>
        <h4 className="font-medium">Path Parameters:</h4>
        <div className="space-x-2">
          <Link 
            href="/post/123" 
            className="text-blue-600 hover:underline"
          >
            Post 123
          </Link>
          <Link 
            href="/post/456" 
            className="text-blue-600 hover:underline"
          >
            Post 456
          </Link>
        </div>
      </div>

      {/* Link with query strings */}
      <div>
        <h4 className="font-medium">Query Strings:</h4>
        <div className="space-x-2">
          <Link 
            href="/search?q=khaini&category=wholesale&sort=newest" 
            className="text-blue-600 hover:underline"
          >
            Search Khaini
          </Link>
          <Link 
            href="/search?q=retail&page=2" 
            className="text-blue-600 hover:underline"
          >
            Search Retail (Page 2)
          </Link>
        </div>
      </div>

      {/* Programmatic navigation */}
      <div>
        <h4 className="font-medium">Programmatic Navigation:</h4>
        <div className="space-x-2">
          <button 
            onClick={() => navigateToPost('789')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Post 789
          </button>
          <button 
            onClick={() => navigateToSearch('wholesale', 'premium')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Search Wholesale Premium
          </button>
          <button 
            onClick={() => navigateToPostWithQuery('999', 'retail')}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Post 999 with Category
          </button>
        </div>
      </div>
    </div>
  );
}; 