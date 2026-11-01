import { pairs } from './data.js';
import { buildVectors, cosine } from '../utils/similarity.js';
import { embed, cosineVec } from '../utils/embed.js';

// score every pair once with both methods
const scored = [];
for (const p of pairs) {
  // TF-IDF: build vectors over just these two sentences
  const [va, vb] = buildVectors([p.a, p.b]);
  const lex = cosine(va, vb);

  // embeddings
  const sem = cosineVec(await embed(p.a), await embed(p.b));

  scored.push({ ...p, lex, sem });
}

function metrics(predict) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (const s of scored) {
    const pred = predict(s) ? 1 : 0;
    if (pred && s.label) tp++;
    else if (pred && !s.label) fp++;
    else if (!pred && s.label) fn++;
    else tn++;
  }
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  return { precision, recall, f1 };
}

const fmt = (m) =>
  `P=${m.precision.toFixed(2)}  R=${m.recall.toFixed(2)}  F1=${m.f1.toFixed(2)}`;

// default thresholds
const LEX = 0.6;
const SEM = 0.6;

console.log('\n=== Results at default thresholds ===');
console.log('TF-IDF only   ', fmt(metrics((s) => s.lex >= LEX)));
console.log('Embeddings    ', fmt(metrics((s) => s.sem >= SEM)));
console.log('Combined (OR) ', fmt(metrics((s) => s.lex >= LEX || s.sem >= SEM)));

// try a range of thresholds to find the best
console.log('\n=== Threshold sweep ===');
for (const t of [0.3, 0.4, 0.5, 0.6, 0.7, 0.8]) {
  console.log(
    `t=${t}  TF-IDF: ${fmt(metrics((s) => s.lex >= t))}  |  Embeddings: ${fmt(metrics((s) => s.sem >= t))}`
  );
}

// show the raw scores so you can see why mistakes happen
console.log('\n=== Raw scores ===');
for (const s of scored) {
  console.log(`label=${s.label}  lex=${s.lex.toFixed(2)}  sem=${s.sem.toFixed(2)}  | ${s.a.slice(0, 40)}...`);
}