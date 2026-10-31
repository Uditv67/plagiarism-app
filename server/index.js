import express from 'express';
import cors from 'cors';
import { compareDocs } from './utils/similarity.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.post('/api/compare', (req, res) => {
  const { textA, textB } = req.body;

  if (!textA || !textB) {
    return res.status(400).json({ error: 'Both textA and textB are required' });
  }

  const result = compareDocs(textA, textB);
  res.json(result);
});

app.listen(5000, () => {
    console.log('server running on port 5000');
});