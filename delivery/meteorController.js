import express from 'express';
import getMeteorFilteredData from '../use-cases/meteorDataCase.js';
import { getLastMonday, getCurrentDate } from '../repository/meteorClient.js';
import getLatestRoverPhoto from '../use-cases/roverCase.js';
import { meteorQuerySchema } from '../schemas/meteorSchema.js';
import { rangePhotoQuerySchema } from '../schemas/rangePhotoSchema.js';

const meteorRouter = express.Router();

meteorRouter.get('/', (req, res) => {
  res.send('Hello, NASA!');
});

meteorRouter.get('/meteors', async (req, res, next) => {
  const { error } = meteorQuerySchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    let { startDate, endDate, count, wereDangerousMeteors} = req.query;
    ({ startDate, endDate } = setDefaultDates(startDate, endDate));

    const meteorFileteredData = await getMeteorFilteredData(startDate, endDate, Boolean(count), Boolean(wereDangerousMeteors));

    res.render('../views/meteors.njk', {
      message: `Meteors observed from ${startDate} to ${endDate}`,
      meteorData: meteorFileteredData.meteorData,
      wereDangerousMeteors: meteorFileteredData.wereDangerousMeteors,
      count: meteorFileteredData.count
    });
  } catch (error) {
    next(error);
  }
});

meteorRouter.post('/rover-image', async (req, res, next) => {
  const { error } = rangePhotoQuerySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

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
});

const setDefaultDates = (startDate, endDate) => {
  if (!startDate) {
    startDate = getLastMonday();
  }
  if (!endDate) {
    endDate = getCurrentDate();
  }
  return { startDate, endDate };
}

export default meteorRouter;