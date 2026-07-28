import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Meeting from '@/models/Meeting';


export async function GET() {
  try {
    await connectToDatabase();
    const dbMeetings = await Meeting.find({}).sort({ createdAt: -1 });
    if (dbMeetings.length === 0) {
      return NextResponse.json([]);
    }
    return NextResponse.json(dbMeetings);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newMeeting = await Meeting.create({
      id: body.id || `m_${Date.now()}`,
      title: body.title,
      type: body.type || 'regular',
      date: body.date,
      time: body.time || '10:00 AM',
      venue: body.venue,
      agenda: body.agenda || [],
      attendees: body.attendees || ['Fr. Administrator', 'John Treasurer'],
      absentees: body.absentees || [],
      minutesOfMeeting: body.minutesOfMeeting || '',
      resolutions: body.resolutions || [],
      actionItems: body.actionItems || [],
      documents: body.documents || [],
      createdBy: body.createdBy || 'u1'
    });
    return NextResponse.json({ success: true, data: newMeeting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
