/**
 * Formats a date string to a readable format.
 * Handles both MM/DD/YYYY (API format) and YYYY-MM-DD.
 * @param {string} dateStr - Date string from the API
 * @returns {string} Formatted date like "August 23, 1996"
 */
export function formatDateOfBirth(dateStr) {
  if (!dateStr) return 'N/A';

  let date;
  // API returns MM/DD/YYYY format (e.g. "08/23/1996")
  const slashParts = dateStr.split('/');
  if (slashParts.length === 3) {
    const [month, day, year] = slashParts;
    date = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    date = new Date(dateStr + 'T00:00:00');
  }

  if (isNaN(date.getTime())) return dateStr;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Gets the latest diagnosis history entry.
 * @param {Array} diagnosisHistory - Array of diagnosis entries
 * @returns {Object|null} The most recent entry
 */
export function getLatestDiagnosis(diagnosisHistory) {
  if (!diagnosisHistory || diagnosisHistory.length === 0) return null;
  return diagnosisHistory[0];
}

/**
 * Extracts blood pressure data for chart rendering.
 * Returns data in chronological order (oldest first).
 * @param {Array} diagnosisHistory - Array of diagnosis entries
 * @param {number} count - Number of months to show (default 6)
 * @returns {Object} { labels, systolic, diastolic }
 */
export function getBloodPressureChartData(diagnosisHistory, count = 6) {
  if (!diagnosisHistory || diagnosisHistory.length === 0) {
    return { labels: [], systolic: [], diastolic: [] };
  }

  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sort chronologically (oldest first)
  const sorted = [...diagnosisHistory].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  // Take the last 'count' entries
  const sliced = sorted.slice(-count);

  const labels = sliced.map(
    (entry) => `${entry.month.substring(0, 3)}, ${entry.year}`
  );
  const systolic = sliced.map(
    (entry) => entry.blood_pressure?.systolic?.value ?? null
  );
  const diastolic = sliced.map(
    (entry) => entry.blood_pressure?.diastolic?.value ?? null
  );

  return { labels, systolic, diastolic };
}

/**
 * Gets the level indicator arrow direction.
 * @param {string} level - Level string like "Higher than Average", "Lower than Average", "Normal"
 * @returns {'up' | 'down' | 'normal'}
 */
export function getLevelIndicator(level) {
  if (!level) return 'normal';
  const lower = level.toLowerCase();
  if (lower.includes('higher')) return 'up';
  if (lower.includes('lower')) return 'down';
  return 'normal';
}
