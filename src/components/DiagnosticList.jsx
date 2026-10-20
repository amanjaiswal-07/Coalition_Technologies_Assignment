export default function DiagnosticList({ diagnosticList }) {
  if (!diagnosticList || diagnosticList.length === 0) {
    return (
      <section className="diagnostic-list-card" aria-label="Diagnostic List">
        <h2 className="diagnostic-list-title">Diagnostic List</h2>
        <p style={{ color: 'var(--color-secondary-text)', fontSize: '14px' }}>
          No diagnostic data available.
        </p>
      </section>
    );
  }

  return (
    <section className="diagnostic-list-card" aria-label="Diagnostic List">
      <h2 className="diagnostic-list-title">Diagnostic List</h2>
      <div className="diagnostic-table-wrapper">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th scope="col">Problem/Diagnosis</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList.map((item, index) => (
              <tr key={item.name + index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
