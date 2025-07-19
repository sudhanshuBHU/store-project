'use client';

import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ISell } from '@/types/sell.type';
import DeleteButton from './ui/DeleteButton';
import { errorToast } from '@/utils/toast';

export const SellBox = ({ sell, index, isLoading, setIsLoading }: { sell: ISell, index: number, isLoading: boolean, setIsLoading: (isLoading: boolean) => void }) => {

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/sell`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        errorToast('Failed to delete sell');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`
        flex items-start gap-4 p-4 mt-1 rounded-lg shadow-sm transition-all
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700
      `}
    >

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Task and Priority */}
        <div className="flex items-center justify-between">
          <p
            className={`
              font-semibold text-gray-800 dark:text-gray-100
            `}
          >
            {index + 1}. {sell.category}
          </p>
          <span className='text-green-500 font-bold'>{sell.packets}p</span>
          <p><span className='text-green-500 font-bold position-right'>₹{sell.amount}</span></p>
        </div>

        {/* Metadata: Time and Creation Date */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>{sell.day}/{sell.month}/{sell.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            <span>{new Date(sell.createdAt).toLocaleTimeString()}</span>
          </div>
          <div className='ml-auto'>
            <DeleteButton onDelete={() => handleDelete(sell._id)} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};