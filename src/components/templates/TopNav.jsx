import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import movieImage from '../../assets/movie_image.avif';

function TopNav() {
  const [query, setQuery] = useState('');
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  // px-3 md:pl-[10%] lg:pl-[20%]
  // w-[85%] md:w-[70%] lg:w-[54%]
  return (
    <div className="w-[100%] lg:w-full relative h-[10vh] text-zinc-200 flex items-center justify-start gap-2 md:gap-4">
  <div className="relative w-[100%] md:w-[93%] lg:w-[95%]">
  <i
    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer ri-search-line text-lg md:text-xl text-gray-400"
  ></i>
  <input
    onChange={(e) => setQuery(e.target.value)}
    value={query}
    className="w-full h-8 md:h-10 border border-zinc-200 outline-none text-white pl-10 pr-3 md:pr-5 py-1 rounded-full bg-transparent text-sm md:text-base"
    type="text"
    placeholder="Search anything"
  />
</div>

  {query.length > 0 && (
    <i
      onClick={() => setQuery('')}
      className="cursor-pointer ri-close-line text-lg md:text-xl"
    ></i>
  )}
  <div className="absolute z-30 w-[100%] left-0 md:w-[93%] lg:w-[95%] bg-zinc-200 max-h-[50vh] top-[100%] overflow-auto rounded-lg shadow-lg">
    {searches.map((search, index) => (
      <Link
      to={`/${search.media_type}/details/${search.id}`}
        key={index}
        className="px-2 py-2 md:py-3 text-sm md:text-base text-zinc-600 font-semibold flex items-center hover:bg-zinc-300 hover:text-black border-b border-zinc-400"
      >
        <img
          className="w-[7vh] md:w-[9vh] h-[7vh] md:h-[9vh] object-cover rounded mr-3"
          src={
            search.backdrop_path || search.profile_path
              ? `https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path}`
              : movieImage
          }
          alt=""
        />
        <p>{search.name || search.title || search.original_title || search.original_name}</p>
      </Link>
    ))}
  </div>
</div>
  );
}

export default TopNav;
