import React from "react";
import { Tooltip, Button } from "flowbite-react";
import "./App.css";
import Login from "./pages/Login";



function App() {
  return (
    <>
    <Login/>
      <div className="flex gap-2">
        <Tooltip content="Tooltip content" style="light">
          <Button>Light tooltip</Button>
        </Tooltip>
        <Tooltip content="Tooltip content" style="dark">
          <Button>Dark tooltip</Button>
        </Tooltip>
      </div>
    </>
  );
}

export default App;
