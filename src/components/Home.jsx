import React, { useEffect, useState } from 'react';
import SideNav from './templates/SideNav';
import TopNav from './templates/TopNav';
import axios from '../utils/axios'
import Header from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
import DropDown from './templates/DropDown';
import Loading from './Loading';

function Home() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [option, setOption] = useState("all");
  const getWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomData = data.results[(data.results.length * Math.random()).toFixed()];
      setWallpaper(randomData);
    } catch (error) {
      console.error(error);
    }
  };
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${option}/day`);
      setTrending(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    !wallpaper && getWallpaper();
    getTrending();
  }, [option]);
  return wallpaper && trending ?
    (<div className="flex flex-col lg:flex-row h-screen">
      <SideNav />
      <div
        className="w-full lg:w-[80%] h-full overflow-y-auto"
        style={{ scrollbarWidth: "none" }} // For Firefox
      ><div className='md:mt-5 px-2 md:px-0 flex items-center justify-center lg:mt-0 w-full'>
          <div className='md:ml-12 lg:ml-0 flex justify-center w-[80%] lg:w-[60%]'>
            <TopNav />
          </div>
        </div>
        <Header wallpaper={wallpaper} option={option} />
        <div className="flex justify-between px-4 items-center mt-5">
          <h1 className="text-[#A6E02C] font-bold text-lg md:text-xl lg:text-2xl">TRENDING</h1>
          <DropDown title={"Category"} defaultOption={"all"} options={["all", "movie", "tv"]} setOption={setOption} />
        </div>
        <div>
        <HorizontalCards data={trending.results} option={option} />
        </div>
      </div>
    </div>) :
    (<Loading />);
}

export default Home;
