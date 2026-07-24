import mongoose, { Schema, Document, Model } from 'mongoose';

const TrustMemberSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  status: { type: String, default: 'active' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  joinDate: { type: String },
  photo: { type: String },
  occupation: { type: String },
  totalContributions: { type: Number, default: 0 },
  bio: { type: String },
});

const TrustMember: Model<any> = mongoose.models.TrustMember || mongoose.model('TrustMember', TrustMemberSchema);
export default TrustMember;
