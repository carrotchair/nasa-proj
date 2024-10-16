import axios from 'axios';
import https from 'https';
import config from '../config/config.js';

const nasaApiUrl = config.nasaMeteorUrl;

export function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export function getLastMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const lastMonday = new Date(date.setDate(diff));
  return lastMonday.toISOString().split('T')[0];
}

async function getMeteorData(startDate, endDate) {
  const apiKey = config.apieKey;

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
}

export default getMeteorData;
