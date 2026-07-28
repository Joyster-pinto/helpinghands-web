import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Alumni from '@/models/Alumni';


export async function GET() {
  try {
    await connectToDatabase();
    const dbAlumni = await Alumni.find({}).sort({ createdAt: -1 });
    if (dbAlumni.length === 0) {
      return NextResponse.json([]);
    }
    return NextResponse.json(dbAlumni);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newAlumnus = await Alumni.create({
      id: body.id || `al_${Date.now()}`,
      name: body.name,
      email: body.email || '',
      phone: body.phone || '',
      graduationYear: body.graduationYear,
      scheme: body.scheme || 'college',
      institution: body.institution,
      degree: body.degree,
      currentStatus: body.currentStatus || 'employed',
      currentOrganization: body.currentOrganization || '',
      currentRole: body.currentRole || '',
      location: body.location || '',
      achievements: body.achievements || ['Graduated successfully with Trust support'],
      isMentor: body.isMentor || false,
      isVolunteer: body.isVolunteer || true,
      totalContributions: body.totalContributions || 0,
    });
    return NextResponse.json({ success: true, data: newAlumnus });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
