import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  text: String,
  events: [mongoose.Schema.Types.Mixed],
  result: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Activity', activitySchema);