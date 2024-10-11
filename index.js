import express from 'express';
import meteorRouter from './delivery/meteorController.js';
import config from './config/config.js';

const app = express();
const PORT = config.port;

app.use(meteorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
