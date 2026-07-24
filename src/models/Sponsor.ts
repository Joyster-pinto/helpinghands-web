import mongoose, { Schema, Model } from 'mongoose';

const SponsorSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, default: 'individual' },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  organization: { type: String },
  totalCommitted: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  beneficiaries: [String],
  startDate: { type: String },
  endDate: { type: String },
  status: { type: String, default: 'active' },
  communications: [{
    id: String,
    date: String,
    type: String,
    subject: String,
    notes: String,
    followUpDate: String,
  }],
  renewalDate: { type: String },
});

const Sponsor: Model<any> = mongoose.models.Sponsor || mongoose.model('Sponsor', SponsorSchema);
export default Sponsor;
