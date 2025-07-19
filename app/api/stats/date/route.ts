import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import SellKhaini from '@/models/sellKhaini.model';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    await connectDB();

    const sells = await SellKhaini.find({ day, month, year }).sort({ updatedAt: -1 });
    
    const x = sells.map((sell) => new Date(sell.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    const y = sells.map((sell) => sell.amount);
    const title = `Sales Data for ${day}/${month}/${year}`;

    return NextResponse.json({ x, y, title });
}