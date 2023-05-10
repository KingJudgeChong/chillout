import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {format} from 'date-fns';


const Posts = () => {
  const [posts, setPosts] = useState([]) 


useEffect(() => { 
  axios.get("http://localhost:8000/posts", {
  }).then((response)=> {
    console.log(response.data, 'strings')
    setPosts(response.data)
  }) 
} , [])   
    


 
  
  return (
    <div id='filthis' className="shadow-lg shadow-gray-500/50 w-5/6 mb-52 h-100vh p-10 grid grid-cols-2 gap-3 pl-36">
        {console.log(posts, 'test this')}
        {posts.length === 0 ? <div className='text-8xl text-center'> BOOM! <img alt='' src='https://thumbs.gfycat.com/AcclaimedPortlyCarp-size_restricted.gif'/> GULAT KA NOH</div> : posts.map((post) => {
            return (
              <div key={post.id}>
                <div className='h-3/5'>
                  <img className='w-100 max-w-sm h-full' alt='' src={post.photo_img}/>
                </div>
                <div>
                <p>{post.category}</p>
                <p>{post.interest}</p>
                <p>{post.description}</p>
                <p>{format(new Date(post.start_at), 'MMM dd - hh:mm aaa')}</p>
                <p>{post.venue}</p>
                <p>____________________</p>
                </div>
            </div>
            )
        })}
        
    </div>
  )
}

export default Posts




