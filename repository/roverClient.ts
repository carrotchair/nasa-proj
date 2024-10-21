import axios from 'axios';
import https from 'https';
import config from '../config/config.ts';

interface RoverPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

interface RoverApiResponse {
  photos: RoverPhoto[];
}

const nasaRoverUrl: string = config.nasaRoverUrl;

const getRoverPhotos = async (apiKey: string): Promise<RoverApiResponse> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await axios.get<RoverApiResponse>(nasaRoverUrl, {
    params: {
      api_key: apiKey,
      sol: config.sol,
    },
    httpsAgent: httpsAgent,
  });

  return response.data;
};

export default getRoverPhotos;
