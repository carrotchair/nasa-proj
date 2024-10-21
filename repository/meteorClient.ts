import axios from 'axios';
import https from 'https';
import config from '../config/config.ts';

interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
}

interface NASAApiResponse {
  near_earth_objects: Record<string, NearEarthObject[]>;
}

const nasaApiUrl: string = config.nasaMeteorUrl;

export function getCurrentDate(): string {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export function getLastMonday(): string {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const lastMonday = new Date(date.setDate(diff));
  return lastMonday.toISOString().split('T')[0];
}

async function getMeteorData(startDate: string, endDate: string): Promise<NearEarthObject[]> {
  const apiKey: string = config.apiKey;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await axios.get<NASAApiResponse>(nasaApiUrl, {
    params: {
      start_date: startDate,
      end_date: endDate,
      api_key: apiKey,
    },
    httpsAgent: httpsAgent,
  });

  return Object.values(response.data.near_earth_objects).flat();
}

export default getMeteorData;