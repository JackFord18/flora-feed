import React, {Suspense} from 'react'

export default function layout({children}) {
  return (
    <div className='h-full'>
      <Suspense>
        {children}
      </Suspense>
    </div>
  )
}