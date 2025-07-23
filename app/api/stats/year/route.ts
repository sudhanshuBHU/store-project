import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import SellKhaini from '@/models/sellKhaini.model';

export async function GET(request: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const year = searchParams.get('year');

    const sells = await SellKhaini.find({ year }).sort({ updatedAt: -1 });
    const totalSells = sells.reduce((acc, sell) => acc + sell.amount, 0);
    const monthlyTotals = sells.reduce((acc, sell) => {
        const month = new Date(sell.createdAt).toLocaleDateString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + sell.amount;
        return acc;
    }, {} as Record<string, number>);

    const x = Object.keys(monthlyTotals);
    const y = Object.values(monthlyTotals);
    const title = `Sales Data for ${year}`;

    return NextResponse.json({ x: x.reverse(), y: y.reverse(), title, totalSells });
}