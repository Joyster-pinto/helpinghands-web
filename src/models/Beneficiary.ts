import mongoose, { Schema, Document, Model } from 'mongoose';

const BeneficiarySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  registrationDate: { type: String, required: true },
  scheme: { type: String, required: true },
  status: { type: String, default: 'active' },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  religion: { type: String },
  caste: { type: String },
  aadhaarNumber: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  city: { type: String, default: 'Chennai' },
  state: { type: String, default: 'Tamil Nadu' },
  pincode: { type: String },
  currentInstitution: { type: String, required: true },
  currentClass: { type: String, required: true },
  academicRecords: [{
    year: String,
    institution: String,
    grade: String,
    percentage: Number,
    remarks: String,
  }],
  familyIncome: { type: Number, required: true },
  fatherOccupation: { type: String },
  motherOccupation: { type: String },
  siblings: { type: Number, default: 0 },
  supportRecords: [{
    id: String,
    date: String,
    type: String,
    amount: Number,
    description: String,
    sponsorId: String,
  }],
  totalSupportReceived: { type: Number, default: 0 },
  sponsorId: { type: String },
  sponsorName: { type: String },
});

const Beneficiary: Model<any> = mongoose.models.Beneficiary || mongoose.model('Beneficiary', BeneficiarySchema);
export default Beneficiary;
