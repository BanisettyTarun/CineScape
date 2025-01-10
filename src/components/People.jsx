import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import TopNav from './templates/TopNav';
import DropDown from './templates/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';
import Menu from './templates/Menu';
function People() {

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const navigate = useNavigate();

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching People data:", error);
    }
  };
  useEffect(() => {
    setPeople([]);
    setPage(1);
    setHasMore(true);
    getPeople();
  }, []);
  return (
    <div className="bg-[#002147] relative overflow-y-auto overflow-x-hidden w-full h-auto pb-8">
      <style>{`
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #A6E02C;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-track {
        background-color: #01112B;
      }
    `}</style>
      <div className="items-center justify-between">
        <div className="flex bg-[#01112B] px-8 h-[10vh] w-full items-center gap-3">
          <div className="z-30" >
            {isMenuOpened ?
              <div className="absolute w-[100%] md:w-[30vw] h-fit  lg:w-[20vw] top-0 left-0"> <Menu isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} ></Menu> </div> : <i onClick={() => setIsMenuOpened(!isMenuOpened)} className="text-xl md:text-2xl absolute top-4 lg:top-5 left-3 cursor-pointer text-white ri-menu-line"></i>}
          </div>
          <div className="w-full justify-center items-center flex">
            <Link to='/' className="text-xl md:text-2xl lg:text-3xl inline-block justify-center items-center text-white cursor-pointer">
              <i className="mr-1 text-[#A6E02B] ri-movie-2-fill"></i>
              <span className="font-bold">CineScape</span>
            </Link>
          </div>
        </div>
        <div className="flex md:px-7 lg:px-10 justify-center items-center">
          <div className="z-20 md:ml-10 hidden md:block md:w-[80%] lg:w-[60%]">
            <TopNav />
          </div>
        </div>
        <div className="hidden md:mt-3 lg:mt-0 md:flex md:px-7 md:justify-between md:items-center lg:px-10"><h1 className="text-[#A6E02C] text-xl font-semibold lg:text-2xl">People</h1>
        </div>
      </div>
      <div className="w-[95%] ml-3 md:hidden">
        <TopNav></TopNav>
      </div>
      <div className="flex mb-1 justify-center md:hidden px-3"><h1 className="text-[#A6E02C] text-lg w-fit md:text-xl font-semibold">People</h1></div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<h1 className="px-10 py-5 text-white font-bold">Loading...</h1>}
      >
        <Cards data={people} title={"person"} />
      </InfiniteScroll>
    </div>
  )
}

export default People