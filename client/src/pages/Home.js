import React from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Filters from '../components/Filters'
const Home = () => {
  
  return (
    <div className="bg-center bg-bghome h-screen w-screen flex flex-col items-center">
      <Navbar/>
      <Filters/>
      <Posts/>
    </div>
    
  )
}

export default Home
