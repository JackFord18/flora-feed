'use client';
import MoistureGraph from '@/ui/MoistureGraph';
import React, { useEffect, useState } from 'react'

export default function DashboardPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/api/moistureReadings')
          .then(response => response.json())
          .then(data => {
            const processedData = data.map((item) => {
                return {moisture: item.soilMoisture, timestamp: item.timestamp};
              });
              setData(processedData);
            })
          .catch(error => console.error('Encountered an error while fetching soil moisture data:', error));
      }, []);
  return (
    <div className='flex my-2 md:my-5 justify-center'>
        <title>Flora Feed · Dashboard</title>
        <div className='w-full md:w-4/5 h-72 flex flex-col px-1 rounded-xl'>
            <p className='text-xl text-center'>
                Soil Moisture
            </p>
            <p className='text-center'>
                Soil moisture levels over the past 24 hours!
            </p>
            <div className='flex-1 touch-none'>
                <MoistureGraph maxSafeMoisture={90} minSafeMoisture={35} data={data}/>
            </div>
        </div>
    </div>
  )
}