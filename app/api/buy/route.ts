import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import BuyKhaini from '@/models/buyKhaini.model';



// POST /api/buy - Save a buy transaction
export async function POST(req: NextRequest) {
    await dbConnect();
    const { stock, amount, day, month, year } = await req.json();
    if (typeof stock !== 'number' || typeof amount !== 'number' || !day || !month || !year) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    if (stock < 0 || amount < 0 || day < 0 || month < 0 || year < 0) {
        return NextResponse.json({ error: 'Stock, amount, day, month, year cannot be negative' }, { status: 400 });
    }
    const buy = await BuyKhaini.create({ stock, amount, day, month, year });
    return NextResponse.json(buy, { status: 201 });
}

export async function GET() {
    await dbConnect();
    const buys = await BuyKhaini.find({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const totalBuy = buys.reduce((acc, buy) => acc + buy.amount, 0);
    const totalStock = buys.reduce((acc, buy) => acc + buy.stock, 0);
    return NextResponse.json({ buys, totalBuy, totalStock }, { status: 200 });
}