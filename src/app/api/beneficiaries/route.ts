import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Beneficiary from '@/models/Beneficiary';
import { mockBeneficiaries } from '@/data/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    const dbBeneficiaries = await Beneficiary.find({}).sort({ createdAt: -1 });
    if (dbBeneficiaries.length === 0) {
      return NextResponse.json(mockBeneficiaries);
    }
    return NextResponse.json(dbBeneficiaries);
  } catch (error) {
    return NextResponse.json(mockBeneficiaries);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newBeneficiary = await Beneficiary.create({
      id: body.id || `b_${Date.now()}`,
      registrationDate: body.registrationDate || new Date().toISOString().split('T')[0],
      scheme: body.scheme || 'school',
      status: body.status || 'pending',
      fullName: body.fullName,
      fatherName: body.fatherName || '',
      motherName: body.motherName || '',
      dateOfBirth: body.dateOfBirth || '',
      gender: body.gender || 'male',
      religion: body.religion || '',
      caste: body.caste || '',
      aadhaarNumber: body.aadhaarNumber || '',
      phone: body.phone,
      email: body.email || '',
      address: body.address || '',
      city: body.city || '',
      state: body.state || '',
      pincode: body.pincode || '',
      currentInstitution: body.currentInstitution || '',
      currentClass: body.currentClass || '',
      academicRecords: body.academicRecords || [],
      familyIncome: body.familyIncome || 0,
      fatherOccupation: body.fatherOccupation || '',
      motherOccupation: body.motherOccupation || '',
      siblings: body.siblings || 0,
      supportRecords: body.supportRecords || [],
      totalSupportReceived: body.totalSupportReceived || 0,
      documents: body.documents || [],
      sponsorName: body.sponsorName || '',
    });
    return NextResponse.json({ success: true, data: newBeneficiary });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
