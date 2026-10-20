import { useState, useEffect, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BloodPressureChart from './components/BloodPressureChart';
import DiagnosticList from './components/DiagnosticList';
import PatientProfile from './components/PatientProfile';
import LabResults from './components/LabResults';
import { fetchPatients } from './services/patientApi';

import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

export default function App() {
  const [patients, setPatients] = useState([]);
  const [jessica, setJessica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allPatients = await fetchPatients();
      setPatients(allPatients);

      const jessicaRecord = allPatients.find(
        (p) => p.name === 'Jessica Taylor'
      );
      if (!jessicaRecord) {
        throw new Error('Patient "Jessica Taylor" not found in API response.');
      }
      setJessica(jessicaRecord);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="app-layout">
        <Header />
        <div className="loading-container" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p className="loading-text">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-layout">
        <Header />
        <div className="error-container" role="alert">
          <AlertCircle className="error-icon" size={64} />
          <h2 className="error-title">Unable to Load Data</h2>
          <p className="error-message">{error}</p>
          <button className="error-retry-btn" onClick={loadData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar
          patients={patients}
          selectedPatientName="Jessica Taylor"
        />

        <main className="main-content" role="main">
          <BloodPressureChart
            diagnosisHistory={jessica.diagnosis_history}
          />
          <DiagnosticList
            diagnosticList={jessica.diagnostic_list}
          />
        </main>

        <div className="right-panel">
          <PatientProfile patient={jessica} />
          <LabResults labResults={jessica.lab_results} />
        </div>
      </div>
    </div>
  );
}
