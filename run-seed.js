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
    id: 'b1', registrationDate: '2025-06-15', scheme: 'Kamarajar Scholarship Scheme (School)', status: 'active',
    fullName: 'Aarav Sharma', fatherName: 'Rajesh Sharma', motherName: 'Sunita Sharma', dateOfBirth: '2012-03-15',
    gender: 'Male', religion: 'Hindu', caste: 'General', phone: '+91 87654 32100', address: '45, Gandhi Nagar',
    city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', currentInstitution: 'Government Higher Secondary School',
    currentClass: '8th Standard', familyIncome: 120000, fatherOccupation: 'Auto Rickshaw Driver', motherOccupation: 'Homemaker',
    totalSupportReceived: 18000, sponsorName: 'Priya Foundation'
  },
  {
    id: 'b2', registrationDate: '2025-05-10', scheme: 'Kalam Scholarship Scheme (College)', status: 'active',
    fullName: 'Fatima Khan', fatherName: 'Mohammed Khan', motherName: 'Ayesha Khan', dateOfBirth: '2006-08-22',
    gender: 'Female', religion: 'Muslim', caste: 'OBC', phone: '+91 87654 32101', address: '12, Bunder Road',
    city: 'Chennai', state: 'Tamil Nadu', pincode: '600003', currentInstitution: 'Madras Medical College',
    currentClass: 'MBBS 2nd Year', familyIncome: 80000, fatherOccupation: 'Fisherman', motherOccupation: 'Homemaker',
    totalSupportReceived: 100000, sponsorName: 'R. Shetty Trust'
  }
];

async function runSeed() {
  try {
    console.log('Connecting to MongoDB Atlas Cluster0...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    const db = mongoose.connection.db;
    
    console.log('Seeding users and beneficiaries...');
    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(mockUsers);

    await db.collection('beneficiaries').deleteMany({});
    await db.collection('beneficiaries').insertMany(mockBeneficiaries);

    console.log('Database successfully seeded on MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error during database seeding:', err);
    process.exit(1);
  }
}

runSeed();
