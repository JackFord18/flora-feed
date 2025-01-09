import Image from "next/image";
import fullSetup from "../public/setupImages/full_setup.jpg";


export default function Home() {
  return (
    <div className="my-2 md:my-5">
      <title>Flora Feed · Home</title>
      <div className="flex flex-1 space-x-10 mx-10">
        <div className="px-5 space-y-10 rounded-xl h-fit md:basis-2/3">
          <div>
            <h1 className="text-xl text-center">
              Welcome to Flora Feed!
            </h1>
            <p>
              Flora Feed is a project that combines two of my passions, nature and technology, to make life a little bit easier! With Flora Feed, I can remotely 
              check my <a className="text-green-600 underline" href="https://en.wikipedia.org/wiki/Callisia_gentlei" target="_blank">Callisia gentlei var. elegans</a> plant&apos;s 
              moisture levels to determine whether or not it needs to be watered soon, and check on images of it throughout the day! I love applying technical solutions to practical 
              problems, so this has been super fun to develop so far! Keep reading to learn about how this project works under the hood  
              or <a className="text-green-600 underline" href="/dashboard">check out the dashboard</a> to see the live moisture levels and an hourly image of my plant!
              
            </p>
            <div className="rounded-xl flex-shrink-0 mt-3 overflow-hidden aspect-[3/4] relative z-0 md:hidden">
              <Image 
                src={fullSetup} fill objectFit="cover"
                alt={"A Raspberry Pi 4 Model B wired via a breadboard to a capacitive moisture sensor stuck in a Callisia gentlei var. elegans plant's soil"}
              />
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <h1 className="text-xl text-center">
                How does this project work?
              </h1>
              <p>
                Flora Feed can be broken down into a few different main components- software, hardware, and infrastructure. 
                Let&apos;s dive in!
              </p>
            </div>
            <div>
              <h2 className="text-xl">
                Hardware
              </h2>
              <p>
                Being a software engineer, I don&apos;t get to interact with hardware during my regular work as much as I 
                would like to, so this project was a great opportunity for me to branch out and explore this other side of 
                the tech world! The setup for this project is a bit rudimentary, but it gets the job done. I am using an 
                old Raspberry Pi 4 Model B that I&apos;ve had sitting around and I wired it up to a capacitive moisture 
                sensor via a breadboard.
              </p>
            </div>
            <div>
              <h2 className="text-xl">
                Software
              </h2>
              <p>
                To make this project possible, I wrote a Python script that reads data from the moisture sensor and takes 
                a picture with the camera mentioned above at the top of every hour (via a scheduled cron job). These are 
                then both sent via HTTP POST requests to their respective Java (Spring Boot) based microservices, which 
                authenticate the requests using API keys and then, upon successful authentication, persist the moisture 
                reading data in a MySQL database and the photo to AWS S3 storage.
                <br/><br/>
                The front-end (what you are looking at right now) is built using Next.js and Tailwind 
                CSS in conjunction with NGINX and Docker! To retrieve the data to be displayed, it makes HTTP GET requests to endpoints 
                on the backend. Once it has the data, it does a bit of manipulation wherever necessary and then visualizes it!
                <br/><br/>
                I am using a microservice-focused architecture to enable scalability, optimization, and fault tolerance on 
                this project as it expands. This will also help me easily swap out service implementations whenever needed.
              </p>
            </div>
            <div>
              <h2 className="text-xl">
                Infrastructure
              </h2>
              <p>
                To really bring this project to life, I wanted to make this project available to the public! The frontend, backend, 
                and database are all hosted on a DigitalOcean droplet, though I hope to separate these out in more efficient ways 
                in the future!
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:rounded-xl md:flex-shrink-0 md:overflow-hidden md:aspect-[3/4] md:relative md:block md:h-fit md:basis-1/3">
            <Image 
              src={fullSetup} fill 
              alt={"A Raspberry Pi 4 Model B wired via a breadboard to a capacitive moisture sensor stuck in a basil plant's soil"}
            />
        </div>
      </div>
    </div>
  );
}

