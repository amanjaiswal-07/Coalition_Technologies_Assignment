import { Download } from 'lucide-react';

export default function LabResults({ labResults }) {
  if (!labResults || labResults.length === 0) {
    return (
      <section className="lab-results-card" aria-label="Lab Results">
        <h2 className="lab-results-title">Lab Results</h2>
        <p style={{ color: 'var(--color-secondary-text)', fontSize: '14px' }}>
          No lab results available.
        </p>
      </section>
    );
  }

  return (
    <section className="lab-results-card" aria-label="Lab Results">
      <h2 className="lab-results-title">Lab Results</h2>
      <ul className="lab-results-list" role="list">
        {labResults.map((result, index) => (
          <li key={result + index} className="lab-result-item" role="listitem">
            <span className="lab-result-name">{result}</span>
            <button
              className="lab-result-download"
              aria-label={`Download ${result}`}
            >
              <Download size={20} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
