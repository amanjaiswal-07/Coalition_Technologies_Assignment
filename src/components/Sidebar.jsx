import { Search, MoreHorizontal } from 'lucide-react';

export default function Sidebar({ patients, selectedPatientName }) {
  return (
    <aside className="sidebar" role="complementary" aria-label="Patient list">
      <div className="patients-card">
        <div className="patients-header">
          <h2 className="patients-title">Patients</h2>
          <button className="patients-search-btn" aria-label="Search patients">
            <Search size={18} />
          </button>
        </div>
        <ul className="patients-list" role="list">
          {patients.map((patient, index) => (
            <li
              key={patient.name + index}
              className={`patient-item${
                patient.name === selectedPatientName ? ' selected' : ''
              }`}
              role="listitem"
            >
              <img
                className="patient-item-img"
                src={patient.profile_picture}
                alt={patient.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    patient.name
                  )}&background=D8FCF7&color=072635&size=48`;
                }}
              />
              <div className="patient-item-info">
                <div className="patient-item-name">{patient.name}</div>
                <div className="patient-item-details">
                  {patient.gender}, {patient.age}
                </div>
              </div>
              <span className="patient-item-more" aria-hidden="true">
                <MoreHorizontal size={18} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
