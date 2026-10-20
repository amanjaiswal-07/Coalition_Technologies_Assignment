# Tech.Care — Patient Health Dashboard

A responsive, single-page healthcare dashboard built with **React 19**, **Vite**, **Chart.js**, and custom **CSS3**, accurately implementing the Coalition Technologies Front-End Developer skills assessment based on the provided Adobe XD design specifications.

---

## 🌟 Overview & Key Requirements

- **Design Fidelity**: Pixel-accurate recreation of the Tech.Care Adobe XD design, including colors, typography (`Manrope`), spacing, vector icons, custom scrollbars, and card elevations.
- **Target Patient Data**: Retrieves all patient data from the Coalition Technologies Patient Data API using Basic Authentication, and focuses the dashboard on **Jessica Taylor** as specified in the assignment.
- **Interactive Blood Pressure Chart**: Chart.js spline line chart plotting systolic and diastolic pressure across the past 6 months, matching the exact colors, grid styling, and status indicators.
- **Diagnostic Information**: Formatted diagnostic history cards (Respiratory Rate, Temperature, Heart Rate) and full Diagnostic List table.
- **Patient Profile & Lab Results**: Comprehensive patient profile sidebar with formatted Date of Birth, contact info, emergency details, insurance provider, and downloadable lab results list.
- **Responsive Layout**: Fluid flex and grid layouts adapting seamlessly from large desktop displays (1600px) down to tablet and mobile screens (768px / 375px).

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Data Visualization**: [Chart.js 4](https://www.chartjs.org/) & [react-chartjs-2 5](https://react-chartjs-2.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/) + Authentic Adobe XD vector SVG brand assets
- **Styling**: Vanilla CSS3 with semantic CSS custom properties (design tokens)
- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── HeartBPM.svg              # Authentic heart rate vector badge
│   │   ├── respiratory_rate.svg      # Authentic lungs/respiratory rate vector badge
│   │   ├── temperature.svg           # Authentic thermometer vector badge
│   │   ├── TestLogo.svg              # Official Tech.Care folded-cross brand mark
│   │   ├── senior-woman-doctor.png   # Dr. Jose Simmons avatar
│   │   └── senior-woman-doctor.webp  # WebP version of doctor avatar
│   └── favicon.svg                   # Brand favicon
├── src/
│   ├── components/
│   │   ├── BloodPressureChart.jsx    # BP Chart.js visualization & 3 vital sign cards
│   │   ├── DiagnosticList.jsx        # Table of diagnoses, descriptions, and statuses
│   │   ├── Header.jsx                # Top bar with logo, nav links, doctor profile
│   │   ├── LabResults.jsx            # Scrollable lab tests with download buttons
│   │   ├── PatientProfile.jsx        # Jessica Taylor profile card & details
│   │   └── Sidebar.jsx               # Left sidebar with patient list & search
│   ├── services/
│   │   └── patientApi.js             # Basic Auth API client for Coalition Technologies API
│   ├── styles/
│   │   ├── components.css            # Component-level layout and element styles
│   │   ├── global.css                # Design tokens, CSS reset, font imports, scrollbar
│   │   └── layout.css                # Grid and flex layout, responsive breakpoints
│   ├── utils/
│   │   └── patientHelpers.js         # DOB parsing, chronological chart data, level helpers
│   ├── App.jsx                       # Root container, data fetching, loading & error states
│   └── main.jsx                      # Application entry point
├── index.html                        # HTML entry point with metadata
├── package.json                      # Dependencies and npm scripts
└── vite.config.js                    # Vite configuration with React plugin
```

---

## 🔌 API Integration

- **Endpoint**: `https://fedskillstest.coalitiontechnologies.workers.dev`
- **Authentication**: HTTP Basic Auth with base64-encoded credentials (`coalition:skills-test`)
- **Data Extraction**:
  - The API returns an array of patient records.
  - The application extracts the full list for the sidebar and filters for `Jessica Taylor` (`name === 'Jessica Taylor'`) to populate the central dashboard and profile cards.
  - `date_of_birth` returned in `MM/DD/YYYY` format is robustly parsed and displayed as readable strings (e.g., `August 23, 1996`).
  - Historical diagnosis records are chronologically ordered to present the last 6 months cleanly on the chart.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd asgn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite in the terminal).

### Production Build

Create an optimized production bundle:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

### Linting

Check code quality with Oxlint:
```bash
npm run lint
```

---

## 📐 Design Details & Accuracy Checklist

- [x] **Header**: Folded-cross Tech.Care logo, pill-shaped active state on "Patients", doctor profile avatar, practitioner role, and action buttons.
- [x] **Patients Sidebar**: Patient list with avatars, demographic info, three-dots action, and Jessica Taylor highlighted with soft mint background (`#D8FCF7`).
- [x] **Blood Pressure**: Lavender card (`#F4F0FE`), time range dropdown, smooth dual-line chart (Systolic: `#C26EB4` / `#E66FD2`, Diastolic: `#7E6CAB` / `#8C6FE6`), and color-coded status badges with directional arrows.
- [x] **Vital Signs**: Individual cards with light colored backgrounds, white circular illustration badges (Lungs, Thermometer, Heart Rate), large values, and level indicators.
- [x] **Diagnostic List**: Styled data table with rounded header (`#F6F7F8`), structured columns, and clean typography.
- [x] **Patient Profile**: Large circular profile picture, formatted date of birth, gender symbol, contact info, emergency contacts, insurance provider, and call-to-action button.
- [x] **Lab Results**: Dedicated card with scrollable list and download action buttons.
- [x] **Accessibility & Semantics**: Accessible landmark elements (`<header>`, `<main>`, `<aside>`, `<section>`), ARIA labels, semantic tables, and keyboard-navigable elements.
