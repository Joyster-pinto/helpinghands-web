import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Hashed or plain for dummy purpose
  role: 'admin' | 'trust_member';
  isVolunteer?: boolean;
  mustChangePassword?: boolean;
  phone?: string;
  dob?: string;
  gender?: string;
  occupation?: string;
  hasExperience?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['admin', 'trust_member'], default: 'trust_member' },
  isVolunteer: { type: Boolean, default: false },
  mustChangePassword: { type: Boolean, default: false },
  phone: { type: String },
  dob: { type: String },
  gender: { type: String },
  occupation: { type: String },
  hasExperience: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
