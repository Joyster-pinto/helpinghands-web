import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Donation from '@/models/Donation';
import ContactRequest from '@/models/ContactRequest';
import Transaction from '@/models/Transaction';

export async function POST(req: Request) {
  try {
    const { contactRequestId, trustMemberEmail, amount, paymentProofReference } = await req.json();

    await connectToDatabase();
    
    // Create the donation
    const donation = await Donation.create({
      contactRequestId,
      trustMemberEmail,
      amount,
      paymentProofReference,
      status: 'completed'
    });

    // Update ContactRequest raised amount
    await ContactRequest.findByIdAndUpdate(contactRequestId, {
      $inc: { raisedAmount: amount }
    });

    // Create an Income Transaction
    await Transaction.create({
      type: 'income',
      amount,
      description: `Donation from ${trustMemberEmail}`,
      contactRequestId
    });

    return NextResponse.json({ success: true, data: donation });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const donations = await Donation.find().populate('contactRequestId').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: donations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
