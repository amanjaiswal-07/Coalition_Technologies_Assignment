import {
  Home,
  Users,
  CalendarDays,
  MessageSquare,
  CreditCard,
  Settings,
  MoreVertical,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: Home },
  { label: 'Patients', icon: Users, active: true },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Message', icon: MessageSquare },
  { label: 'Transactions', icon: CreditCard },
];

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-logo">
        <img src="/assets/TestLogo.svg" alt="Tech.Care Logo" />
      </div>

      <nav className="header-nav" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={`header-nav-item${item.active ? ' active' : ''}`}
            href="#"
            aria-current={item.active ? 'page' : undefined}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="header-right">
        <div className="header-profile">
          <img
            className="header-profile-img"
            src="/assets/senior-woman-doctor.png"
            alt="Dr. Jose Simmons"
          />
          <div className="header-profile-info">
            <span className="header-profile-name">Dr. Jose Simmons</span>
            <span className="header-profile-role">General Practitioner</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="header-action-btn" aria-label="Settings">
            <Settings size={20} />
          </button>
          <button className="header-action-btn" aria-label="More options">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
