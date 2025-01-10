import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Trailer from '../Trailer';   
import MovieDetails from '../MovieDetails';
import TVShowDetails from '../TVShowDetails';
function Header({ wallpaper, option }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.4), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="w-full text-white h-[40vh] md:h-[70vh] flex flex-col justify-end items-start px-1 pb-2 md:pl-5 md:pb-5 lg:pl-10 lg:pb-20"
    >
      <h1 className="font-bold w-full md:w-3/4 text-lg md:text-4xl mb-1 md:mb-4">
        {wallpaper.name || wallpaper.title || wallpaper.original_title || wallpaper.original_name}
      </h1>
      <p className="hidden md:block w-[70%] lg:w-[50%] text-sm md:text-base mb-2">
        {wallpaper.overview.slice(0, 200)}...
        <Link
          to={`/${wallpaper.media_type || option}/details/${wallpaper.id}`}
          className="text-blue-400 hover:underline"
        >
          more
        </Link>
      </p>
      <p className="block md:hidden w-full text-sm md:text-base mb-2">
        {wallpaper.overview.slice(0, 100)}...
        <Link
          to={`/${wallpaper.media_type || option}/details/${wallpaper.id}`}
          className="text-blue-400 hover:underline"
        >
          more
        </Link>
      </p>
      <div className="w-full pb-2 flex justify-between items-center text-sm">
        <div className="w-fit">
          {wallpaper.release_date && <i className="ri-megaphone-fill mr-1 text-yellow-500"></i>}
          {wallpaper.release_date}
          <i
            className={`${
              wallpaper.release_date && 'ml-3'
            } mr-1 ri-vidicon-2-fill text-yellow-500`}
          ></i>
          {wallpaper.media_type.toUpperCase()}
        </div>
        <Link
          to={`/${wallpaper.media_type}/details/${wallpaper.id}/trailer`}
          className="justify-self-end mt-1 inline-block w-fit md:hidden text-sm  md:mt-3 transition-transform duration-300 hover:scale-105 bg-[#A6E02C] text-[#002147] rounded-md font-semibold px-2 py-1 md:px-3 md:py-2"
        >
          Watch Trailer
        </Link>
      </div>
      <Link
        to={`/${wallpaper.media_type}/details/${wallpaper.id}/trailer`}
        className="mt-1 hidden md:block text-sm lg:mt-3 transition-transform duration-300 hover:scale-105 bg-[#A6E02C] text-[#002147] rounded-md font-semibold px-2 py-1 md:px-3 md:py-2"
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
