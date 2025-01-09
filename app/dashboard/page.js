'use client';
import MoistureGraph from '@/ui/MoistureGraph';
import DateTimePicker from '@/ui/form/DateTimePicker';
import { isValidDateTime, getRepairedDateTimeString, parseDateTimeString, parseDateTimeStringAsISO } from '@/utils/dateUtils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const pathname = usePathname();

  const parseDateTimeParam = (param) => {
    const paramString = getRepairedDateTimeString(param);
    const parsedDateTimeIsValid = isValidDateTime(paramString);
    return parsedDateTimeIsValid? new Date(paramString) : null;
  }

  const getInitialDateTimeString = (paramName, daysBack) => {
    const initialDateTimeParamString = parseDateTimeParam(searchParams.get(paramName));
    const initialDateTime = new Date();
    initialDateTime.setDate(initialDateTime.getDate() - daysBack);

    return parseDateTimeString(initialDateTimeParamString ? initialDateTimeParamString : initialDateTime);
  }
  
  const [startDateTime, setStartDateTime] = useState(() => getInitialDateTimeString('startDateTime', 1));
  const [endDateTime, setEndDateTime] = useState(() => getInitialDateTimeString('endDateTime', 0));
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState();


  const syncQueryParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("startDateTime", startDateTime);
    params.set("endDateTime", endDateTime);
    
    let paramsString = params.toString();
    router.push(`${pathname}?${paramsString}`);
  }

  useEffect(() => {
    syncQueryParams();
  }, [startDateTime, endDateTime]);

  useEffect(() => {
      fetch('/api/moistureReadings?'+ new URLSearchParams({
        startTime: parseDateTimeStringAsISO(new Date(startDateTime)),
        endTime: parseDateTimeStringAsISO(new Date(endDateTime)),
    }).toString())
        .then(response => response.json())
        .then(data => {
          const processedData = data.map((item) => {
              return {moisture: item.soilMoisture, timestamp: item.timestamp};
            });
            setData(processedData);
          })
        .catch(error => console.error('Encountered an error while fetching soil moisture data:', error));
    }, [startDateTime, endDateTime]);

  useEffect(() => {
    fetch('/api/latestPlantImage')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      })
      .catch(error => console.error('Encountered an error while fetching the latest plant picture:', error));
  }, []);

  const getMinEndDate = (startDate) => {
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);
    return parseDateTimeString(minEndDate);
  }

  return (
    <div className='flex my-2 justify-center'>
        <title>Flora Feed · Dashboard</title>
        <div className='w-full md:w-4/5 flex flex-col px-1 rounded-xl'>
          <p className='text-xl text-center'>
              Soil Moisture
          </p>
          <p className='text-center'>
              Soil moisture levels over the past 24 hours!
          </p>
          <div className='mb-4'>
            <div className='h-72 touch-none'>
              <MoistureGraph maxSafeMoisture={90} minSafeMoisture={15} data={data}/>
          </div>
          <div className='flex flex-col md:flex-row md:justify-center items-center md:space-x-7 space-y-2 md:space-y-0'>
            <DateTimePicker text='Start Date' value={startDateTime} onChange={setStartDateTime} typeable={false}/>
            <DateTimePicker text='End Date' value={endDateTime} min={getMinEndDate(startDateTime)} onChange={setEndDateTime} typeable={false}/>
          </div>
        </div>
        <div className='flex justify-center align-middle'>
            {
              imageUrl && 
              <div className='relative w-11/12 md:w-1/2 aspect-video rounded-lg overflow-hidden'>
                <Image
                  src={imageUrl}
                  layout="fill"
                  objectFit='contain'
                />
              </div>
            }
        </div>
      </div>
    </div>
  )
}