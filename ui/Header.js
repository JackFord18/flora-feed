import React from 'react'

export default function Header({title}) {
  return (
    <div className='h-20 flex'>
        <div className='h-full w-2/3 flex items-center pl-20'>
            <p className='text-2xl'>
                Flora Feed
            </p>
        </div>
        <div className='w-full justify-end flex space-x-20 pr-20'>
            <div className='h-full flex items-center justify-center'>
                <a href={"https://github.com/JackFord18/flora-feed"} target='_blank'>
                    Check out the GitHub!
                </a>
            </div>
        </div>
        
    </div>
  )
}