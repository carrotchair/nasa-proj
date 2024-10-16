import axios from 'axios';
import https from 'https';
import config from '../config/config.js';

const nasaRoverUrl = config.nasaRoverUrl;

const getRoverPhotos = async (apiKey) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await axios.get(nasaRoverUrl, {
    params: {
      api_key: apiKey,
      sol: config.sol,
    },
    httpsAgent: httpsAgent,
  });

  return response.data;
};

export default getRoverPhotos;
