import { createRequire } from 'module';
import mammoth from 'mammoth';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export async function extractText(file) {
  const name = file.originalname.toLowerCase();

  if (name.endsWith('.pdf')) {
    const data = await pdfParse(file.buffer);
    return data.text;
  }
  if (name.endsWith('.docx')) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }
  return file.buffer.toString('utf-8'); // .txt and anything else
}