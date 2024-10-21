import express, { Request, Response, NextFunction } from 'express';
import getMeteorFilteredData from '../use-cases/meteorDataCase.ts';
import { getLastMonday, getCurrentDate } from '../repository/meteorClient.ts';
import getLatestRoverPhoto from '../use-cases/roverCase.ts';
import { validateMeteorQuerySchema, validateRangePhotoQuerySchema } from '../schemas/validateQuery.ts';

interface MeteorQueryParams {
  startDate?: string;
  endDate?: string;
  count?: boolean;
  wereDangerousMeteors?: boolean;
}

interface RoverRequestBody {
  userId: string;
  userName: string;
  apiKey: string;
}

const meteorRouter = express.Router();

meteorRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello, NASA!');
});

meteorRouter.get(
  '/meteors',
  validateMeteorQuerySchema,
  async (req: Request<unknown, unknown, unknown, MeteorQueryParams>, res: Response, next: NextFunction) => {
    try {
      let { startDate, endDate, count, wereDangerousMeteors } = req.query;
      ({ startDate, endDate } = setDefaultDates(startDate, endDate));

      const meteorFilteredData = await getMeteorFilteredData(startDate, endDate, Boolean(count), Boolean(wereDangerousMeteors));

      res.render('../views/meteors.njk', {
        message: `Meteors observed from ${startDate} to ${endDate}`,
        meteorData: meteorFilteredData.meteorData,
        wereDangerousMeteors: meteorFilteredData.wereDangerousMeteors,
        count: meteorFilteredData.count,
      });
    } catch (error) {
      next(error);
    }
  }
);

meteorRouter.get('/rover-form', (req: Request, res: Response) => {
  res.render('../views/roverForm.njk', {
    title: 'Rover Photo Request',
  });
});

meteorRouter.post(
  '/rover-image',
  validateRangePhotoQuerySchema,
  async (req: Request<unknown, unknown, RoverRequestBody>, res: Response, next: NextFunction) => {
    try {
      const { userId, userName, apiKey } = req.body;
      const photo = await getLatestRoverPhoto(apiKey);

      res.render('../views/roverPhoto.njk', {
        message: `Hey ${userName}. Your id is: ${userId}.`,
        userId: Number(userId),
        userName: userName,
        photoUrl: photo,
      });
    } catch (error) {
      next(error);
    }
  }
);

const setDefaultDates = (startDate?: string, endDate?: string): { startDate: string; endDate: string } => {
  if (!startDate) {
    startDate = getLastMonday();
  }
  if (!endDate) {
    endDate = getCurrentDate();
  }
  return { startDate, endDate };
};

export default meteorRouter;