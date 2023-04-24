import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Posts = () => {
  const [posts, setPost] = useState([]) 


useEffect(() => { 
  axios.get("http://localhost:8000/posts", {
  }).then((response)=> {
    console.log(response.data)
    setPost(response.data)
  }) 
} , [])   
    


  function AddPost() {
    console.log() 
  }

  
  return (
    <div className="shadow-lg shadow-gray-500/50 bg-white w-full max-w-3xl mb-52 h-2/5 p-10 flex justify-between">
        <div>{posts.map((post, index) => {
            return <p>{post.description}</p>
        })}</div>
        <div><button className='border-4 bg-gray-300' onClick={AddPost()}> Create Post +</button></div>
    </div>
  )
}

export default Posts




