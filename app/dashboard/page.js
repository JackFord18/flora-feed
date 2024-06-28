'use client';
import MoistureGraph from '@/ui/MoistureGraph';
import DatePicker from '@/ui/form/DatePicker';
import { parseDateString, parseDateStringAsISO } from '@/utils/dateUtils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const pathname = usePathname();

    const syncQueryParams = () => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("startTime", startDate)
      params.set("endTime", endDate)
      
      let paramsString = params.toString();
      router.push(`${pathname}?${paramsString}`);
    }

    // const syncStartQueryParams = () => {
    //   const params = new URLSearchParams(searchParams.toString())
    //   params.set("startTime", startDate);
      
    //   let paramsString = params.toString();
    //   console.log(`Setting start with ${pathname}?${paramsString}`);
    //   router.push(`${pathname}?${paramsString}`);
    // }

    // const syncEndQueryParams = () => {
    //   const params = new URLSearchParams(searchParams.toString())
    //   params.set("endTime", endDate);
      
    //   let paramsString = params.toString();
    //   console.log(`Setting end with ${pathname}?${paramsString}`);
    //   router.push(`${pathname}?${paramsString}`);
    // }

    const parseDateParam = (param) => {
      let paramString = param;
      try{
        if(!param?.includes("T")){
          paramString = paramString + "T00:00";
        }
        return !isNaN(Date.parse(paramString)) ? new Date(paramString) : null;
      } catch (exception) {
        console.log("Exception", exception);
        return null;
      }
    }

    const getInitialParsedStartDateString = () => {
      console.log(searchParams.get('startTime'));
      const startDateParamString = parseDateParam(searchParams.get('startTime'));
      console.log(startDateParamString);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);

      return parseDateString(startDateParamString ? startDateParamString : startDate);
    }
    const getInitialParsedEndDateString = () => {
      const endDateParam = parseDateParam(searchParams.get('endTime'));
      return parseDateString(endDateParam ? new Date(endDateParam) : new Date());
  }
    
    const [startDate, setStartDate] = useState(getInitialParsedStartDateString);
    const [endDate, setEndDate] = useState(getInitialParsedEndDateString);
    const [data, setData] = useState([]);


    useEffect(() => {
      syncQueryParams();
    }, [startDate, endDate]);
    // useEffect(() => {
    //   syncStartQueryParams();
    // }, [startDate]);
    // useEffect(() => {
    //   syncEndQueryParams();
    // }, [endDate]);

    console.log(startDate, endDate);
    useEffect(() => {
        fetch('/api/moistureReadings?'+ new URLSearchParams({
          startTime: parseDateStringAsISO(new Date(startDate)),
          endTime: parseDateStringAsISO(new Date(endDate)),
      }).toString())
          .then(response => response.json())
          .then(data => {
            const processedData = data.map((item) => {
                return {moisture: item.soilMoisture, timestamp: item.timestamp};
              });
              setData(processedData);
            })
          .catch(error => console.error('Encountered an error while fetching soil moisture data:', error));
      }, [startDate, endDate]);
  return (
    <div className='flex my-2 md:my-5 justify-center'>
        <title>Flora Feed · Dashboard</title>
        <div className='w-full md:w-4/5 flex flex-col px-1 rounded-xl'>
            <p className='text-xl text-center'>
                Soil Moisture
            </p>
            <p className='text-center'>
                Soil moisture levels over the past 24 hours!
            </p>
            <div className='h-72 touch-none'>
                <MoistureGraph maxSafeMoisture={90} minSafeMoisture={35} data={data}/>
            </div>
        <div className='flex flex-col md:flex-row md:justify-center items-center md:space-x-7 space-y-2 md:space-y-0 md:my-4'>
          <DatePicker text='Start Date' value={startDate} onChange={setStartDate} typeable={false}/>
          <DatePicker text='End Date' value={endDate} onChange={setEndDate} typeable={false}/>
        </div>
      </div>
    </div>
  )
}