'use client';

import BarChart from '@/components/Chart';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            
            const res = await fetch(`/api/stats/date?day=${day}&month=${month}&year=${year}`);
            const data = await res.json();
            setX(data.x);
            setY(data.y);
            setTitle(data.title);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            {loading ? <p>Loading...</p> : x.length > 0 ? <BarChart x={x} y={y} title={title} /> : <p>No data found</p>}
        </div>
    )
}

export default Page;