import express from 'express';
import cors from 'cors';
import { compareDocs } from './utils/similarity.js';
import multer from 'multer';
import { extractText } from './utils/extract.js';

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

      const result = compareDocs(textA, textB);
      res.json({ ...result, textA, textB });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not read the files' });
    }
  }
);

app.listen(5000, () => {
    console.log('server running on port 5000');
});