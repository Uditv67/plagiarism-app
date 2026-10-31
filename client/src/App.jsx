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

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default App;