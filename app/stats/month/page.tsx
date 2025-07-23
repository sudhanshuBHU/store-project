'use client';

import React, { useEffect, useState } from 'react';
import BarChart from '@/components/Chart';

const Page = () => {
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalSells, setTotalSells] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            
            const res = await fetch(`/api/stats/month?month=${month}&year=${year}`);
            const data = await res.json();
            setX(data.x);
            setY(data.y);
            setTitle(data.title);
            setTotalSells(data.totalSells);
            setLoading(false);
        }
        fetchData();
    }, []);

  return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-lg font-bold'>Total Sales: <span className='text-green-500'>₹{totalSells}</span></p>
            {loading ? <p>Loading...</p> : x.length > 0 ? <BarChart x={x} y={y} title={title} /> : <p>No data found</p>}
            <div className="mt-4 w-full max-w-2xl">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-3">Detailed Sales Data</h2>
                    <div className="space-y-2">
                        {x.map((time, index) => (
                            <div key={index} className="flex justify-between items-center border-b py-2">
                                <span className="text-gray-700">{`${time} ${new Date().toLocaleString('default', { month: 'long' })}`}</span>
                                <span className="font-medium">₹{y[index]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;