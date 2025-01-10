import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Menu({ isMenuOpened, setIsMenuOpened }) {
    return (
        <>
            <div className='h-screen w-full'>
                <div
                    className={`transform transition-transform duration-300 ${isMenuOpened ? 'translate-x-0' : '-translate-x-full'
                        } rounded-br-lg h-full w-[70%] md:w-full z-10 bg-black absolute border-zinc-400 px-3 py-4 md:p-3 md:py-4 lg:py-5`}
                >
                    <h1 className="text-xl md:text-2xl text-white cursor-pointer">
                        <i
                            onClick={() => setIsMenuOpened(false)}
                            className="mr-4 ri-menu-unfold-4-fill text-white text-xl md:text-2xl cursor-pointer"
                        ></i>
                        <i className="mr-1 text-[#A6E02B] hidden ri-movie-2-fill"></i>
                    </h1>
                    <h1 className="text-lg md:text-xl mt-5 text-white font-semibold md:mt-2 lg:mt-5 mb-3">
                        New Feeds
                    </h1>
                    <nav className="flex flex-col">
                        <Link to='/' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-home-4-fill"></i>
                            Home
                        </Link>
                        <Link to='/trending' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-fire-fill"></i>
                            Trending
                        </Link>
                        <Link to='/popular' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-bard-fill"></i>
                            Popular
                        </Link>
                        <Link to='/movies' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-movie-fill"></i>
                            Movies
                        </Link>
                        <Link to='/tv' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-tv-fill"></i>
                            TV Shows
                        </Link>
                        <Link to='/people' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-team-fill"></i>
                            People
                        </Link>
                    </nav>
                    <hr className="bg-white my-2" />
                    <h1 className="text-xl text-white mt-5 font-semibold md:mt-3 lg:mt-5 mb-3">Website Info</h1>
                    <nav className="flex flex-col">
                        <Link to='/about' className="text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-information-2-fill"></i>
                            About
                        </Link>
                        <Link to='/contact' className="mb-5 md:mb-0 text-zinc-300 text-lg md:text-xl py-2 md:py-3 pl-4 duration-300 hover:bg-[#A6E02B] rounded-md hover:text-[#002147] hover:font-semibold">
                            <i className="mr-1 ri-phone-fill"></i>
                            Contact Us
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Menu