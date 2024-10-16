import express from 'express';
import meteorRouter from './delivery/meteorController.js';
import config from './config/config.js';
import nunjucks from 'nunjucks';

const app = express();
const PORT = config.port;
app.use(express.json())

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'njk');
app.use(meteorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
