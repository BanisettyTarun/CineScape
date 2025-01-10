import React from "react";
import { Link } from "react-router-dom";
import noMovieImage from "../../assets/cards_no_movie_image.png";

function Cards({ data, title }) {
  return (
    <div className="grid px-3 md:px-7 lg:px-10 gap-2 md:gap-6 pt-2 grid-cols-3 md:grid-cols-5 lg:grid-cols-6 lg:gap-7 w-full">
      {data.map((card) =>{
        let card_title = card.title || card.name || "Untitled";
        return (<Link to={`/${card.media_type || title}/details/${card.id}`}
          className="bg-[#01112b] md:h-[31vw] md:w-[17vw] lg:h-[24.5vw] lg:w-[14vw] overflow-hidden rounded-md text-sm text-white font-semibold  transition-transform duration-300 hover:scale-105"
          key={card.id} // Use unique id
        >
          {card.poster_path || card.profile_path ? <img
                    className="object-cover object-center w-full"
                    src={
                    card.poster_path || card.profile_path
                      ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.profile_path}`
                      : noMovieImage}
                    alt={""}
                  /> : 
                  <div className='w-full flex items-center bg-white h-[85%]'>
                  <img
                    className="object-cover object-center w-full"
                    src={
                    card.poster_path || card.profile_path
                      ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.profile_path}`
                      : noMovieImage} 
                    alt={""}
                  />
                   </div>
          }
          <h2 className="block lg:hidden text-center truncate text-xs md:whitespace-normal md:overflow-visible p-1 md:px-3">
            {card_title.slice(0, 32) + (card_title.length>=32 ? "..." : "")}
          </h2>
          <h2 className="hidden lg:block text-center truncate md:text-xs lg:text-sm md:whitespace-normal md:overflow-visible px-3 py-1">
            {card_title.slice(0, 46) + (card_title.length>=46 ? "..." : "")}
          </h2>
        </Link>
        )})}
    </div>
  );
}

export default Cards;
