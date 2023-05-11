import React from 'react'
import CreatePost from './CreatePost'
 const Navbar = () => {
  return (
    <div className="text-zinc-300 absolute border-inherit top-0 w-full shadow-lg h-16 grid grid-rows-4 gap-4 place-content-end ">
        
        <div><span><CreatePost/></span></div>
        <div className="mr-7 mt-2">
        <img
            src="https://img.icons8.com/color/256/gender-neutral-user.png"
            className="rounded-full shadow-lg w-12 bg-slate-300"
            alt="Avatar" />
                    
        </div>       
      </div>
  )
}

export default Navbar
