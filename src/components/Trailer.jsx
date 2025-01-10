import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageNotFound from './PageNotFound';

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes('movie') ? 'movie' : 'tv';
  const { info } = useSelector((state) => state[category]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
    };
  }, []);

  return (
    <div className="top-0 left-0 z-50 w-[100%] bg-[rgba(0,0,0,0.7)] h-[100%] absolute">
      {info.videos.length > 0 ? (
        <div>
          <Link
            onClick={() => navigate(-1)}
            className="z-50 text-white absolute top-10 md:top-3 right-3 lg:top-3 rounded-md"
          >
            <i className="w-8 h-8 rounded-md text-xl hover:bg-[#A6E02B] flex items-center justify-center hover:text-[#002147] ri-close-circle-line"></i>
          </Link>
          <div className='block md:hidden w-full h-full'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${info.videos[0].key}`}
            width="100%"
            height="60vw"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            controls
          />
          </div>
          <div className='hidden md:block lg:hidden w-full h-full'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${info.videos[0].key}`}
            width="100%"
            height="70%"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            controls
          />
          </div>
          <div className='hidden lg:block w-full h-full'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${info.videos[0].key}`}
            width="80%"
            height="90%"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            controls
          />
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}

export default Trailer;
