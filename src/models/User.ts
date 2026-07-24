import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'treasurer', 'trust_member', 'auditor', 'alumni'], default: 'trust_member' },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
