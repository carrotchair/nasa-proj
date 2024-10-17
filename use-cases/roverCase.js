import getRoverPhotos from '../repository/roverClient.js';
import config from '../config/config.js';
import { StatusCodes } from 'http-status-codes';
import Exception from '../error_handler/Exception.js';


const getLatestRoverPhoto = async (apiKey) => {
  const roverPhotos = await getRoverPhotos(apiKey);

  if (roverPhotos.length === 0) {
    throw new Exception(
      StatusCodes.NOT_FOUND,
      'No images found for the specified sol'
    )
  }
  return roverPhotos.latest_photos.find((photo) => photo.sol === config.sol).img_src
};

export default getLatestRoverPhoto;