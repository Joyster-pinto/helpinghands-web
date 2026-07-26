const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://admin:dakshin@cluster0.n604mqn.mongodb.net/helpinghands?retryWrites=true&w=majority&appName=Cluster0';

const mockUsers = [
  { id: 'u1', name: 'Fr. Administrator', email: 'admin@helpinghands-team.org', password: 'admin123', role: 'admin', phone: '+91 98419 29299', isActive: true },
  { id: 'u2', name: 'John Treasurer', email: 'treasurer@helpinghands-team.org', password: 'treasurer123', role: 'treasurer', phone: '+91 98419 29298', isActive: true },
  { id: 'u3', name: 'Mary Member', email: 'member@helpinghands-team.org', password: 'member123', role: 'trust_member', phone: '+91 98419 29297', isActive: true },
  { id: 'u4', name: 'Peter Auditor', email: 'auditor@helpinghands-team.org', password: 'auditor123', role: 'auditor', phone: '+91 98419 29296', isActive: true },
  { id: 'u5', name: 'Alumni User', email: 'alumni@helpinghands-team.org', password: 'alumni123', role: 'alumni', phone: '+91 98419 29295', isActive: true },
];

const mockBeneficiaries = [
  {
    id: 'b1', registrationDate: '2025-06-15', scheme: 'school', status: 'active',
    fullName: 'Aarav Sharma', fatherName: 'Rajesh Sharma', motherName: 'Sunita Sharma', dateOfBirth: '2012-03-15',
    gender: 'male', religion: 'Hindu', caste: 'General', phone: '+91 87654 32100', address: '45, Gandhi Nagar',
    city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', currentInstitution: 'Government Higher Secondary School',
    currentClass: '8th Standard', familyIncome: 120000, fatherOccupation: 'Auto Rickshaw Driver', motherOccupation: 'Homemaker',
    totalSupportReceived: 18000, sponsorName: 'Priya Foundation'
  },
  {
    id: 'b2', registrationDate: '2025-05-10', scheme: 'college', status: 'active',
    fullName: 'Fatima Khan', fatherName: 'Mohammed Khan', motherName: 'Ayesha Khan', dateOfBirth: '2006-08-22',
    gender: 'female', religion: 'Muslim', caste: 'OBC', phone: '+91 87654 32101', address: '12, Bunder Road',
    city: 'Chennai', state: 'Tamil Nadu', pincode: '600003', currentInstitution: 'Madras Medical College',
    currentClass: 'MBBS 2nd Year', familyIncome: 80000, fatherOccupation: 'Fisherman', motherOccupation: 'Homemaker',
    totalSupportReceived: 100000, sponsorName: 'R. Shetty Trust'
  },
  {
    id: 'b3', registrationDate: '2025-07-01', scheme: 'neet', status: 'pending',
    fullName: 'Kavitha R.', fatherName: 'Ramu K.', motherName: 'Latha R.', dateOfBirth: '2007-11-04',
    gender: 'female', religion: 'Hindu', caste: 'SC', phone: '+91 87654 32102', address: '88, Thaiyur Village',
    city: 'Kelambakkam', state: 'Tamil Nadu', pincode: '603103', currentInstitution: 'Velicham NEET Coaching Center',
    currentClass: '12th Passed', familyIncome: 60000, fatherOccupation: 'Agricultural Worker', motherOccupation: 'Coolie',
    totalSupportReceived: 35000, sponsorName: 'Helping Hands Trust Pool'
  }
];

const mockMembers = [
  { id: 'm1', name: 'Dr. Bharathiraja', designation: 'Managing Trustee', status: 'active', email: 'bharathi@helpinghands-team.org', phone: '+91 98419 29299', occupation: 'Trust Administrator', totalContributions: 150000, bio: 'Founding member driving educational initiatives since 2016.' },
  { id: 'm2', name: 'Bright Selvin', designation: 'Trustee & Secretary', status: 'active', email: 'selvin@helpinghands-team.org', phone: '+91 98419 29298', occupation: 'Social Worker', totalContributions: 75000, bio: 'Coordinating beneficiary selection interviews and house visits.' },
  { id: 'm3', name: 'V. Chinnadurai', designation: 'Treasurer', status: 'active', email: 'chinnadurai@helpinghands-team.org', phone: '+91 98419 29297', occupation: 'Financial Auditor', totalContributions: 100000, bio: 'Overseeing financial audits, 80G tax exemptions and accounts.' }
];

const mockSponsors = [
  { id: 'sp1', name: 'Priya Foundation', type: 'corporate', email: 'info@priyafoundation.org', phone: '+91 80 1234 5678', organization: 'Priya Foundation', totalCommitted: 500000, totalPaid: 350000, beneficiaries: ['b1'], status: 'active', renewalDate: '2027-01-01', communications: [{ date: '2026-06-15', type: 'meeting', subject: 'Annual Review', notes: 'Discussed extension of sponsorship for 2 more years' }] },
  { id: 'sp2', name: 'R. Shetty Group', type: 'corporate', email: 'contact@rshettytrust.org', phone: '+91 824 234 5678', organization: 'R. Shetty Charitable Trust', totalCommitted: 300000, totalPaid: 200000, beneficiaries: ['b2'], status: 'active', renewalDate: '2026-12-01', communications: [{ date: '2026-05-10', type: 'email', subject: 'Fund Disbursement', notes: 'Disbursed MBBS tuition fee instalment' }] }
];

const mockAlumni = [
  { id: 'al1', name: 'S. Sathish', email: 'sathish@techcorp.com', phone: '+91 97654 32109', graduationYear: '2023', scheme: 'college', institution: 'Anna University', degree: 'B.E. Computer Science', currentStatus: 'employed', currentOrganization: 'Tech Solutions India', currentRole: 'Software Engineer', location: 'Chennai', achievements: ['Graduated with 8.9 CGPA', 'Currently mentoring 3 school beneficiaries'], isMentor: true, isVolunteer: true, totalContributions: 25000 }
];

const mockActivities = [
  { id: 'act1', title: 'Annual School Kit Distribution 2026', category: 'education', date: '2026-06-01', location: 'Government High School, Thaiyur', status: 'completed', budget: 75000, actualSpent: 72000, beneficiariesCovered: 64, description: 'Distributed school bags, uniforms, books and stationery to supported school students.', organizer: 'Bright Selvin' },
  { id: 'act2', title: 'NEET 7.5 Guidance Workshop', category: 'career', date: '2026-08-15', location: 'Kelambakkam Hall', status: 'planned', budget: 45000, actualSpent: 0, beneficiariesCovered: 30, description: 'Career guidance and coaching orientation for government school NEET aspirants.', organizer: 'Dr. Bharathiraja' }
];

const mockMeetings = [
  { id: 'mt1', title: 'Quarterly Executive Board Review', type: 'regular', date: '2026-07-15', time: '10:00 AM', venue: 'Trust Registered Office, Thaiyur', agenda: ['Review student academic progress', 'Approve Q3 scholarship disbursements', 'Audit report submission'], attendees: ['Dr. Bharathiraja', 'Bright Selvin', 'V. Chinnadurai'], minutesOfMeeting: 'Board approved full fee disbursement for 28 college beneficiaries.', resolutions: ['Resolution 2026-04: Sanctioned ₹4.5 Lakhs for college tuition fees'], createdBy: 'u1' }
];

async function runSeed() {
  try {
    console.log('Connecting to MongoDB Atlas Cluster0...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    const db = mongoose.connection.db;

    console.log('Seeding collections...');
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(mockUsers);

    await db.collection('beneficiaries').deleteMany({});
    await db.collection('beneficiaries').insertMany(mockBeneficiaries);

    await db.collection('trustmembers').deleteMany({});
    await db.collection('trustmembers').insertMany(mockMembers);

    await db.collection('sponsors').deleteMany({});
    await db.collection('sponsors').insertMany(mockSponsors);

    await db.collection('alumnis').deleteMany({});
    await db.collection('alumnis').insertMany(mockAlumni);

    await db.collection('activities').deleteMany({});
    await db.collection('activities').insertMany(mockActivities);

    await db.collection('meetings').deleteMany({});
    await db.collection('meetings').insertMany(mockMeetings);

    console.log('All collections successfully populated in MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error during database seeding:', err);
    process.exit(1);
  }
}

runSeed();
