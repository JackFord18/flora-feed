require('dotenv').config();

const getMoistureReadings = async (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const yesterdayString = yesterday.toISOString().slice(0,-1);
  const rightNowString = new Date().toISOString().slice(0,-1);

  const url = `${process.env.WATER_WATCHER_BASE_URL}/moisturereadings?starttime=${yesterdayString}&endtime=${rightNowString}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
        'auth-token': `${process.env.WATER_WATCHER_AUTH_TOKEN}`
    }
  });

  const data = await response.json();
  res.json(data);
};

export default getMoistureReadings;