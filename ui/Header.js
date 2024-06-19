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
    <div className='h-20 flex flex-shrink-0 pl-20 space-x-2'>
            <Link href='/' className='flex h-full items-center w-2/3 text-2xl'>
                    Flora
                <div className='h-[65%] aspect-square relative mt-[-17px]'>
                    {plantIconSource && <Image src={plantIconSource} alt='plant' fill/>}
                </div>
                    Feed
        </Link>
        <div className='w-full justify-end flex space-x-20 pr-20'>
        <div className='h-full flex items-center justify-center'>
                <Link href='/'>
                    Home
                </Link>
            </div>
            <div className='h-full flex items-center justify-center'>
                <Link href='/dashboard'>
                    Dashboard
                </Link>
            </div>
            <div className='h-full flex items-center justify-center'>
                <Link href={"https://github.com/JackFord18/flora-feed"} target='_blank'>
                    Check out the GitHub!
                </Link>
            </div>
        </div>
        
    </div>
  )
}