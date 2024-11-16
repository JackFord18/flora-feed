require('dotenv').config();

const getLatestPlantImage = async (req, res) => {
  const plantPixApiUrl = `${process.env.PLANT_PIX_API_BASE_URL}/latestimage`;
  fetch(plantPixApiUrl, {
    method: 'GET',
    headers: {
        'auth-token': `${process.env.PLANT_PIX_AUTH_TOKEN}`
    }
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error(`Error encountered while retrieving latest plant image! status: ${response.status}`);
    }
    let blob = await response.blob();
    return blob;
  })
  .then(blob => blob.arrayBuffer())
  .then(arrayBuffer => {
    let buffer = Buffer.from(arrayBuffer);
    res.setHeader('Content-Type', 'image/jpeg');
    res
      .status(200)
      .send(buffer);
  })
};

export default getLatestPlantImage;