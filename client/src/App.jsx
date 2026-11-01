import { useState } from 'react';

function App() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [result, setResult] = useState(null);

  async function handleCompare() {
    const response = await fetch('http://localhost:5000/api/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ textA, textB }),
    });
    const data = await response.json();
    setResult(data);
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