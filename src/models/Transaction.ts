import mongoose, { Schema, Document, Model } from 'mongoose';

const TransactionSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  paidTo: { type: String },
  receivedFrom: { type: String },
  beneficiaryId: { type: String },
  sponsorId: { type: String },
  memberId: { type: String },
  receiptNumber: { type: String },
  paymentMode: { type: String, default: 'bank_transfer' },
  createdBy: { type: String, default: 'u1' },
});

const Transaction: Model<any> = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;
