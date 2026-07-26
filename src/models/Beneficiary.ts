import mongoose, { Schema, Model } from 'mongoose';

const BeneficiarySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  registrationDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  scheme: { type: String, default: 'school' },
  status: { type: String, default: 'active' },
  fullName: { type: String, required: true },
  fatherName: { type: String, default: '' },
  motherName: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  gender: { type: String, default: 'male' },
  religion: { type: String, default: '' },
  caste: { type: String, default: '' },
  aadhaarNumber: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: 'Chennai' },
  state: { type: String, default: 'Tamil Nadu' },
  pincode: { type: String, default: '' },
  currentInstitution: { type: String, default: '' },
  currentClass: { type: String, default: '' },
  academicRecords: { type: Schema.Types.Mixed, default: [] },
  familyIncome: { type: Number, default: 0 },
  fatherOccupation: { type: String, default: '' },
  motherOccupation: { type: String, default: '' },
  siblings: { type: Number, default: 0 },
  supportRecords: { type: Schema.Types.Mixed, default: [] },
  totalSupportReceived: { type: Number, default: 0 },
  sponsorId: { type: String, default: '' },
  sponsorName: { type: String, default: '' },
}, { timestamps: true, strict: false });

const Beneficiary: Model<any> = mongoose.models.Beneficiary || mongoose.model('Beneficiary', BeneficiarySchema);
export default Beneficiary;
