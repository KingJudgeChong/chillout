import React from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Carousel from '../components/Carousel'

const Home = () => {
  
  return (
    <div className=" h-screen w-screen">
      <Carousel/>
      <Posts/>
      <Navbar/>
    </div>
    
  )
}

export default Home
