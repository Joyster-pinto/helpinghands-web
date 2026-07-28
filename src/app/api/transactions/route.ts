import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    await connectToDatabase();
    const dbTransactions = await Transaction.find({}).sort({ date: -1 });
    return NextResponse.json(dbTransactions);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newTx = await Transaction.create(body);
    return NextResponse.json({ success: true, data: newTx });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
