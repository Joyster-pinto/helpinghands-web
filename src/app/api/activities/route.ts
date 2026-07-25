import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Activity from '@/models/Activity';
import { mockActivities } from '@/data/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    const dbActivities = await Activity.find({}).sort({ createdAt: -1 });
    if (dbActivities.length === 0) {
      return NextResponse.json(mockActivities);
    }
    return NextResponse.json(dbActivities);
  } catch (error) {
    return NextResponse.json(mockActivities);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newActivity = await Activity.create({
      id: body.id || `act_${Date.now()}`,
      title: body.title,
      category: body.category || 'education',
      date: body.date,
      location: body.location,
      status: body.status || 'planned',
      budget: body.budget || 0,
      actualSpent: body.actualSpent || 0,
      beneficiariesCovered: body.beneficiariesCovered || 0,
      description: body.description,
      organizer: body.organizer || 'Fr. Administrator',
    });
    return NextResponse.json({ success: true, data: newActivity });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
