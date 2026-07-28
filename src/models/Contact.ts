import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  assignedTo?: string;
  verificationStatus: 'pending_assignment' | 'assigned' | 'verified' | 'rejected';
  verificationReport?: string;
  targetAmount?: number;
  raisedAmount?: number;
  publishedForDonation: boolean;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  assignedTo: { type: String }, // Trust Member ID
  verificationStatus: { type: String, enum: ['pending_assignment', 'assigned', 'verified', 'rejected'], default: 'pending_assignment' },
  verificationReport: { type: String },
  targetAmount: { type: Number, default: 0 },
  raisedAmount: { type: Number, default: 0 },
  publishedForDonation: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
