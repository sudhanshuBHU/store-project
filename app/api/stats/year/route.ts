import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import SellKhaini from '@/models/sellKhaini.model';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const year = searchParams.get('year');

    await connectDB();

    const sells = await SellKhaini.find({ year }).sort({ updatedAt: -1 });
    
    const x = sells.map((sell) => new Date(sell.createdAt).toLocaleDateString('en-US', { month: 'short' }));
    const y = sells.map((sell) => sell.amount);
    const title = `Sales Data for ${year}`;

    return NextResponse.json({ x, y, title });
}