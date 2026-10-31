import { compareDocs } from './similarity.js';

const docA = 'The quick brown fox jumps over the lazy dog. Machine learning is changing how we build software. I enjoy walking on the beach every morning.';

const docB = 'A quick brown fox jumps over a lazy dog. Machine learning is changing how we build software today. Cooking pasta requires boiling water and good salt.';

console.log(compareDocs(docA, docB, 0.3));