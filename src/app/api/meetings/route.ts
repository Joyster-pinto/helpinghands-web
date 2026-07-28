import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Meeting from '@/models/Meeting';

export async function GET() {
  try {
    await connectToDatabase();
    const meetings = await Meeting.find().sort({ date: 1 });
    return NextResponse.json({ success: true, data: meetings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, date, link } = await req.json();
    await connectToDatabase();
    
    const meeting = await Meeting.create({
      title,
      description,
      date,
      link
    });
    
    return NextResponse.json({ success: true, data: meeting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
