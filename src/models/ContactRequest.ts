import mongoose, { Schema, Document } from 'mongoose';

export interface IContactRequest extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'assigned_for_verification' | 'verified_and_approved' | 'funded';
  
  // Verification details
  assignedMemberEmail?: string;
  verificationReport?: string;
  
  // Funding details
  targetAmount?: number;
  raisedAmount?: number;

  createdAt: Date;
}

const ContactRequestSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ['new', 'assigned_for_verification', 'verified_and_approved', 'funded'],
    default: 'new'
  },
  
  assignedMemberEmail: { type: String },
  verificationReport: { type: String },
  
  targetAmount: { type: Number, default: 0 },
  raisedAmount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ContactRequest || mongoose.model<IContactRequest>('ContactRequest', ContactRequestSchema);
