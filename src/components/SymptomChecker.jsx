// src/components/SymptomChecker.jsx
import { useState } from 'react';

export default function SymptomChecker() {
  const [data, setData] = useState({ age: '', temp: '', symptoms: [] });
  const [analysis, setAnalysis] = useState(null);

  const availableSymptoms = ["Cough", "Fever", "Fatigue", "Headache", "Nausea"];

  const toggleSymptom = (s) => {
    setData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(s) 
        ? prev.symptoms.filter(item => item !== s) 
        : [...prev.symptoms, s]
    }));
  };

  const getAnalysis = () => {
    // Basic logic for now - connect backend later
    if (data.temp > 38 || data.symptoms.includes("Fever")) {
      setAnalysis("Potential viral infection detected. Monitor and consult a physician.");
    } else {
      setAnalysis("Analysis complete. Continue to monitor symptoms.");
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '700px', margin: '4rem auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Health Hub</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
        AI-driven health analysis for immediate insights.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <input type="number" placeholder="Enter Age" className="glass-input" onChange={e => setData({...data, age: e.target.value})} />
        <input type="number" placeholder="Body Temp (°C)" className="glass-input" onChange={e => setData({...data, temp: e.target.value})} />
      </div>

      <div style={{ margin: '2rem 0' }}>
        <p style={{ fontWeight: 600, color: 'white', marginBottom: '1.2rem' }}>Check Current Symptoms</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {availableSymptoms.map(s => (
            <div 
              key={s} 
              onClick={() => toggleSymptom(s)} 
              className={`symptom-pill ${data.symptoms.includes(s) ? 'selected' : ''}`}
            > {s} </div>
          ))}
        </div>
      </div>

      <button className="btn-neon" style={{ width: '100%', marginTop: '2rem' }} onClick={getAnalysis}>
        Get Full Summary
      </button>

      {analysis && (
        <div style={{ marginTop: '2.5rem', padding: '20px', background: 'var(--cyan-muted)', borderRadius: '16px', borderLeft: '4px solid var(--neon-cyan)', color: 'white' }}>
          <strong style={{ color: 'var(--neon-cyan)' }}>AI Summary:</strong> {analysis}
        </div>
      )}
    </div>
  );
}