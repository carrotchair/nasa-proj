import express from 'express';
import getMeteorFilteredData from '../use-cases/meteorDataCase.js';
import getMeteorData from '../repository/meteorClient.js';

const meteorRouter = express.Router();

meteorRouter.get('/', (req, res) => {
  res.send('Hello, NASA!');
});

meteorRouter.get('/meteors', async (req, res) => {
  try {
    const meteorData = await getMeteorData();
    res.json({
      message: 'Meteors observed from Monday to today',
      data: meteorData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

meteorRouter.get('/filter-meteors', async (req, res) => {
  try {
    const meteorFileteredData = await getMeteorFilteredData();
    res.json({
      message: 'Meteors observed from Monday to today',
      data: meteorFileteredData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default meteorRouter;