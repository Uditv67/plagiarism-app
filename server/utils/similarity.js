import { embed, cosineVec } from './embed.js';

export function splitSentences(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 2);
}


const tokenize = (s) => s.toLowerCase().match(/[a-z0-9]+/g) || [];


export function buildVectors(sentences) {
  const docs = sentences.map(tokenize);

  // document frequency: in how many sentences does each word appear?
  const df = {};
  docs.forEach((words) => {
    new Set(words).forEach((w) => {
      df[w] = (df[w] || 0) + 1;
    });
  });

  const N = docs.length;

  return docs.map((words) => {
    // term frequency: how many times each word appears in this sentence
    const tf = {};
    words.forEach((w) => {
      tf[w] = (tf[w] || 0) + 1;
    });

    // multiply tf by idf for every word
    const vec = {};
    for (const w in tf) {
      vec[w] = tf[w] * Math.log((N + 1) / (df[w] + 1) + 1);
    }
    return vec;
  });
}


export function cosine(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const w in a) {
    normA += a[w] ** 2;
    if (b[w]) dot += a[w] * b[w];
  }
  for (const w in b) {
    normB += b[w] ** 2;
  }

  return normA && normB ? dot / Math.sqrt(normA * normB) : 0;
}


export async function compareDocs(textA, textB, threshold = 0.6, semanticThreshold = 0.6) {
  const sentencesA = splitSentences(textA);
  const sentencesB = splitSentences(textB);

  // lexical vectors (TF-IDF), built over all sentences together
  const vectors = buildVectors([...sentencesA, ...sentencesB]);
  const vectorsA = vectors.slice(0, sentencesA.length);
  const vectorsB = vectors.slice(sentencesA.length);

  // semantic vectors (embeddings)
  const embA = [];
  for (const s of sentencesA) embA.push(await embed(s));
  const embB = [];
  for (const s of sentencesB) embB.push(await embed(s));

  const pairs = [];

  sentencesA.forEach((sentenceA, i) => {
    let best = { lexical: 0, semantic: 0, lexIndex: -1, semIndex: -1 };

    sentencesB.forEach((_, j) => {
      const lex = cosine(vectorsA[i], vectorsB[j]);
      const sem = cosineVec(embA[i], embB[j]);
      if (lex > best.lexical) { best.lexical = lex; best.lexIndex = j; }
      if (sem > best.semantic) { best.semantic = sem; best.semIndex = j; }
    });

    const lexFlag = best.lexical >= threshold;
    const semFlag = best.semantic >= semanticThreshold;

    if (lexFlag || semFlag) {
      // "exact" if the lexical match is the stronger evidence, otherwise "semantic"
      const useLexical = lexFlag && (!semFlag || best.lexical >= best.semantic);
      const j = useLexical ? best.lexIndex : best.semIndex;
      pairs.push({
        aText: sentenceA,
        bText: sentencesB[j],
        score: Number((useLexical ? best.lexical : best.semantic).toFixed(2)),
        type: useLexical ? 'exact' : 'semantic',
      });
    }
  });

  const overallAinB = sentencesA.length
    ? Math.round((pairs.length / sentencesA.length) * 100)
    : 0;

  return { overallAinB, pairs };
}