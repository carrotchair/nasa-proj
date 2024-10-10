const express = require('express');
const app = express();
const getData = require('./app');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, NASA!');
});

app.get('/meteors', async (req, res) => {
  try {
    const meteorsData = await getData.getMeteorsData();
    const filteredMeteorsData = Object.values(meteorsData)
      .flat()
      .map((meteor) => {
        return {
          id: meteor.id,
          name: meteor.name,
          diameter_in_meters: meteor.estimated_diameter.meters,
          is_potentially_hazardous_meteor: meteor.is_potentially_hazardous_asteroid,
          close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
          relative_velocity_kilometers_per_second: meteor.close_approach_data[0].relative_velocity
              .kilometers_per_second
        };
      });

    res.json({
      message: 'Meteors observed from Monday to today',
      data: filteredMeteorsData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
