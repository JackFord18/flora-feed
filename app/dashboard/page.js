'use client';
import MoistureGraph from '@/ui/MoistureGraph';
import React, { useEffect, useState } from 'react'

export default function page() {
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
    <div className='h-full flex flex-1 justify-center'>
        <div className='w-2/3 h-2/3 flex flex-col bg-slate-100 p-10 rounded-xl'>
            <p className='text-2xl text-center'>
                Soil Moisture
            </p>
            <p className='text-center'>
                Soil moisture levels over the past 24 hours!
            </p>
            <div className='flex-1'>
                <MoistureGraph maxSafeMoisture={90} minSafeMoisture={35} data={data}/>
            </div>
        </div>
    </div>
  )
}