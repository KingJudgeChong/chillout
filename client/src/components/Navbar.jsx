import React from "react";
import { HiChevronDown } from "react-icons/hi"
const Navbar = () => {
  const username = localStorage.getItem("username");

  return (
    <div id="bgnavbar" className="font-gsr absolute w-auto h-16 flex">
      <div>Home</div>

      <div>About</div>
      <div>Contact me</div>
      <div id='profilenavbar' className="mr-7 mt-2 flex">
        <div className="h-auto">
          <img
            id='imagenavbar'
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            alt="Avatar"
          />
        </div>
        <div id='usernamenavbar'>
          <p>{username}</p>
          <HiChevronDown/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
