import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Donation from '@/models/Donation';
import Contact from '@/models/Contact';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const trustMemberId = searchParams.get('trustMemberId');
    const contactRequestId = searchParams.get('contactRequestId');
    
    let query: any = {};
    if (trustMemberId) query.trustMemberId = trustMemberId;
    if (contactRequestId) query.contactRequestId = contactRequestId;
    
    const donations = await Donation.find(query).sort({ createdAt: -1 });
    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { contactRequestId, amount, trustMemberId } = body;
    
    if (!contactRequestId || !amount || !trustMemberId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create the donation
    const newDonation = await Donation.create(body);
    
    // Update the raisedAmount on the Contact request
    await Contact.findByIdAndUpdate(
      contactRequestId,
      { $inc: { raisedAmount: amount } }
    );
    
    return NextResponse.json({ success: true, data: newDonation });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
