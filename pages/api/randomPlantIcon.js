const fs = require('fs');

const getRandomPlantIcon = async (req, res) => {
    const plantIconPaths = [];
    let plantIconFiles = fs.readdirSync('public/plantIcons/');

    plantIconFiles.forEach((file) => {
        plantIconPaths.push(`/plantIcons/${file}`);
    });

    const randomIndex = Math.floor(Math.random()*plantIconPaths.length);
    const randomIconPath = plantIconPaths[randomIndex];

    res.status(200)
        .setHeader('content-type', 'text/plain')
        .send(randomIconPath);
}

export default getRandomPlantIcon;