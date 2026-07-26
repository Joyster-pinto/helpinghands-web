import mongoose, { Schema, Model } from 'mongoose';

const SponsorSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, default: 'individual' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  organization: { type: String, default: '' },
  totalCommitted: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  beneficiaries: { type: Schema.Types.Mixed, default: [] },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  status: { type: String, default: 'active' },
  communications: { type: Schema.Types.Mixed, default: [] },
  renewalDate: { type: String, default: '2027-01-01' },
}, { timestamps: true, strict: false });

const Sponsor: Model<any> = mongoose.models.Sponsor || mongoose.model('Sponsor', SponsorSchema);
export default Sponsor;
