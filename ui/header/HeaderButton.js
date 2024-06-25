import Link from 'next/link';
import React from 'react'

export default function HeaderButton({content, link, newTab, selected, onClick}) {

  return (
    <div 
        className={
            `h-full flex flex-1 items-center justify-center text-center md:w-fit md:flex-none 
            ${selected && !newTab && 'border-solid border-b-2 border-green-500 md:text-green-600'}`
        }
    >
        <Link 
            href={link} 
            target={`${newTab ? '_blank' : '_self'}`}
            onClick={() => !newTab && onClick(content)} 
        >
            {content}
        </Link>
    </div>
  )
}
