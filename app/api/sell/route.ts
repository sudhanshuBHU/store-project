import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import SellKhaini from '@/models/sellKhaini.model';



// POST /api/sell - Save a sell transaction
export async function POST(req: NextRequest) {
  await dbConnect();
  console.log("post request");
  
  const { transactionType, transactionPackets, transactionAmount, day, month, year } = await req.json();
  // console.log(transactionType, transactionPackets, transactionAmount, day, month, year);
  if (transactionType !== 'store' && transactionType !== 'wholesale') {
    return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
  }
  if (transactionPackets === 0) {
    return NextResponse.json({ error: 'Packets cannot be zero' }, { status: 400 });
  }
  if (transactionPackets < 0 || transactionAmount < 0 || day < 0 || month < 0 || year < 0) {
    return NextResponse.json({ error: 'Packets, amount, day, month, year cannot be negative' }, { status: 400 });
  }
  // console.log("after validation");
  
  const sell = await SellKhaini.create({ category: transactionType, packets: transactionPackets, amount: transactionAmount, day, month, year });
  // console.log(sell);
  return NextResponse.json(sell, { status: 201 });
}

// GET /api/sell - Get all sells
export async function GET(){
  await dbConnect();
  const today = new Date();
  const sells = await SellKhaini.find({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  }).sort({ updatedAt: -1 }); // Sort by updatedAt in descending order
  const totalSells = sells.reduce((acc, sell) => acc + sell.amount, 0);
  return NextResponse.json({ sells, totalSells }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  await SellKhaini.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Sell deleted successfully' }, { status: 200 });
}
