import getRoverPhotos from '../repository/roverClient.ts';
import config from '../config/config.ts';
import { StatusCodes } from 'http-status-codes';
import Exception from '../error_handler/Exception.ts';

interface RoverPhoto {
  sol: number;
  img_src: string;
}

interface RoverPhotosResponse {
  latest_photos: RoverPhoto[];
}

const getLatestRoverPhoto = async (apiKey: string): Promise<string> => {
  const roverPhotos: RoverPhotosResponse = await getRoverPhotos(apiKey);

  if (roverPhotos.latest_photos.length === 0) {
    throw new Exception(
      StatusCodes.NOT_FOUND,
      'No images found for the specified sol'
    );
  }

  const latestPhoto = roverPhotos.latest_photos.find(
    (photo) => photo.sol === config.sol
  );

  if (!latestPhoto) {
    throw new Exception(
      StatusCodes.NOT_FOUND,
      `No images found for sol ${config.sol}`
    );
  }

  return latestPhoto.img_src;
};

export default getLatestRoverPhoto;
