import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  description: string;
  date: Date;
  link: string;
  createdAt: Date;
}

const MeetingSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Meeting || mongoose.model<IMeeting>('Meeting', MeetingSchema);
