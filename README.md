# Welcome to the Flora Feed GitHub!
Flora Feed is the front-end component to a hobby project of mine created with the goal of helping me efficiently water my plants. At the moment, the project is just set up to monitor my basil plant but I would like to expand it to many more of my plants in the future!

Head over to the website [here](https://www.florafeed.jackford.tech/) to check out this code in action and read about end-to-end implementation details, or read on to learn more about the details of this specific repo!

## How does this project work?
Flora Feed is a mobile-first responsive Next.js app that uses Tailwind CSS for styling, manually hosted on a DigitalOcean droplet! To retrieve the displayed soil moisture data, Flora Feed communicates with a [Java/Spring Boot backend](https://github.com/JackFord18/water-watcher). To support SSL, this repo includes a configured Nginx reverse proxy. 

To enhance portability and ease of deployment, the Next.js app and Nginx reverse proxy are both individually dockerized into separate containers and collectively managed using Docker Compose.