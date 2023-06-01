import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Carousel from '../components/Carousel'
import axios from 'axios'
import { useSearchParams } from "react-router-dom";


const Home = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryTypeId = searchParams.get("categoryTypeId");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showLocation, setShowLocation] = useState("The World")
  function fetchPosts() {
    const url = new URL("http://localhost:8000");
    url.pathname = "/posts";
    Number(categoryId) && url.searchParams.append("categoryId", categoryId);
    Number(categoryTypeId) &&
      url.searchParams.append("categoryTypeId", categoryTypeId);
    axios
      .get(url, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        setPosts(response.data);
        if (showLocation !== "The World") {
          const result = response.data.filter(post => post.venue.includes(showLocation))
          setFilteredPosts(result)
          } else {
          setFilteredPosts(response.data)
          }
      });
  }

  const searchPosts = (venue) => {
    if (!venue) {
      setFilteredPosts(posts)
      setShowLocation("The World")
    }
    else{
    const result = posts.filter(post => post.venue.includes(venue))
    setFilteredPosts(result)
    setShowLocation(venue)
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [categoryId, categoryTypeId]);
  return (
    <div className=" h-screen w-screen">
      <Carousel searchPosts={e => {searchPosts(e)}}/>
      <Posts posts={filteredPosts} fetchPosts={fetchPosts} showLocation={showLocation}/>
      <Navbar/>
        
    </div>
    
    
  )
}

export default Home
