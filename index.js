const express = require('express');
const app = express();
const fetchData = require('./app');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, NASA!');
});

// Create an endpoint to serve asteroid data
app.get('/asteroids', async (req, res) => {
  try {
    const asteroidData = await fetchData.fetchAsteroidData();

    // Send JSON response to the client
    res.json({
      message: 'Asteroids observed from Monday to today',
      data: asteroidData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

