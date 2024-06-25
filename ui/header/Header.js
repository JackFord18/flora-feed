'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import HeaderButton from './HeaderButton';

export default function Header({title}) {
    const [plantIconSource, setPlantIconSource] = useState();
    const [selectedTab, setSelectedTab] = useState("Home");

    const headerButtons = [
        {
            content: "Home",
            link: "/"
        },
        {
            content: "Dashboard",
            link: "/dashboard"
        },
        {
            content: "GitHub",
            link: "https://github.com/JackFord18/flora-feed",
            newTab: true
        }
    ]

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
            {headerButtons.map(button => 
                <HeaderButton 
                    content={button.content} 
                    link={button.link} 
                    newTab={button.newTab}
                    selected={selectedTab === button.content} 
                    onClick={(content) => setSelectedTab(content)}
                />)
            }
        </div>
        
    </div>
  )
}