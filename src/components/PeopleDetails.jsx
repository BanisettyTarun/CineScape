import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { asyncLoadPeople } from '../store/actions/peopleActions';
import { removePeople } from '../store/reducers/peopleSlice';
import Loading from './Loading';
import imdbImg from '../assets/imdb.png';
import Cards from './templates/Cards';
import insta from '../assets/instagram.png'
import HorizontalCards from './templates/HorizontalCards';
import noMovieImage from '../assets/cards_no_movie_image.png';
import DropDown from '../components/templates/DropDown'
function PeopleDetails() {
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadPeople(id));
    return () => {
      dispatch(removePeople());
    };
  }, [id]);
  const [category, setCategory] = useState("movie");
  return info ? (
    <>
      <div className='w-full hidden md:block bg-[#002147] h-screen overflow-y-auto'>
        <nav className='h-[7vh] bg-[#01112B] text-white flex items-center text-xl justify-start px-3 gap-5'>
          <Link onClick={() => navigate(-1)} className='bg-[#A6E02B] text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
            <i className='ri-arrow-left-line'></i>
          </Link>
          <Link className='w-8 h-8' to='/'><i className="text-[#A6E02B] text-2xl w-6 h-6 mr-1 ri-home-4-fill"></i>
          </Link>
        </nav>
        <div className='flex md:w-full lg:w-[90%] overflow-x-hidden mx-auto px-5 py-3'>
          <div className='w-[20vw] text-wrap'>
            <img
              className="object-cover object-center w-[20vw]"
              src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.profile_path}`}
              alt={""}
            />
            <hr className='w-[20vw] mt-5 mb-4 bg-zinc-100' />
            <div className='flex justify-between'>
              <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} className='text-white w-6 h-6 flex items-center justify-center rounded-full'>
                <i className="text-3xl ri-earth-line"></i>
              </a>
              <a target='_blank' href={`https://www.facebook.com/${info.externalIds.facebook_id}`} className='text-[#316FF6] bg-white rounded-full w-6 h-6 flex items-center justify-center'>
                <i className="text-3xl ri-facebook-circle-fill"></i>
              </a>
              <a target='_blank' href={`https://www.instagram.com/${info.externalIds.instagram_id}`} className='text-white w-6 h-6 flex items-center justify-center rounded-md'>
                <img src={insta} alt="" />
              </a>
              <a target='_blank' href={`https://x.com/${info.externalIds.twitter_id}`} className='text-white  w-6 h-6 flex items-center justify-center rounded-md'>
                <i className="text-xl flex items-center justify-center text-black bg-white rounded-md w-6 h-6 ri-twitter-x-line"></i>
              </a>
            </div>
            <div className='text-white mt-7'>
              <h1 className='lg:text-2xl md:text-xl font-bold'>Personal Info:</h1>
              <p className='lg:text-lg md:text-base mt-2 font-semibold'>Department: <span className='font-normal text-base'>{info.details.known_for_department}</span></p>
              <p className='lg:text-lg md:text-base mt-2 font-semibold'>Gender: <span className='font-normal text-base'>{info.details.gender === 1 ? "Female" : "Male"}</span></p>
              <p className='lg:text-lg md:text-base mt-2 font-semibold'>Birthday: <span className='font-normal text-base'>{info.details.birthday}</span></p>
              {info.details.deathday &&
                <p className='text-lg mt-2 font-semibold'>Birthday: <span className='font-normal text-base'>{info.details.birthday}</span></p>
              }
              <p className='text-lg mt-2 font-semibold text-wrap'>Place of Birth: <span className='font-normal text-base text-wrap'>{info.details.place_of_birth}</span></p>
              <p className='text-lg mt-2 font-semibold text-wrap'>Also Known As: <span className='font-normal text-base text-wrap'>{info.details.also_known_as}</span></p>
            </div>
          </div>
          <div className='ml-5 md:w-[76%] lg:w-[75%] text-justify text-white'>
            <h1 className='font-bold text-white text-5xl'>{info.details.name}</h1>
            <h1 className='mt-3 mb-1 font-semibold text-2xl'>Biography:</h1>
            <p className='text-wrap'>{info.details.biography}</p>
            <div className='mt-5'>
              {/* HorizontalCards */}
              <h2 className='font-semibold text-2xl'>Famous for:</h2>
              <div className="h-[40%] md:h-[50%] lg:h-[65%] pl-3 flex flex-col">
                <div
                  className="w-full flex overflow-x-auto overflow-y-hidden pb-4"
                  style={{ scrollbarWidth: "none" }} // For Firefox
                >
                  {info.combinedCredits.cast.map((card, index) => {
                    const card_title = card.title || card.name || card.original_name || card.original_title;
                    return (
                      <Link
                        to={`/${card.media_type || option}/details/${card.id}`}
                        key={index}
                        className="h-[42vw] md:h-[20vw] lg:h-[18vw] bg-[#01112b] rounded  lg:rounded-md overflow-hidden shrink-0 mr-3 mt-2 w-[23vw] md:w-[15%] lg:w-[15%] shadow-lg transition-transform duration-300 hover:scale-105"
                      >

                        {card.poster_path || card.backdrop_path ?
                          <img
                            className="w-full h-auto object-cover"
                            src={`https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`}
                            alt={card_title}
                          />
                          :
                          <div className='w-full flex items-center bg-white h-[85%]'>
                            <img
                              className="object-cover object-center w-full"
                              src={
                                card.poster_path || card.profile_path
                                  ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`
                                  : noMovieImage}
                              alt={""}
                            />
                          </div>}
                        <div className="p-1 md:px-3 md:py-0 flex items-center justify-center">
                          <h2 className="text-white text-xs md:text-sm font-semibold text-center truncate">
                            {card_title}
                          </h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className='mt-4 w-full flex justify-between'>
                  <h1 className='text-2xl'>Acting Career</h1>
                  <div><DropDown title={"Category"} options={["movie", "tv"]} setOption={setCategory} /></div>
                </div>
                <div className='w-full mt-3 flex rounded-xl h-auto'>
                  <div className='flex border border-[#A6E02C] rounded-xl w-full overflow-hidden bg-[#002147]  mx-auto'>
                    <div className='w-1/2 h-auto text-center '>
                      <h2 className='text-xl font-bold border-r border-r-[#A6E02C] py-3 '>{category === "movie" ? "Movie" : "TV Show"}</h2>
                      <hr className='bg-[#A6E02C] border-none h-[1px]' />
                      <div className='flex flex-col'>
                        {info[category + "Credits"].cast.map((c, i) => {
                          return <Link className='text-center h-auto w-full border-r border-r-[#A6E02C]' to={`/${category}/details/${c.id}`} key={i} >
                            <span className='hover:underline inline-block py-2'>{c.title || c.name || c.original_name || c.original_title}</span>
                            <hr className='border-none bg-zinc-600 h-[1px]' />
                          </Link>
                        })}

                      </div>
                    </div>
                    <div className='w-1/2 text-center'>
                      <h2 className='text-xl font-bold py-3'>Character</h2>
                      <hr className='bg-[#A6E02C] border-none h-[1px]' />
                      <div className='flex flex-col'>
                        {info[category + "Credits"].cast.map((c, i) => {
                          return <Link to={`/${category}/details/${c.id}`} key={i} >
                            <span className='hover:underline inline-block py-2'>{c.character ? c.character : "-"}</span>
                            <hr className='border-none bg-zinc-600 h-[1px]' />
                          </Link>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:hidden bg-[#002147] h-screen overflow-y-auto'>
        <nav className='h-[7vh] bg-[#01112B] text-white flex items-center text-xl justify-start px-3 gap-2'>
          <Link onClick={() => navigate(-1)} className='bg-[#A6E02B] text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
            <i className='ri-arrow-left-line'></i>
          </Link>
          <Link className='w-8 h-8' to='/'><i className="text-[#A6E02B] text-2xl w-6 h-6 mr-1 ri-home-4-fill"></i>
          </Link>
        </nav>
        <div className='flex flex-col md:w-full lg:w-[90%] overflow-x-hidden mx-auto px-2'>
          <div className='w-full text-wrap '>
            <div className='w-full flex flex-col items-center'>
              <h1 className='font-bold text-white mb-4 text-3xl'>{info.details.name}</h1>
              <img
                className="object-cover object-center w-[60vw]"
                src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.profile_path}`}
                alt={""}
              />
              <hr className='w-[60vw] mt-5 mb-4 bg-zinc-100' />
              <div className='flex w-[60vw] justify-between'>
                <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} className='text-white w-6 h-6 flex items-center justify-center rounded-full'>
                  <i className="text-3xl ri-earth-line"></i>
                </a>
                <a target='_blank' href={`https://www.facebook.com/${info.externalIds.facebook_id}`} className='text-[#316FF6] bg-white rounded-full w-6 h-6 flex items-center justify-center'>
                  <i className="text-3xl ri-facebook-circle-fill"></i>
                </a>
                <a target='_blank' href={`https://www.instagram.com/${info.externalIds.instagram_id}`} className='text-white w-6 h-6 flex items-center justify-center rounded-md'>
                  <img src={insta} alt="" />
                </a>
                <a target='_blank' href={`https://x.com/${info.externalIds.twitter_id}`} className='text-white  w-6 h-6 flex items-center justify-center rounded-md'>
                  <i className="text-xl flex items-center justify-center text-black bg-white rounded-md w-6 h-6 ri-twitter-x-line"></i>
                </a>
              </div>
            </div>
            <div className='text-white mt-5'>
              <h1 className='lg:text-2xl text-xl font-bold'>Personal Info:</h1>
              <p className='lg:text-lg text-base mt-2 font-semibold'>Department: <span className='font-normal text-base'>{info.details.known_for_department}</span></p>
              <p className='lg:text-lg text-base mt-2 font-semibold'>Gender: <span className='font-normal text-base'>{info.details.gender === 1 ? "Female" : "Male"}</span></p>
              <p className='lg:text-lg text-base mt-2 font-semibold'>Birthday: <span className='font-normal text-base'>{info.details.birthday}</span></p>
              {info.details.deathday &&
                <p className='lg:text-lg text-base mt-2 font-semibold'>Birthday: <span className='font-normal text-base'>{info.details.birthday}</span></p>
              }
              <p className='lg:text-lg text-base mt-2 font-semibold text-wrap'>Place of Birth: <span className='font-normal text-base text-wrap'>{info.details.place_of_birth}</span></p>
              <p className='lg:text-lg text-base mt-2 font-semibold text-wrap'>Also Known As: <span className='font-normal text-base text-wrap'>{info.details.also_known_as}</span></p>
            </div>
          </div>
          <div className='md:w-[76%] lg:w-[75%] text-justify text-white'>
            <h1 className='mt-3 mb-1 font-semibold text-2xl'>Biography:</h1>
            <p className='text-wrap'>{info.details.biography}</p>
            <div className='mt-5'>
              {/* HorizontalCards */}
              <h2 className='font-semibold text-2xl'>Famous for:</h2>
              <div className="h-[40%] md:h-[50%] lg:h-[65%] pl-3 flex flex-col">
                <div
                  className="w-full flex overflow-x-auto overflow-y-hidden pb-4"
                  style={{ scrollbarWidth: "none" }} // For Firefox
                >
                  {info.combinedCredits.cast.map((card, index) => {
                    const card_title = card.title || card.name || card.original_name || card.original_title;
                    return (
                      <Link
                        to={`/${card.media_type || option}/details/${card.id}`}
                        key={index}
                        className="h-[42vw] md:h-[20vw] lg:h-[18vw] bg-[#01112b] rounded  lg:rounded-md overflow-hidden shrink-0 mr-3 mt-2 w-[23vw] md:w-[15%] lg:w-[15%] shadow-lg transition-transform duration-300 hover:scale-105"
                      >

                        {card.poster_path || card.backdrop_path ?
                          <img
                            className="w-full h-auto object-cover"
                            src={`https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path}`}
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
                          </div>}
                        <div className="p-1 md:px-3 md:py-2 flex items-center justify-center">
                          <h2 className="text-white text-xs md:text-sm font-semibold text-center truncate">
                            {card_title}
                          </h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className='mt-4 w-full flex justify-between'>
                  <h1 className='text-xl md:text-2xl'>Acting Career</h1>
                  <div><DropDown title={"Category"} options={["movie", "tv"]} setOption={setCategory} /></div>
                </div>
                <div className='w-full mt-3 flex rounded-xl h-auto'>
                  <div className='flex border border-[#A6E02C] rounded-xl w-full overflow-hidden bg-[#002147]  mx-auto'>
                    <div className='w-1/2 h-auto text-center '>
                      <h2 className='text-lg font-bold border-r border-r-[#A6E02C] py-3 '>{category === "movie" ? "Movie" : "TV Show"}</h2>
                      <hr className='bg-[#A6E02C] border-none h-[1px]' />
                      <div className='flex flex-col'>
                        {info[category + "Credits"].cast.map((c, i) => {
                          const c_name = c.title || c.name || c.original_name || c.original_title;
                          return <Link className='text-center h-auto w-full border-r border-r-[#A6E02C]' to={`/${category}/details/${c.id}`} key={i} >
                            <hr className='border-none bg-zinc-600 h-[1px]' /><span className='hover:underline text-xs inline-block py-2'>
                              {c_name.length > 25
                                ? `${c_name.slice(0, 25)}...`
                                : c_name}
                            </span>
                          </Link>
                        })}
                      </div>
                    </div>
                    <div className='w-1/2 text-center'>
                      <h2 className='text-lg font-bold py-3'>Character</h2>
                      <hr className='bg-[#A6E02C] border-none h-[1px]' />
                      <div className='flex flex-col'>
                        {info[category + "Credits"].cast.map((c, i) => {
                          return <Link to={`/${category}/details/${c.id}`} key={i} >
                            <span className='hover:underline text-xs inline-block py-2'>{c.character ? c.character.length > 25
                                ? `${c.character.slice(0, 25)}...`: c.character : "-"}</span>
                            <hr className='border-none bg-zinc-600 h-[1px]' />
                          </Link>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (<Loading />)
}
{/* <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className="ri-global-line"></i>
              </a>
              <a href={info.details.homepage} target='_blank' className='hover:bg-[#A6E02B] hover:text-[#002147] w-6 h-6 flex items-center justify-center rounded-md'>
              <i className="ri-external-link-fill"></i>
              </a>
      
              <a target='_blank' href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`} className="hover:text-[#A6E02B]">
                <img src={imdbImg} alt="IMDB" className="w-8 h-4 object-cover rounded-sm bg-yellow-300 " />
            </a> */}

export default PeopleDetails