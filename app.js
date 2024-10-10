const axios = require('axios');
const https = require('https');
require('dotenv').config();

// NASA API endpoint for Near Earth Object (NEO) data
const nasaApiUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

// Function to get the date of the past Monday
function getLastMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const lastMonday = new Date(date.setDate(diff));
  return lastMonday.toISOString().split('T')[0];
}

// Function to fetch asteroid data from NASA API
async function fetchAsteroidData() {
  try {
    const apiKey = process.env.NASA_API_KEY; // Get NASA API key from environment variables
    const startDate = getLastMonday(); // Get the date of the past Monday
    const endDate = getCurrentDate(); // Get today's date

    // Create an HTTPS agent that skips SSL certificate validation
    const httpsAgent = new https.Agent({  
        rejectUnauthorized: false
    });

    const response = await axios.get(nasaApiUrl, {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: apiKey,
      },
      httpsAgent: httpsAgent // Use the custom https agent to bypass SSL validation
    });

    // Return the asteroid data
    return response.data.near_earth_objects;
  } catch (error) {
    throw new Error(`Error fetching asteroid data: ${error.message}`);
  }
}

module.exports = { fetchAsteroidData };