import React from 'react'

export default function DatePicker({text, value, onChange, typeable}) {
  return (
    <div className='flex items-center max-w-96'>
        <div className='flex justify-start w-20'>
            <p className='text-sm text-gray-500'>{text}:</p>
        </div>
        <div className='justify-end'>
            <input type='datetime-local' className='w-60 bg-transparent border rounded-lg p-1 border-gray-400' value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    </div>
  )
}
