import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ContactRequest from '@/models/ContactRequest';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: 'Please provide all required fields.' }, { status: 400 });
    }

    await connectToDatabase();
    const contactRecord = await ContactRequest.create({
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
      status: 'new'
    });

    const refId = `HH-REQ-${contactRecord._id.toString().substring(18).toUpperCase()}`;

    return NextResponse.json({ 
      success: true, 
      refId,
      message: `Thank you! Your query has been recorded. Reference: ${refId}.`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const requests = await ContactRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: requests });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, ...updateData } = body;

    const updatedRequest = await ContactRequest.findByIdAndUpdate(id, updateData, { new: true });
    
    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
