const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const USERNAME = 'coalition';
const PASSWORD = 'skills-test';

/**
 * Fetches all patients from the Coalition Technologies API.
 * Uses Basic Auth as documented.
 * @returns {Promise<Array>} Array of patient objects
 */
export async function fetchPatients() {
  const encodedCredentials = btoa(`${USERNAME}:${PASSWORD}`);

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.error_message || `HTTP error ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Unexpected API response format');
  }

  return data;
}

/**
 * Fetches patient data and filters for Jessica Taylor specifically.
 * @returns {Promise<Object>} Jessica Taylor's patient record
 */
export async function fetchJessicaTaylor() {
  const patients = await fetchPatients();
  const jessica = patients.find(
    (patient) => patient.name === 'Jessica Taylor'
  );

  if (!jessica) {
    throw new Error('Patient "Jessica Taylor" not found in API response');
  }

  return jessica;
}
