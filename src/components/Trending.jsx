import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import DropDown from "./templates/DropDown";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import SideNav from "./templates/SideNav";
import Menu from "./templates/Menu";

function Trending() {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    setTrending([]);
    setPage(1);
    setHasMore(true);
    getTrending();
  }, [category, duration]);

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
        <div className="hidden md:mt-3 lg:mt-0 md:flex md:px-7 md:justify-between md:items-center lg:px-10"><h1 className="text-[#A6E02C] text-xl font-semibold lg:text-2xl">Trending {category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize first letter of each word
          .join(" ") === "Tv" ? "TV Shows" : category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize first letter of each word
            .join(" ") === 'Movie' ? "Movies" : ""}</h1>
          <div className="hidden md:flex gap-2">
            <DropDown title="Category" options={["all", "movie", "tv"]} setOption={setCategory} />
            <DropDown title="Duration" options={["day", "week"]} setOption={setDuration} />
          </div>
        </div>
      </div>
      <div className="w-[95%] ml-3 md:hidden">
        <TopNav></TopNav>
      </div>
      <div className="flex justify-center md:hidden px-3"><h1 className="text-[#A6E02C] text-lg w-fit md:text-xl font-semibold">Trending {category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize first letter of each word
        .join(" ") === "Tv" ? "TV Shows" : category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize first letter of each word
          .join(" ") === 'Movie' ? "Movies" : ""}</h1></div>
      <div className="flex mt-2 justify-between px-3 w-full  md:hidden gap-2">
        <DropDown title="Category" options={["all", "movie", "tv"]} setOption={setCategory} />
        <DropDown title="Duration" options={["day", "week"]} setOption={setDuration} />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1 className="px-10 py-5 text-white font-bold">Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  );
}

export default Trending;
