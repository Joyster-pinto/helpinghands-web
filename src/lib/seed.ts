import connectToDatabase from './mongodb';
import User from '../models/User';
import Beneficiary from '../models/Beneficiary';
import Transaction from '../models/Transaction';
import TrustMember from '../models/TrustMember';
import Activity from '../models/Activity';
import Meeting from '../models/Meeting';
import Sponsor from '../models/Sponsor';
import Alumni from '../models/Alumni';

import {
  mockUsers,
  mockBeneficiaries,
  mockTransactions,
  mockMembers,
  mockActivities,
  mockMeetings,
  mockSponsors,
  mockAlumni,
} from '../data/mockData';

export async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Clearing existing database collections...');

    await User.deleteMany({});
    await Beneficiary.deleteMany({});
    await Transaction.deleteMany({});
    await TrustMember.deleteMany({});
    await Activity.deleteMany({});
    await Meeting.deleteMany({});
    await Sponsor.deleteMany({});
    await Alumni.deleteMany({});

    console.log('Seeding MongoDB Atlas collections...');

    await User.insertMany(mockUsers);
    await Beneficiary.insertMany(mockBeneficiaries);
    await Transaction.insertMany(mockTransactions);
    await TrustMember.insertMany(mockMembers);
    await Activity.insertMany(mockActivities);
    await Meeting.insertMany(mockMeetings);
    await Sponsor.insertMany(mockSponsors);
    await Alumni.insertMany(mockAlumni);

    console.log('MongoDB Atlas Database successfully seeded with all initial data!');
    return { success: true, message: 'Database seeded successfully' };
  } catch (error: any) {
    console.error('Error seeding MongoDB database:', error);
    return { success: false, error: error.message };
  }
}
