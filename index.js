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

app.get('/meteors', async (req, res) => {
  try {
    const asteroidData = await fetchData.fetchAsteroidData();
    const filteredAsteroidData = Object.values(asteroidData)
      .flat()
      .map((asteroid) => {
        return {
          id: asteroid.id,
          name: asteroid.name,
          diameter_in_meters: asteroid.estimated_diameter.meters,
          is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
          close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
          relative_velocity_kilometers_per_second: asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_second
        };
      });

    // Send JSON response to the client
    res.json({
      message: 'Asteroids observed from Monday to today',
      data: filteredAsteroidData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
