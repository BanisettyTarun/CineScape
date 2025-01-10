import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./templates/Menu";

const About = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="h-screen relative overflow-y-auto bg-[#002147] text-white p-3"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}>
      <div className="z-30" >
        {isMenuOpened ?
          <div className="absolute w-[100%] md:w-[30vw] h-fit  lg:w-[20vw] top-0 left-0"> <Menu isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} ></Menu> </div> : <i onClick={() => setIsMenuOpened(!isMenuOpened)} className="text-xl md:text-2xl absolute top-4 lg:top-5 left-3 cursor-pointer text-white ri-menu-line"></i>}
      </div>
      <div className="max-w-4xl mt-4 md:mt-0 mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#A6E02B] mb-6 animate-fadeIn">
          Welcome to CineScape!
        </h1>
        <p className="text-base md:text-lg mb-8 md:mb-12 animate-slideIn">
          Dive into the world of cinema with CineScape, your ultimate movie discovery platform. From trending shows to popular movies, explore, watch trailers, and learn more about the creators behind your favorite titles.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
        {/* Feature 1 */}
        <div className="p-6 bg-[#A6E02B] text-[#002147] rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-fadeInUp">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Search People</h2>
          <p>
            Easily find information about actors, directors, and other creators who bring movies and TV shows to life. Dive into their filmographies and explore their contributions.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="p-6 bg-[#A6E02B] text-[#002147] rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-fadeInUp delay-100">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Movie Details</h2>
          <p>
            Discover in-depth details about your favorite movies, including cast, crew, ratings, and more. Watch trailers directly to decide what to watch next.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="p-6 bg-[#A6E02B] text-[#002147] rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-fadeInUp delay-200">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Trending & Popular</h2>
          <p>
            Stay updated with curated lists of trending and popular movies and TV shows. Find what's hot and join the conversation about the latest releases.
          </p>
        </div>
        {/* Feature 4 */}
        <div className="p-6 bg-[#A6E02B] text-[#002147] rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-fadeInUp delay-300">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Curated Library</h2>
          <p>
            Explore a curated library of movies spanning genres, languages, and decades. Use our advanced search and filter options to find exactly what you're looking for.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-8 md:mt-16 text-center">
        <h2 className="text-3xl font-bold text-[#A6E02B] mb-6 animate-fadeIn">
          Our Mission
        </h2>
        <p className="text-base md:text-lg leading-relaxed animate-slideIn">
          At CineScape, we aim to provide a seamless platform for movie enthusiasts to explore, discover, and celebrate the art of cinema. Whether you’re searching for trending movies or looking up the creators behind your favorite shows, CineScape is here to enhance your movie-watching experience.
        </p>
      </div>
    </div>
  );
};

export default About;
