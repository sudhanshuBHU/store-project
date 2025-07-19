'use client';
import AddTransactions from '@/components/AddTransactions';
import BuyStock from '@/components/BuyStock';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const action = searchParams.get('action') || 'sell';

  return (
    <main className="container mx-auto px-4 py-8">
      {
        action === 'sell' ? (
          <AddTransactions />
        ) : (
          <BuyStock />
        )
      }
    </main>
  );
}
