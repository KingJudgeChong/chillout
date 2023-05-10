import React from "react";
import { Routes, Route } from "react-router-dom"
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";


function App() {
  // const [darkMode, setDarkMode] = React.useState(true)
  // function toggleDarkMode() {
  //   setDarkMode(prevDarkMode => !prevDarkMode)
// }
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    
    </>
  );
}

export default App;