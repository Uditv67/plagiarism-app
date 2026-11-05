import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  overallAinB: Number,
  textA: String,
  textB: String,
  pairs: [
    {
      aText: String,
      bText: String,
      score: Number,
      type: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Report', reportSchema);