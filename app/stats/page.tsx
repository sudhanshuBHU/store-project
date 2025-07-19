import Link from 'next/link';

const Stats = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-md">
        <Link 
          href="/stats/date"
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          By Date
        </Link>
        <Link
          href="/stats/month" 
          className="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-center"
        >
          By Months
        </Link>
        <Link
          href="/stats/year"
          className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-center"
        >
          By Years
        </Link>
        <Link
          href="/stats/custom"
          className="px-6 py-3 text-lg font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors text-center"
        >
          Custom Range
        </Link>
      </div>
    </div>
  )
}

export default Stats;