import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  contactRequestId: mongoose.Types.ObjectId;
  trustMemberEmail: string;
  amount: number;
  paymentProofReference: string; // Will store standard text/Txn ID for now
  status: 'pending' | 'completed';
  createdAt: Date;
}

const DonationSchema: Schema = new Schema({
  contactRequestId: { type: Schema.Types.ObjectId, ref: 'ContactRequest', required: true },
  trustMemberEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentProofReference: { type: String },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
