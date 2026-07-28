import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  type: 'income' | 'expense';
  amount: number;
  description: string; // e.g., "Donation from Member Z", "Fund given to Person X"
  contactRequestId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  contactRequestId: { type: Schema.Types.ObjectId, ref: 'ContactRequest' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
