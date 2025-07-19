import AddTransactions from '@/components/AddTransactions';
import BuyStock from '@/components/BuyStock';

interface PageProps {
  searchParams: {
    action?: string;
  };
}

export default function HomeServer({ searchParams }: PageProps) {
  const action = searchParams.action || 'sell';

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