require('dotenv').config();

const getMoistureReadings = async (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const waterWatcherApiUrl = `${process.env.WATER_WATCHER_BASE_URL}/moisturereadings?starttime=${req.query.startTime}&endtime=${req.query.endTime}`;
  const response = await fetch(waterWatcherApiUrl, {
    method: 'GET',
    headers: {
        'auth-token': `${process.env.WATER_WATCHER_AUTH_TOKEN}`
    }
  });

  const data = await response.json();
  res.json(data);
};

export default getMoistureReadings;