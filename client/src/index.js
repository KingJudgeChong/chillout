import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbars from './components/Button';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import App from "./pages/Login";
import Profile from "./pages/Profile";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    	<BrowserRouter>
        	<Routes>
            <Route path="login" element={<App />} />
            	<Route path="/" element={<Navbars />}>
                <Route index element={<Home />} />                
                <Route path="profile" element={<Profile />} />
              </Route>
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
