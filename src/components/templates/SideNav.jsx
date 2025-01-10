import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden md:px-6 md:py-5 p-3 flex w-full">
        <i
          className="ri-menu-line text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
        <h1 className="text-2xl w-[85%] md:w-[90%] flex justify-center items-center md:text-3xl text-white cursor-pointer">
          <i className="mr-1 text-[#A6E02B] ri-movie-2-fill"></i>
          <span className="font-bold">CineScape</span>
        </h1>
      </div>
      <hr className="mb-1 md:mb-0 w-full bg-transparent lg:hidden" />
      <div
        className={`lg:translate-x-0 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } rounded-br-lg lg:rounded-none lg:block h-full lg:h-screen w-[70%] md:w-[40%] z-10 lg:w-[20%] bg-black lg:bg-[#002147] absolute lg:static lg:border-0 lg:border-r-2 border-zinc-400 md:px-6 p-3 md:py-5`}
      >
        <h1 className="text-xl md:text-2xl text-white cursor-pointer">
          <i
            onClick={() => setIsOpen(!isOpen)}
            className="mr-4 lg:hidden ri-menu-unfold-4-fill text-white text-2xl cursor-pointer"
          ></i>
          <Link to='/' >
          <i className="mr-1 text-[#A6E02B] hidden lg:inline-block ri-movie-2-fill"></i>
          <span className="font-bold lg:inline-block hidden">CineScape</span>
          </Link>
        </h1>
        <h1 className="text-lg md:text-xl text-white font-semibold mt-5 mb-3">
          New Feeds
        </h1>
        <nav className="flex flex-col">
          <Link to='/trending' className="text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-fire-fill"></i>
            Trending
          </Link>
          <Link to='/popular' className="text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-bard-fill"></i>
            Popular
          </Link>
          <Link to='/movies' className="text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-movie-fill"></i>
            Movies
          </Link>
          <Link to='/tv' className="text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-tv-fill"></i>
            TV Shows
          </Link>
          <Link to='/people' className="text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-team-fill"></i>
            People
          </Link>
        </nav>
        <hr className="bg-white my-2" />
        <h1 className="text-xl text-white font-semibold mt-5 mb-3">Website Info</h1>
        <nav className="flex flex-col">
          <Link to='/about' className="text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-information-2-fill"></i>
            About
          </Link>
          <Link to='/contact' className="mb-5 md:mb-0 text-zinc-300 text-lg md:text-xl py-2 md:py-4 lg:py-5 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
            <i className="mr-1 ri-phone-fill"></i>
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}

export default SideNav;
