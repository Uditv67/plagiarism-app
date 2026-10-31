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


export function compareDocs(textA, textB, threshold = 0.5) {
  const sentencesA = splitSentences(textA);
  const sentencesB = splitSentences(textB);

  // build vectors over ALL sentences together so both documents share the same IDF
  const vectors = buildVectors([...sentencesA, ...sentencesB]);
  const vectorsA = vectors.slice(0, sentencesA.length);
  const vectorsB = vectors.slice(sentencesA.length);

  const pairs = [];

  vectorsA.forEach((vecA, i) => {
    let bestScore = 0;
    let bestIndex = -1;

    vectorsB.forEach((vecB, j) => {
      const score = cosine(vecA, vecB);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = j;
      }
    });

    if (bestScore >= threshold) {
      pairs.push({
        aText: sentencesA[i],
        bText: sentencesB[bestIndex],
        score: Number(bestScore.toFixed(2)),
      });
    }
  });

  const overallAinB = sentencesA.length
    ? Math.round((pairs.length / sentencesA.length) * 100)
    : 0;

  return { overallAinB, pairs };
}