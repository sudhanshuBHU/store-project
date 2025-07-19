import { IBuy } from "@/types/sell.type";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";

export const ShowBuys = ({ buys }: { buys: IBuy[] }) => {
    return (
        <div className='pt-3'>
            {buys.map((buy, index) => (
                <div
                    key={buy._id}
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
                                {index + 1}. Khaini
                            </p>
                            <p><span className='text-green-500 font-bold position-right'>{buy.stock} kg</span></p>
                            <p><span className='text-red-500 font-bold position-right'>₹{buy.amount}</span></p>
                        </div>

                        {/* Metadata: Time and Creation Date */}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>{buy.day}/{buy.month}/{buy.year}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="h-4 w-4" />
                                <span>{new Date(buy.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};