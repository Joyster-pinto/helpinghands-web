import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // 1. Wipe the entire database by dropping it
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }

    // 2. Re-create the Admin User
    await User.create({
      name: 'Main Admin',
      email: 'admin@helpinghands.com',
      password: 'password123',
      role: 'admin'
    });

    // 3. Re-create the Trust Members
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

    return NextResponse.json({ 
      success: true, 
      message: 'DATABASE WIPED COMPLETELY! All old data is gone. New Admin and Members have been seeded.' 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
