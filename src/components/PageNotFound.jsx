import React from 'react'
import page_not_found from '../assets/page_not_found.jpg'

function PageNotFound() {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-white'>
        <img src={page_not_found} className='w-full md:h-full md:w-auto lg:h-full z-40'  alt="" />
    </div>
  )
}

export default PageNotFound