import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonation extends Document {
  contactRequestId: string;
  trustMemberId: string;
  amount: number;
  status: 'pledged' | 'paid';
  paymentMode?: string;
  receiptNumber?: string;
  createdAt: Date;
}

const DonationSchema: Schema = new Schema({
  contactRequestId: { type: String, required: true },
  trustMemberId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pledged', 'paid'], default: 'pledged' },
  paymentMode: { type: String },
  receiptNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
export default Donation;
