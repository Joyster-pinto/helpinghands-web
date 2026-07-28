import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find().populate('contactRequestId').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: transactions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { type, amount, description, contactRequestId } = await req.json();
    await connectToDatabase();
    
    const transaction = await Transaction.create({
      type,
      amount,
      description,
      contactRequestId: contactRequestId || null
    });
    
    return NextResponse.json({ success: true, data: transaction });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
