import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import SellKhaini from '@/models/sellKhaini.model';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    await connectDB();

    const sells = await SellKhaini.find({ month, year }).sort({ updatedAt: -1 });
    
    const totalSells = sells.reduce((acc, sell) => acc + sell.amount, 0);
    const dailyTotals = sells.reduce((acc, sell) => {
        const day = new Date(sell.createdAt).toLocaleDateString('en-US', { day: 'numeric' });
        acc[day] = (acc[day] || 0) + sell.amount;
        return acc;
    }, {} as Record<string, number>);

    const x = Object.keys(dailyTotals);
    const y = Object.values(dailyTotals);
    const title = `Sales Data for ${new Date().toLocaleString('default', { month: 'long' })} ${year}`;

    return NextResponse.json({ x: x.reverse(), y: y.reverse(), title, totalSells });
}