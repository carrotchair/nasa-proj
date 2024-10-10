import express from 'express';
import meteorRouter from './delivery/meteorController.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(meteorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
