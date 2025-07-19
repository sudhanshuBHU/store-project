'use client';
import Link from 'next/link';
import { SearchParamsWrapper } from './SearchParamsWrapper';

const Navbar = () => {
  return (
    <SearchParamsWrapper>
      {(action) => (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700">
              {/* Logo Placeholder */}
              <span className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white">KS</span>
              Khaini Store
            </Link>
            <div className="flex gap-6">
              {
                action === 'sell' ? (
                  <Link href="/?action=buy" className="text-red-500 hover:text-red-600 font-medium">Buy</Link>
                ) : (
                  <Link href="/?action=sell" className="text-green-500 hover:text-green-600 font-medium">Sell</Link>
                )
              }
            </div>
          </div>
        </nav>
      )}
    </SearchParamsWrapper>
  );
};

export default Navbar; 