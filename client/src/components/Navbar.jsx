import React from 'react'

 const Navbar = () => {
  return (
    <div className="absolute border-inherit top-0 w-screen shadow-lg bg-slate-100 bg-opacity-80 h-16 flex justify-between">
        <div className="font-snow p-6 text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-blue-500">
          ChillOut
        </div>
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
