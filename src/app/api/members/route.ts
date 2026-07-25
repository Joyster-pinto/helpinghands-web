import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TrustMember from '@/models/TrustMember';
import { mockMembers } from '@/data/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    const dbMembers = await TrustMember.find({}).sort({ createdAt: -1 });
    if (dbMembers.length === 0) {
      return NextResponse.json(mockMembers);
    }
    return NextResponse.json(dbMembers);
  } catch (error) {
    return NextResponse.json(mockMembers);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newMember = await TrustMember.create({
      id: body.id || `m_${Date.now()}`,
      name: body.name,
      designation: body.designation || 'Trustee',
      status: body.status || 'active',
      email: body.email,
      phone: body.phone,
      address: body.address || '',
      joinDate: body.joinDate || new Date().toISOString().split('T')[0],
      occupation: body.occupation || '',
      totalContributions: body.totalContributions || 0,
      bio: body.bio || 'Active trust member supporting educational initiatives.',
    });
    return NextResponse.json({ success: true, data: newMember });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
