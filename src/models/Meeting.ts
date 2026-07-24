import mongoose, { Schema, Model } from 'mongoose';

const MeetingSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, default: 'regular' },
  date: { type: String, required: true },
  time: { type: String },
  venue: { type: String },
  agenda: [String],
  attendees: [String],
  absentees: [String],
  minutesOfMeeting: { type: String },
  resolutions: [String],
  actionItems: [{
    id: String,
    description: String,
    assignedTo: String,
    dueDate: String,
    status: String,
    completedDate: String,
  }],
  documents: [String],
  createdBy: { type: String, default: 'u1' },
});

const Meeting: Model<any> = mongoose.models.Meeting || mongoose.model('Meeting', MeetingSchema);
export default Meeting;
