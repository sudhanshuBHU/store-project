'use client';
import AddTransactions from '@/components/AddTransactions';
import BuyStock from '@/components/BuyStock';
import { SearchParamsWrapper } from '@/components/shared/SearchParamsWrapper';

export default function Home() {
  return (
    <SearchParamsWrapper>
      {(action) => (
        <main className="container mx-auto px-4 py-8">
          {
            action === 'sell' ? (
              <AddTransactions />
            ) : (
              <BuyStock />
            )
          }
        </main>
      )}
    </SearchParamsWrapper>
  );
}
