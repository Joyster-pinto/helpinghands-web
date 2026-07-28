import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Sponsor from '@/models/Sponsor';


export async function GET() {
  try {
    await connectToDatabase();
    const dbSponsors = await Sponsor.find({}).sort({ createdAt: -1 });
    if (dbSponsors.length === 0) {
      return NextResponse.json([]);
    }
    return NextResponse.json(dbSponsors);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newSponsor = await Sponsor.create({
      id: body.id || `sp_${Date.now()}`,
      name: body.name,
      type: body.type || 'individual',
      email: body.email,
      phone: body.phone,
      organization: body.organization || '',
      totalCommitted: body.totalCommitted || 0,
      totalPaid: body.totalPaid || 0,
      beneficiaries: body.beneficiaries || [],
      status: body.status || 'active',
      communications: body.communications || [],
      renewalDate: body.renewalDate || '2027-01-01',
    });
    return NextResponse.json({ success: true, data: newSponsor });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
