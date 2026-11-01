import { useState } from 'react';

function App() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);

  async function handleCompare() {
    setSelected(null);
    const response = await fetch('http://localhost:5000/api/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ textA, textB }),
    });
    const data = await response.json();
    setResult(data);
  }

  function renderHighlighted() {
  let remaining = textA;
  const parts = [];

  result.pairs.forEach((pair, i) => {
    const index = remaining.indexOf(pair.aText);
    if (index === -1) return;

    // plain text before the match
    parts.push(<span key={'t' + i}>{remaining.slice(0, index)}</span>);

    // the highlighted match
    parts.push(
      <mark
        key={'m' + i}
        onClick={() => setSelected(pair)}
        style={{
          background: '#f5d90a',
          color: '#000',
          cursor: 'pointer',
          padding: '0 2px',
          borderRadius: 3,
        }}
      >
        {pair.aText}
      </mark>
    );

    remaining = remaining.slice(index + pair.aText.length);
  });

  // plain text after the last match
  parts.push(<span key="end">{remaining}</span>);
  return parts;
}

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>Plagiarism Detector</h1>

      <textarea
        rows={8}
        style={{ width: '100%', marginBottom: 10 }}
        placeholder="Paste Document A here"
        value={textA}
        onChange={(e) => setTextA(e.target.value)}
      />
      <textarea
        rows={8}
        style={{ width: '100%', marginBottom: 10 }}
        placeholder="Paste Document B here"
        value={textB}
        onChange={(e) => setTextB(e.target.value)}
      />

      <button onClick={handleCompare}>Compare</button>


      {result && (
  <div style={{ marginTop: 20 }}>
    <h2>Similarity: {result.overallAinB}%</h2>
    <div style={{ background: '#444', borderRadius: 6, height: 20 }}>
      <div
        style={{
          width: `${result.overallAinB}%`,
          background: result.overallAinB >= 50 ? '#e5484d' : '#30a46c',
          height: '100%',
          borderRadius: 6,
        }}
      />
    </div>

    <h3>Document A (matches highlighted)</h3>
<div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, marginBottom: 10 }}>
  {renderHighlighted()}
</div>

{selected && (
  <div style={{ border: '2px solid #f5d90a', borderRadius: 6, padding: 10, marginBottom: 20 }}>
    <p><strong>Matching sentence in B:</strong> {selected.bText}</p>
    <p>Score: {selected.score}</p>
  </div>
)}

    <h3>Matched sentences ({result.pairs.length})</h3>
    {result.pairs.map((pair, i) => (
      <div
        key={i}
        style={{ border: '1px solid #666', borderRadius: 6, padding: 10, marginBottom: 10 }}
      >
        <p><strong>A:</strong> {pair.aText}</p>
        <p><strong>B:</strong> {pair.bText}</p>
        <p>Score: {pair.score}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default App;