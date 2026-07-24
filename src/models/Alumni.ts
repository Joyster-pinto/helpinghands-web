import mongoose, { Schema, Model } from 'mongoose';

const AlumniSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  graduationYear: { type: String },
  scheme: { type: String },
  institution: { type: String },
  degree: { type: String },
  currentStatus: { type: String, default: 'employed' },
  currentOrganization: { type: String },
  currentRole: { type: String },
  location: { type: String },
  achievements: [String],
  isMentor: { type: Boolean, default: false },
  isVolunteer: { type: Boolean, default: false },
  totalContributions: { type: Number, default: 0 },
  photo: { type: String },
  linkedIn: { type: String },
});

const Alumni: Model<any> = mongoose.models.Alumni || mongoose.model('Alumni', AlumniSchema);
export default Alumni;
