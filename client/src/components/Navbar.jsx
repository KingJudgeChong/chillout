import React from 'react'
import axios from 'axios'
const Navbar = () => {

  return (
    <div id='bgnavbar' className="font-gsr absolute w-auto h-16 flex">
        <div>Home</div>
        
        <div>About</div>
        <div>Contact me</div>
        <div className="mr-7 mt-2 flex">
          <div>
        <img
            src="https://img.icons8.com/color/256/gender-neutral-user.png"
            className="rounded-full shadow-lg w-12 bg-slate-300"
            alt="Avatar" />
          </div>
            <div>
            <p>name</p>
            </div>
                    
        </div>       
      </div>
  )
}

export default Navbar
