import mongoose, { Schema, Model } from 'mongoose';

const TrustMemberSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, default: 'Trustee' },
  status: { type: String, default: 'active' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  joinDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  photo: { type: String, default: '' },
  occupation: { type: String, default: '' },
  totalContributions: { type: Number, default: 0 },
  bio: { type: String, default: '' },
}, { timestamps: true, strict: false });

const TrustMember: Model<any> = mongoose.models.TrustMember || mongoose.model('TrustMember', TrustMemberSchema);
export default TrustMember;
