import axios from 'axios';
import https from 'https';

const nasaApiUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

function getLastMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const lastMonday = new Date(date.setDate(diff));
  return lastMonday.toISOString().split('T')[0];
}

async function getMeteorData() {
  try {
    const apiKey = process.env.NASA_API_KEY;
    const startDate = getLastMonday();
    const endDate = getCurrentDate();

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios.get(nasaApiUrl, {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: apiKey,
      },
      httpsAgent: httpsAgent,
    });

    return response.data.near_earth_objects;
  } catch (error) {
    throw new Error(`Error getting meteors data: ${error.message}`);
  }
}

export default getMeteorData;
