import express from 'express';
import getMeteorFilteredData from '../use-cases/meteorDataCase.js';
import getMeteorData from '../repository/meteorClient.js';
import { getLastMonday, getCurrentDate } from '../repository/meteorClient.js';

const meteorRouter = express.Router();

meteorRouter.get('/', (req, res) => {
  res.send('Hello, NASA!');
});

meteorRouter.get('/meteors', async (req, res) => {
  try {
    let { startDate, endDate, count, wereDangerousMeteors} = req.query;
    ({ startDate, endDate } = setDefaultDates(startDate, endDate));

    const meteorFileteredData = await getMeteorFilteredData(startDate, endDate, Boolean(count), Boolean(wereDangerousMeteors));
    res.json({
      message: `Meteors observed from ${startDate} to ${endDate}`,
      data: meteorFileteredData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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