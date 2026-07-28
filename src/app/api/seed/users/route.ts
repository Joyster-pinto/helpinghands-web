import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    const adminExists = await User.findOne({ email: 'admin@helpinghands.com' });
    if (!adminExists) {
      await User.create({
        name: 'Main Admin',
        email: 'admin@helpinghands.com',
        password: 'password123',
        role: 'admin'
      });
    }

    const memberExists = await User.findOne({ email: 'member@helpinghands.com' });
    if (!memberExists) {
      await User.create({
        name: 'Trust Member Y',
        email: 'member@helpinghands.com',
        password: 'password123',
        role: 'trust_member'
      });
      await User.create({
        name: 'Trust Member Z',
        email: 'member2@helpinghands.com',
        password: 'password123',
        role: 'trust_member'
      });
    }

    return NextResponse.json({ success: true, message: 'Dummy Admin and Members seeded.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
