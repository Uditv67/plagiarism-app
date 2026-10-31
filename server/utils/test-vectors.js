import { splitSentences, buildVectors } from './similarity.js';

const text = 'The cat sat on the mat today. The dog sat on the rug today. Quantum physics explains the universe quite well.';

const sentences = splitSentences(text);
const vectors = buildVectors(sentences);

console.log(sentences);
console.log(vectors);