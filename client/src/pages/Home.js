import React from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
// import Filters from '../components/Filters'
import Carousel from '../components/Carousel'
const Home = () => {
  
  return (
    <div className=" h-screen w-screen">
      
      {/* <Filters/> */}
      
      
      <Carousel/>
      <Posts/>
      <Navbar/>
    </div>
    
  )
}

export default Home
