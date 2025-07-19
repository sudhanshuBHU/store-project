import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import SellKhaini from '@/models/sellKhaini.model';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    await connectDB();

    const sells = await SellKhaini.find({ month, year }).sort({ updatedAt: -1 });
    
    const x = sells.map((sell) => new Date(sell.createdAt).toLocaleDateString('en-US', { day: 'numeric' }));
    const y = sells.map((sell) => sell.amount);
    const title = `Sales Data for ${month}/${year}`;

    return NextResponse.json({ x, y, title });
}