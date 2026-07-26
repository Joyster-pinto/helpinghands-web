import mongoose, { Schema, Model } from 'mongoose';

const AlumniSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  graduationYear: { type: String, default: '2024' },
  scheme: { type: String, default: 'college' },
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  currentStatus: { type: String, default: 'employed' },
  currentOrganization: { type: String, default: '' },
  currentRole: { type: String, default: '' },
  location: { type: String, default: '' },
  achievements: { type: Schema.Types.Mixed, default: [] },
  isMentor: { type: Boolean, default: false },
  isVolunteer: { type: Boolean, default: true },
  totalContributions: { type: Number, default: 0 },
  photo: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
}, { timestamps: true, strict: false });

const Alumni: Model<any> = mongoose.models.Alumni || mongoose.model('Alumni', AlumniSchema);
export default Alumni;
