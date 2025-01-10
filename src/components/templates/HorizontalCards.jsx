import React from 'react'
import { Link } from 'react-router-dom';
import noMovieImage from "../../assets/cards_no_movie_image.png";
function HorizontalCards({data, option}) {
  return (
    <div className=" pl-3 flex flex-col">
  <div
    className="w-full flex overflow-x-auto overflow-y-hidden pb-4"
    style={{ scrollbarWidth: "none" }} // For Firefox
  >
    {data.map((card, index) => {
      const card_title = card.title || card.name || card.original_name || card.original_title;
      return (
        <Link
          to={`/${card.media_type || option }/details/${card.id}`}
          key={index}
          className="h-[42vw] md:h-[27vw] lg:h-[21vw] bg-[#01112b] rounded-lg overflow-hidden shrink-0 mr-3 mt-2 w-[23vw] md:w-[15%] lg:w-[15%] shadow-lg transition-transform duration-300 hover:scale-105"
        > 
        
        {card.poster_path ?
        <img
        className="w-full h-auto rounded-t-lg object-cover"
        src={`https://image.tmdb.org/t/p/original/${card.poster_path}`}
        alt={card_title}
      />
       : 
       <div className='w-full flex items-center bg-white h-[85%]'>
                  <img
                    className="object-cover object-center w-full"
                    src={
                    card.poster_path || card.profile_path
                      ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.profile_path}`
                      : noMovieImage}
                    alt={""}
                  />
        </div> }  
          <div className="p-1 md:px-3 md:py-2 flex items-center justify-center">
            <h2 className="text-white text-xs md:text-sm font-semibold text-center truncate">
              {card_title}
            </h2>
          </div>
        </Link>
      );
    })}
  </div>
</div>
  )
}

export default HorizontalCards