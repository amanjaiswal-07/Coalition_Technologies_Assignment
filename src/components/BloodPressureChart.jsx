import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { getBloodPressureChartData, getLatestDiagnosis, getLevelIndicator } from '../utils/patientHelpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function BloodPressureChart({ diagnosisHistory }) {
  const chartData = useMemo(
    () => getBloodPressureChartData(diagnosisHistory, 6),
    [diagnosisHistory]
  );

  const latestDiagnosis = getLatestDiagnosis(diagnosisHistory);

  const systolicValue = latestDiagnosis?.blood_pressure?.systolic?.value ?? '—';
  const systolicLevel = latestDiagnosis?.blood_pressure?.systolic?.levels ?? '';
  const diastolicValue = latestDiagnosis?.blood_pressure?.diastolic?.value ?? '—';
  const diastolicLevel = latestDiagnosis?.blood_pressure?.diastolic?.levels ?? '';

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Systolic',
        data: chartData.systolic,
        borderColor: '#C26EB4',
        backgroundColor: 'rgba(194, 110, 180, 0.1)',
        pointBackgroundColor: '#E66FD2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Diastolic',
        data: chartData.diastolic,
        borderColor: '#7E6CAB',
        backgroundColor: 'rgba(126, 108, 171, 0.1)',
        pointBackgroundColor: '#8C6FE6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#072635',
        titleFont: { family: 'Manrope', size: 13 },
        bodyFont: { family: 'Manrope', size: 12 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Manrope', size: 12 },
          color: '#072635',
        },
        border: {
          display: false,
        },
      },
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          font: { family: 'Manrope', size: 12 },
          color: '#072635',
        },
        grid: {
          color: '#E0E0E0',
          drawTicks: false,
        },
        border: {
          display: false,
          dash: [4, 4],
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const systolicIndicator = getLevelIndicator(systolicLevel);
  const diastolicIndicator = getLevelIndicator(diastolicLevel);

  return (
    <section className="diagnosis-history-card" aria-label="Diagnosis History">
      <h2 className="diagnosis-history-title">Diagnosis History</h2>

      <div className="bp-chart-section">
        <div className="bp-chart-header">
          <h3 className="bp-chart-title">Blood Pressure</h3>
          <button className="bp-chart-filter" aria-label="Filter time range">
            Last 6 months
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="bp-chart-wrapper">
          <div className="bp-chart-canvas">
            <Line data={data} options={options} />
          </div>

          <div className="bp-chart-legend" aria-label="Blood pressure readings">
            <div className="bp-legend-item">
              <span className="bp-legend-label">
                <span className="bp-legend-dot systolic" aria-hidden="true"></span>
                Systolic
              </span>
              <span className="bp-legend-value">{systolicValue}</span>
              <span className="bp-legend-level">
                {systolicIndicator === 'up' && <ArrowUp size={14} className="arrow-up" />}
                {systolicIndicator === 'down' && <ArrowDown size={14} className="arrow-down" />}
                {systolicLevel}
              </span>
            </div>

            <div className="bp-legend-item">
              <span className="bp-legend-label">
                <span className="bp-legend-dot diastolic" aria-hidden="true"></span>
                Diastolic
              </span>
              <span className="bp-legend-value">{diastolicValue}</span>
              <span className="bp-legend-level">
                {diastolicIndicator === 'up' && <ArrowUp size={14} className="arrow-up" />}
                {diastolicIndicator === 'down' && <ArrowDown size={14} className="arrow-down" />}
                {diastolicLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <VitalSigns latestDiagnosis={latestDiagnosis} />
    </section>
  );
}

function VitalSigns({ latestDiagnosis }) {
  const respiratoryRate = latestDiagnosis?.respiratory_rate;
  const temperature = latestDiagnosis?.temperature;
  const heartRate = latestDiagnosis?.heart_rate;

  return (
    <div className="vital-signs">
      <div className="vital-card respiratory">
        <div className="vital-card-icon">
          <img src="/assets/respiratory_rate.svg" alt="Respiratory Rate" />
        </div>
        <span className="vital-card-label">Respiratory Rate</span>
        <span className="vital-card-value">
          {respiratoryRate?.value ?? '—'} bpm
        </span>
        <span className="vital-card-level">
          {respiratoryRate?.levels && getLevelIndicator(respiratoryRate.levels) === 'down' && (
            <ArrowDown size={14} className="arrow-down" />
          )}
          {respiratoryRate?.levels && getLevelIndicator(respiratoryRate.levels) === 'up' && (
            <ArrowUp size={14} className="arrow-up" />
          )}
          {respiratoryRate?.levels ?? ''}
        </span>
      </div>

      <div className="vital-card temperature">
        <div className="vital-card-icon">
          <img src="/assets/temperature.svg" alt="Temperature" />
        </div>
        <span className="vital-card-label">Temperature</span>
        <span className="vital-card-value">
          {temperature?.value ?? '—'}°F
        </span>
        <span className="vital-card-level">
          {temperature?.levels && getLevelIndicator(temperature.levels) === 'down' && (
            <ArrowDown size={14} className="arrow-down" />
          )}
          {temperature?.levels && getLevelIndicator(temperature.levels) === 'up' && (
            <ArrowUp size={14} className="arrow-up" />
          )}
          {temperature?.levels ?? ''}
        </span>
      </div>

      <div className="vital-card heart-rate">
        <div className="vital-card-icon">
          <img src="/assets/HeartBPM.svg" alt="Heart Rate" />
        </div>
        <span className="vital-card-label">Heart Rate</span>
        <span className="vital-card-value">
          {heartRate?.value ?? '—'} bpm
        </span>
        <span className="vital-card-level">
          {heartRate?.levels && getLevelIndicator(heartRate.levels) === 'down' && (
            <ArrowDown size={14} className="arrow-down" />
          )}
          {heartRate?.levels && getLevelIndicator(heartRate.levels) === 'up' && (
            <ArrowUp size={14} className="arrow-up" />
          )}
          {heartRate?.levels ?? ''}
        </span>
      </div>
    </div>
  );
}
