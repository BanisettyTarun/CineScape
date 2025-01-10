import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import TVShows from './components/TVShows'
import People from './components/People'
import TVShowDetails from './components/TVShowDetails'
import MovieDetails from './components/MovieDetails'
import PeopleDetails from './components/PeopleDetails'
import Trailer from './components/Trailer'
import PageNotFound from './components/PageNotFound'
import About from './components/About'
import ContactUs from './components/ContactUs'

function App() {
  return (
    <div className='w-full h-screen bg-[#002147]'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/trending' element={<Trending />}></Route>
        <Route path='/popular' element={<Popular />}></Route>
        <Route path='/movies' element={<Movies />}></Route>
        <Route path='/movie/details/:id' element={< MovieDetails/>}>
          <Route path='trailer' element={<Trailer />} ></Route>
        </Route>
        <Route path='/tv' element={<TVShows />}></Route>
        <Route path='/tv/details/:id' element={<TVShowDetails />} >
          <Route path='trailer' element={<Trailer />} ></Route>
        </Route>
        <Route path='/people' element={<People />}></Route>
        <Route path='/person/details/:id' element={<PeopleDetails/>} ></Route>
        <Route path='/about' element={<About/>} ></Route>
        <Route path='/contact' element={<ContactUs/>} ></Route>
        <Route path='*' element={<PageNotFound/>} ></Route>
      </Routes>
    </div>
  )
}
// primary - #002147
// secondary - #A6E02B
export default App