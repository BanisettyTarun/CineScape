import React from 'react'
import LoadingGifPac from '../assets/LoadingGifPac.svg';
function Loading() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <img className='w-28  md:w-36' src={LoadingGifPac} alt="Loading" />
    </div>
  )
}

export default Loading