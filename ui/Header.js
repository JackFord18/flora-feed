'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

export default function Header({title}) {
    const [plantIconSource, setPlantIconSource] = useState();

    useEffect(() => {
        async function fetchPlantIcon() {
            fetch('/api/randomPlantIcon')
            .then(response => response.text())
            .then(iconSource => {setPlantIconSource(iconSource)})
            .catch(error => console.error('Encountered an error while fetching a random plant icon path:', error));
        }
        fetchPlantIcon();
    }, []);

  return (
    <div className='border-solid border-b-2 sticky top-0 bg-white z-10 md:flex md:h-16 md:w-full md:pt-0 md:px-10'>
        <div className='h-9 flex justify-center pt-1 md:h-full md:pt-1'>
            <Link href='/' className='flex justify-center items-center text-2xl'>
                Flora
                <div className='h-2/3 md:h-1/2 aspect-square relative'>
                    {plantIconSource && <Image src={plantIconSource} alt='plant' fill/>}
                </div>
                Feed
            </Link>
        </div>
        <div className='flex h-10 md:flex-1 md:justify-end md:items-center md:h-full md:space-x-24'>
            <Link href='/' className='flex flex-1 items-center justify-center text-center md:w-fit md:flex-none'>
                Home
            </Link>
            <Link href='/dashboard' className='flex flex-1 items-center justify-center text-center md:w-fit md:flex-none'>
                Dashboard
            </Link>
            <Link href={"https://github.com/JackFord18/flora-feed"} target='_blank' className='flex flex-1 items-center justify-center text-center md:w-fit md:flex-none'>
                GitHub
            </Link>
        </div>
        
    </div>
  )
}