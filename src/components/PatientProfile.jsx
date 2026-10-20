import { CalendarDays, Venus, User, Phone, ShieldCheck } from 'lucide-react';
import { formatDateOfBirth } from '../utils/patientHelpers';

export default function PatientProfile({ patient }) {
  if (!patient) return null;

  const isFemale = patient.gender?.toLowerCase() === 'female';

  return (
    <section className="patient-profile-card" aria-label="Patient profile">
      <img
        className="patient-profile-img"
        src={patient.profile_picture}
        alt={patient.name}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            patient.name
          )}&background=D8FCF7&color=072635&size=200`;
        }}
      />
      <h2 className="patient-profile-name">{patient.name}</h2>

      <div className="patient-info-list">
        <div className="patient-info-item">
          <div className="patient-info-icon">
            <CalendarDays size={20} color="#072635" />
          </div>
          <div className="patient-info-text">
            <span className="patient-info-label">Date Of Birth</span>
            <span className="patient-info-value">
              {formatDateOfBirth(patient.date_of_birth)}
            </span>
          </div>
        </div>

        <div className="patient-info-item">
          <div className="patient-info-icon">
            {isFemale ? (
              <Venus size={20} color="#072635" />
            ) : (
              <User size={20} color="#072635" />
            )}
          </div>
          <div className="patient-info-text">
            <span className="patient-info-label">Gender</span>
            <span className="patient-info-value">{patient.gender || 'N/A'}</span>
          </div>
        </div>

        <div className="patient-info-item">
          <div className="patient-info-icon">
            <Phone size={20} color="#072635" />
          </div>
          <div className="patient-info-text">
            <span className="patient-info-label">Contact Info.</span>
            <span className="patient-info-value">
              {patient.phone_number || 'N/A'}
            </span>
          </div>
        </div>

        <div className="patient-info-item">
          <div className="patient-info-icon">
            <Phone size={20} color="#072635" />
          </div>
          <div className="patient-info-text">
            <span className="patient-info-label">Emergency Contacts</span>
            <span className="patient-info-value">
              {patient.emergency_contact || 'N/A'}
            </span>
          </div>
        </div>

        <div className="patient-info-item">
          <div className="patient-info-icon">
            <ShieldCheck size={20} color="#072635" />
          </div>
          <div className="patient-info-text">
            <span className="patient-info-label">Insurance Provider</span>
            <span className="patient-info-value">
              {patient.insurance_type || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <button className="patient-profile-btn" type="button">
        Show All Information
      </button>
    </section>
  );
}
