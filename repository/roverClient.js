import axios from 'axios';
import https from 'https';
import config from '../config/config.js';

const nasaRoverUrl = config.nasaRoverUrl;

const getRoverPhotos = async (apiKey) => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios.get(nasaRoverUrl, {
        params: {
          api_key: apiKey,
          sol: config.sol
        },
      httpsAgent: httpsAgent,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error getting photos: ${error.message}`);
  }
}

export default getRoverPhotos;
