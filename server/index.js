import express from 'express';
import cors from 'cors';
import { compareDocs } from './utils/similarity.js';
import multer from 'multer';
import { extractText } from './utils/extract.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import Report from './models/Report.js';
import { scoreBehavior } from './utils/behavior.js';
import Activity from './models/Activity.js';

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

app.get('/health', (req, res) => {
    res.json({ ok: true });
});


app.post(
  '/api/compare',
  upload.fields([
    { name: 'fileA', maxCount: 1 },
    { name: 'fileB', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let textA = req.body.textA;
      let textB = req.body.textB;

      if (req.files?.fileA) textA = await extractText(req.files.fileA[0]);
      if (req.files?.fileB) textB = await extractText(req.files.fileB[0]);

      if (!textA || !textB) {
        return res.status(400).json({ error: 'Both documents are required' });
      }

      const result = await compareDocs(textA, textB);
      try {
        await Report.create({ ...result, textA, textB });
      } catch (dbErr) {
      console.error('Could not save report:', dbErr.message);
      }
      res.json({ ...result, textA, textB });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not read the files' });
    }
  }
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('overallAinB createdAt');
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load reports' });
  }
});

app.post('/api/activity', async (req, res) => {
  const { text, events } = req.body;

  if (typeof text !== 'string' || !Array.isArray(events)) {
    return res.status(400).json({ error: 'text and events are required' });
  }

  const result = {
    received: events.length,
    chars: text.length,
    ...scoreBehavior(text, events),
  };

  try {
    await Activity.create({ text, events, result });
  } catch (dbErr) {
    console.error('Could not save activity:', dbErr.message);
  }

  res.json(result);
});

app.listen(5000, () => {
    console.log('server running on port 5000');
});