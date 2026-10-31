import { splitSentences, buildVectors, cosine } from './similarity.js';

const text = 'The cat sat on the mat today. The dog sat on the rug today. Quantum physics explains the universe quite well.';

const vectors = buildVectors(splitSentences(text));

console.log('cat vs dog sentence:', cosine(vectors[0], vectors[1]));
console.log('cat vs quantum sentence:', cosine(vectors[0], vectors[2]));
console.log('cat vs itself:', cosine(vectors[0], vectors[0]));