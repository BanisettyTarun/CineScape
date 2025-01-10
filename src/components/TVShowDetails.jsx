import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { asyncLoadTV } from '../store/actions/tvActions';
import { removeTV } from '../store/reducers/tvSlice';
import Loading from './Loading';
import imdbImg from '../assets/imdb.png';
import Cards from './templates/Cards';
import cards_no_movie_image from "../assets/cards_no_movie_image.png";
import Trailer from './Trailer';


function TVShowDetails() {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadTV(id));
    return () => {
      dispatch(removeTV());
    };
  }, [id]);
  return info ? (
    <>
      <div className={`hidden md:block relative w-full h-screen overflow-x-hidden overflow-y-auto`}
        style={
          {
            background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path || info.details.poster_path})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
          }}>
        {/* nav */}
        <nav className='h-[7vh] bg-[#002147] text-white flex items-center text-xl justify-between px-2 md:px-3 gap-3 md:gap-5'>
          <div className='flex items-center gap-5'>
            <Link onClick={() => navigate(-1)} className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className='text-lg md:text-xl ri-arrow-left-line'></i>
            </Link>
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className="text-lg md:text-xl ri-global-line"></i>
            </a>
            <a href={info.details.homepage} target='_blank' className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className="text-lg md:text-xl ri-external-link-fill"></i>
            </a>

            <a target='_blank' href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`} className="hover:text-[#A6E02B]">
              <img src={imdbImg} alt="IMDB" className="w-6 h-3 md:w-8 md:h-4 object-cover rounded-sm bg-yellow-300 " />
            </a>
          </div>
          <Link to='/' ><i className="ri-home-4-fill"></i></Link>

        </nav>
        {/* poster */}
        <div className='flex md:w-full lg:w-[90%] mx-auto md:px-3 lg:px-5 py-3'>
          <img
            className="object-cover object-center md:h-[40vw] lg:h-[30vw]"
            src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.profile_path}`}
            alt={""}
          />
          <div className='md:ml-3 lg:ml-5 text-white'>
            <h1 className='font-bold md:text-3xl lg:text-5xl'>{info.details.name || info.details.title || info.details.original_title || info.details.original_name} {info.details.first_air_date.length > 0 ? <span className='md:text-xl lg:text-2xl'>({info.details.first_air_date.split("-")[0]})</span> : <></>} </h1>
            <div className='flex gap-4 text-sm lg:text-base mt-0 lg:mt-2 font-semibold items-center'>
              <p>
                {
                  info.details.genres.map((g) =>
                    g.name
                  ).join(" | ")
                }
              </p>
              {info.details.first_air_date.length > 0 ?
                <>
                  <div className='bg-zinc-100 w-1 h-1 rounded-full'></div>
                  <p>{info.details.first_air_date}</p></>
                :
                <div> </div>}
              {info.details.runtime > 0 ?
                <><div className='bg-zinc-100 w-1 h-1 rounded-full'></div>
                  <p>{info.details.runtime} mins</p></> :
                <></>}
              {info.details.vote_average > 0 && <div className='bg-zinc-100 w-1 h-1 rounded-full'></div>}

              <div className='px-3 py-0 font-semibold bg-yellow-500 rounded-md'>
                {info.details.vote_average > 0 ? parseFloat(info.details.vote_average).toFixed(1).replace(/\.0$/, "") : "N/A"}
              </div>
            </div>
            <p className='w-full text-[15px] lg:text-base lg:w-[80%] md:mt-3 lg:mt-10'>
              {info.details.overview}
            </p>
            <p className='md:mb-4 lg:mb-10 w-[80%] text-[15px] lg:text-base md:mt-3 lg:mt-10'>
              <span className='font-bold text-lg lg:text-xl'>Languages:</span> {info.translations.map(t => t).slice(0, 16).join(", ")}
              {info.translations.length > 14 ? <span>  etc..</span> : <span></span>}
            </p>
            <Link to={`/tv/details/${id}/trailer`} className='inline-block md:text-sm lg:text-base transition-transform duration-300 hover:scale-105 px-2 py-1 lg:px-5 lg:py-3 bg-[#A6E02C] rounded-md text-[#002147] font-semibold'><i className="ri-play-fill text-base lg:text-lg"></i> Play Trailer</Link>
          </div>
        </div>
        {/* Watch Providers */}
        {info.watchProviders &&
          <div className='lg:px-5 flex flex-col gap-3 w-[90%] mx-4 lg:mx-auto'>
            {
              info.watchProviders.flatrate &&
              <div className='flex items-center'>
                <h2 className='w-[6vw] text-white mr-5 font-semibold'>Stream: </h2>
                <div className='flex gap-4 items-center'>
                  {info.watchProviders.flatrate.map((provider, idx) => (
                    <img key={idx} title={provider.provider_name} className='rounded-md w-[3vw] h-[3vw] object-cover object-center' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                  ))}
                </div>
              </div>
            }
            {
              info.watchProviders.rent &&
              <div className='flex items-center'>
                <h2 className='w-[6vw] text-white mr-5 font-semibold'>Rent: </h2>
                <div className='flex gap-4 items-center'>
                  {info.watchProviders.rent.map((provider, idx) => {
                    return (<img key={idx} title={provider.provider_name || "Unknown Provider"}
                      className='rounded-md w-[3vw] h-[3vw] object-cover object-center' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                    )
                  })}
                </div>
              </div>
            }
            {
              info.watchProviders.buy &&
              <div className='flex items-center'>
                <h2 className='w-[6vw] text-white mr-5 font-semibold'>Buy: </h2>
                <div className='flex gap-4 items-center'>
                  {info.watchProviders.buy.map((provider, idx) => (
                    <img key={idx} title={provider.provider_name} className='rounded-md w-[3vw] h-[3vw] object-cover object-center' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                  ))}
                </div>
              </div>
            }
          </div>}
        {info.details.seasons.length > 0 ?
          <div className='mb-10 h-auto w-[100%] mx-auto'>
            <hr className='w-[95%] bg-zinc-500 mx-auto my-10' />
            <h2 className='w-[95%] mx-auto mt-10 mb-2 text-white font-bold text-2xl'>Seasons:</h2>
            <div className="grid px-3 md:px-7 lg:px-10 gap-2 md:gap-6 pt-5 grid-cols-3 md:grid-cols-5 lg:grid-cols-6 lg:gap-7 w-full">
              {info.details.seasons.map((card) => {
                let card_title = card.title || card.name || "Untitled";
                return (<div
                  className="cursor-text bg-[#01112b] md:h-[31vw] md:w-[17vw] lg:h-[24.5vw] lg:w-[14vw] overflow-hidden rounded-md text-sm text-white font-semibold  transition-transform duration-300 hover:scale-105"
                  key={card.id} // Use unique id
                >
                  {card.poster_path || card.backdrop_path ? <img
                    className="object-cover object-center w-full"
                    src={
                      card.poster_path || card.profile_path
                        ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`
                        : cards_no_movie_image}
                    alt={""}
                  /> :
                    <div className='w-full flex items-center bg-white h-[85%]'>
                      <img
                        className="object-cover object-center w-full"
                        src={
                          card.poster_path || card.profile_path
                            ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`
                            : cards_no_movie_image}
                        alt={""}
                      />
                    </div>
                  }
                  <h2 className="block lg:hidden text-center truncate text-xs md:whitespace-normal md:overflow-visible p-1 md:px-3">
                    {card_title.slice(0, 32) + (card_title.length >= 32 ? "..." : "")}
                  </h2>
                  <h2 className="hidden self-end lg:block text-center truncate md:text-xs lg:text-sm md:whitespace-normal md:overflow-visible px-3 py-1">
                    {card_title.slice(0, 46) + (card_title.length >= 46 ? "..." : "")}
                  </h2>
                </div>
                )
              })}
            </div>
          </div>
          :
          <div></div>}
        <div className='mb-10 h-auto w-[100%] mx-auto'>
          <hr className='w-[95%] bg-zinc-500 mx-auto my-10' />
          {
            info.recommendations.length > 0 ?
              <>
                <h2 className='w-[95%] mx-auto mt-10 mb-2 text-white font-bold text-2xl'>Recommendations & Similar Stuff:</h2>
                <Cards data={info.recommendations} title={"tv"} />
              </>
              :
              <>
                <h2 className='w-[95%] mx-auto mt-10 mb-2 text-white font-bold text-2xl'>Recommendations & Similar Stuff:</h2>
                <Cards data={info.similar} title={"tv"} /></>
          }
        </div>
        <Outlet />
      </div>
      <div className={`block md:hidden relative w-full h-screen overflow-x-hidden overflow-y-auto`}
        style={
          {
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none",
            background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
          }}>
        {/* nav */}
        <nav className='h-[7vh] bg-[#002147] text-white flex items-center text-xl justify-between px-2 md:px-3 gap-3 md:gap-5'>
          <div className='flex gap-3 items-center'>
            <Link onClick={() => navigate(-1)} className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className='text-lg md:text-xl ri-arrow-left-line'></i>
            </Link>
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className="text-lg md:text-xl ri-global-line"></i>
            </a>
            <a href={info.details.homepage} target='_blank' className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className="text-lg md:text-xl ri-external-link-fill"></i>
            </a>

            <a target='_blank' href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`} className="hover:text-[#A6E02B]">
              <img src={imdbImg} alt="IMDB" className="w-6 h-3 md:w-8 md:h-4 object-cover rounded-sm bg-yellow-300 " />
            </a>
          </div>
          <Link to='/' ><i className="ri-home-4-fill"></i></Link>

        </nav>
        {/* poster */}
        <div className='flex-col w-full text-white mx-auto p-2'>
          <h1 className='font-bold text-2xl'>{info.details.name || info.details.title || info.details.original_title || info.details.original_name} {info.details.first_air_date.length > 0 ? <span className='text-xs'>({info.details.first_air_date.split("-")[0]})</span> : <></>} </h1>
          <div className='text-sm gap-2 mt-1 leading-4 flex-wrap flex items-center'>
            {
              info.details.genres.map((g) =>
                g.name
              ).join(" | ")
            }
            {info.details.first_air_date.length > 0 ?
              <div className='flex items-center gap-2'>
                <div className='bg-zinc-100 w-1 h-1 rounded-full'></div>
                <p>{info.details.first_air_date}</p></div>
              :
              <div> </div>}
            {/* <div className='bg-zinc-100 w-1 h-1 rounded-full'></div> */}
            {info.details.runtime > 0 ?
              <>
                <div className='bg-zinc-100 w-1 h-1 rounded-full'></div>
                <p>{info.details.runtime} mins</p></> :
              <></>}
            <div className='flex items-center gap-2'> {info.details.vote_average > 0 && <div className='bg-zinc-100 w-1 h-1 rounded-full'></div>}
              <div className='px-2 text-xs font-semibold bg-yellow-500 rounded-sm'>
                {info.details.vote_average > 0 ? parseFloat(info.details.vote_average).toFixed(1).replace(/\.0$/, "") : "N/A"}
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center'>
            <div className='relative'>
              {/* <div  className='object-cover object-center'
          style={{
            background: `url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path || info.details.poster_path})`,
            width: '95vw',
            height: '40vh',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}></div> */}
              <img
                className="mt-5 object-cover object-center h-[40vh]"
                src={`https://image.tmdb.org/t/p/original/${info.details.backdrop_path || info.details.poster_path || info.details.profile_path}`}
                alt={""}
              />
              <Link to={`/tv/details/${id}/trailer`} className='bottom-4 right-4 absolute inline-block transition-transform duration-300 hover:scale-105 text-sm px-3 py-1 bg-[#A6E02C] rounded-md text-[#002147] font-semibold'><i className="ri-play-fill text-sm"></i> Play Trailer</Link>
            </div>
          </div>
          <div className='text-sm mt-5 text-white'>
            <p className='w-full text-justify'>
              {info.details.overview}
            </p>
            <p className='text-sm w-full mt-2 text-justify'>
              <span className='font-bold text-lg'>Languages:</span> {info.translations.map(t => t).slice(0, 16).join(", ")}
              {info.translations.length > 14 ? <span>  etc..</span> : <span></span>}
            </p>
          </div>
        </div>
        {/* Watch Providers */}
        {info.watchProviders &&
          <div className='px-2 flex flex-col gap-3 w-full'>
            {
              info.watchProviders.flatrate &&
              <div className='flex items-center'>
                <h2 className='w-[15vw] text-white mr-5 font-semibold'>Stream: </h2>
                <div className='flex gap-4 items-center'>
                  {info.watchProviders.flatrate.map((provider, idx) => (
                    <img key={idx} title={provider.provider_name} className='rounded-md w-5 h-5 object-cover object-center' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                  ))}
                </div>
              </div>
            }
            {
              info.watchProviders.rent &&
              <div className='flex items-center'>
                <h2 className='w-[15vw] text-white mr-5 font-semibold'>Rent: </h2>
                <div className='flex gap-4 items-center'>
                  {info.watchProviders.rent.map((provider, idx) => {
                    return (<img key={idx} title={provider.provider_name || "Unknown Provider"}
                      className='rounded-md w-5 h-5 object-cover object-center' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                    )
                  })}
                </div>
              </div>
            }
            {
              info.watchProviders.buy &&
              <div className='flex items-center'>
                <h2 className='w-[15vw] text-white mr-5 font-semibold'>Buy: </h2>
                <div className='flex gap-4 items-center'>
                  {info.watchProviders.buy.map((provider, idx) => (
                    <img key={idx} title={provider.provider_name} className='rounded-md w-5 h-5 object-cover object-center' src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} />
                  ))}
                </div>
              </div>
            }
          </div>}
        {info.details.seasons.length > 0 ?
          <div className='mb-10 h-auto w-[100%] mx-auto'>
            <hr className='w-[95%] bg-zinc-500 mx-auto my-10' />
            <h2 className='w-[95%] mx-auto mt-10 mb-2 text-white font-bold text-2xl'>Seasons:</h2>
            <div className="grid px-3 md:px-7 lg:px-10 gap-2 md:gap-6 pt-5 grid-cols-3 md:grid-cols-5 lg:grid-cols-6 lg:gap-7 w-full">
              {info.details.seasons.map((card) => {
                let card_title = card.title || card.name || "Untitled";
                return (<div
                  className="cursor-text bg-[#01112b] w-full h-[50vw] md:h-[31vw] md:w-[17vw] lg:h-[24.5vw] lg:w-[14vw] overflow-hidden rounded-md text-sm text-white font-semibold  transition-transform duration-300 hover:scale-105"
                  key={card.id} // Use unique id
                >
                  {card.poster_path || card.backdrop_path ? <img
                    className="object-cover object-center w-full"
                    src={
                      card.poster_path || card.profile_path
                        ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`
                        : cards_no_movie_image}
                    alt={""}
                  /> :
                    <div className='w-full flex items-center bg-white h-[85%]'>
                      <img
                        className="object-cover object-center w-full"
                        src={
                          card.poster_path || card.profile_path
                            ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`
                            : cards_no_movie_image}
                        alt={""}
                      />
                    </div>
                  }
                  <h2 className="block lg:hidden text-center truncate text-xs md:whitespace-normal md:overflow-visible md:px-3">
                    {card_title.slice(0, 32) + (card_title.length >= 32 ? "..." : "")}
                  </h2>
                  <h2 className="hidden self-end lg:block text-center truncate md:text-xs lg:text-sm md:whitespace-normal md:overflow-visible px-3 py-1">
                    {card_title.slice(0, 46) + (card_title.length >= 46 ? "..." : "")}
                  </h2>
                </div>
                )
              })}
            </div>
          </div>
          :
          <div></div>}
        <div className='mb-10 h-auto w-[100%] mx-auto'>
          <hr className='w-[95%] bg-zinc-500 mx-auto my-5' />
          {
            info.recommendations.length > 0 ?
              <>
                <h2 className='w-[95%] mx-auto mt-3 mb-2 text-white font-bold text-xl'>Recommendations & Similar Stuff:</h2>
                <Cards data={info.recommendations} title={"tv"} />
              </>
              :
              <>
                <h2 className='w-[95%] mx-auto mt-10 mb-2 text-white font-bold text-xl'>Recommendations & Similar Stuff:</h2>
                <Cards data={info.similar} title={"tv"} /></>
          }
        </div>
        <Outlet />
      </div>
    </>

  ) :
    (<Loading />)
}

export default TVShowDetails