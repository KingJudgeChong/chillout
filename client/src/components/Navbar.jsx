import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem("username");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/')
    console.log("Logout");
  };

  return (
    <div id="bgnavbar" className="font-gsr absolute w-auto h-16 flex">
      <div className="opacity-0">Home</div>
      <div className="opacity-0">About</div>
      <div className="opacity-0">Contact me</div>
      <div id="profilenavbar" className="mr-7 mt-2 flex">
        <div className="h-auto">
          <img
            id="imagenavbar"
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            alt="Avatar"
          />
        </div>
        <div id="usernamenavbar" className="relative" onClick={handleDropdown}>
          <p>{username}</p>
          <HiChevronDown />
          {showDropdown && (
            <div id='dropdownnavbar' className="absolute h-7 w-24 mt-8 -ml-5 rounded shadow">
              <button
                className="block px-4 py-2 text-white-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
