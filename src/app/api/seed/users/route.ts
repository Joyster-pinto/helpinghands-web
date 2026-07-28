import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TrustMember from '@/models/TrustMember';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    const members = await TrustMember.find({});
    
    let createdCount = 0;

    for (const member of members) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: member.email });
      
      if (!existingUser && member.email) {
        await User.create({
          id: member.id || member._id.toString(),
          name: member.name,
          email: member.email,
          password: 'password123', // Default password
          role: 'trust_member',
          phone: member.phone,
          isActive: true
        });
        createdCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully created ${createdCount} user credentials for trust members. Default password is 'password123'.`
    });
  } catch (error: any) {
    console.error('Seeding users failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
