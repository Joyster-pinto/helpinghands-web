import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Beneficiary from '@/models/Beneficiary';
import Transaction from '@/models/Transaction';
import Activity from '@/models/Activity';
import Sponsor from '@/models/Sponsor';
import Alumni from '@/models/Alumni';
import TrustMember from '@/models/TrustMember';

export async function GET() {
  try {
    await connectToDatabase();
    const beneficiaries = await Beneficiary.find({});
    const transactions = await Transaction.find({});
    const activities = await Activity.find({});
    const sponsors = await Sponsor.find({});
    const alumni = await Alumni.find({});
    const members = await TrustMember.find({});

    return NextResponse.json({
      beneficiaries,
      transactions,
      activities,
      sponsors,
      alumni,
      members,
    });
  } catch (error) {
    return NextResponse.json({
      beneficiaries: [],
      transactions: [],
      activities: [],
      sponsors: [],
      alumni: [],
      members: [],
    });
  }
}
