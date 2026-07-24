import mongoose, { Schema, Model } from 'mongoose';

const ActivitySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  endDate: { type: String },
  location: { type: String, required: true },
  status: { type: String, default: 'planned' },
  budget: { type: Number, default: 0 },
  actualSpent: { type: Number, default: 0 },
  beneficiariesCovered: { type: Number, default: 0 },
  organizer: { type: String },
  photos: [String],
  videos: [String],
  outcome: { type: String },
  category: { type: String, default: 'Education' },
});

const Activity: Model<any> = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
export default Activity;
