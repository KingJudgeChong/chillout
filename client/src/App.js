import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  // const [darkMode, setDarkMode] = React.useState(true)
  // function toggleDarkMode() {
  //   setDarkMode(prevDarkMode => !prevDarkMode)
  // }
  const navigate = useNavigate()
  
  useEffect(() => {
    axios
      .post("http://localhost:8000/verify", {
        token: localStorage.getItem("jwt"),
      })
      .then((response) => {
        console.log(response.data);
        navigate('/home')
      })
      .catch(() => {
        navigate('/')
      });
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
