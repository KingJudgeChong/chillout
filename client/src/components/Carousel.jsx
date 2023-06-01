import React, { useState, useEffect } from "react";
import myimage from "../pages/images/logo/logo.png"
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import axios from "axios";

const Carousel = ({searchPosts}) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/posts-locations', {
        headers: { Authorization: localStorage.getItem("jwt")},
      })
      .then((response) => {
        console.log(response.data, "THIS IS TOO")
        
        const locations = response.data.map((ven) => {
          console.log(ven.venue, "VEN.VENUE")
          return ven.venue
        })
        let unique = [...new Set(locations)]
        console.log(unique, "____________")
        setVenue(unique)
      })
  }, [])
  return (
    <div className="h-4/6 w-full" data-testid="carousel">
      <div className="flex h-full snap-mandatory overflow-y-visible overflow-x-scroll scroll-smooth rounded-none indiana-scroll-container indiana-scroll-container--hide-scrollbars indiana-scroll-container--native-scroll">
        <div
          className="w-full flex-shrink-0 transform cursor-grab snap-center"
          data-active="false"
          data-testid="carousel-item"
        >
          <img
            src="https://cdn.discordapp.com/attachments/818821918303715350/1106094933850460251/bg.png"
            alt="..."
            id='customimg'
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 h-auto object-fit-contain brightness-75"
          />
        </div>
        <div
          className="w-full flex-shrink-0 transform cursor-grab snap-center"
          data-active="false"
          data-testid="carousel-item"
        >
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmI3N2QyMzQwYTcyMGM3Njg0ZDQyNjhhZWZmMTJhNjgwYjM1NWIzYSZjdD1n/xT5LMyhwQOTZQHszTi/giphy.gif"
            alt="..."
            id='customimg'
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 h-auto object-fit-contain brightness-75 rounded-lg"
          />
        </div>
        <div
          className="w-full flex-shrink-0 transform cursor-grab snap-center"
          data-active="false"
          data-testid="carousel-item"
        >
          <img
            src="https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"
            alt="..."
            id='customimg'
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 h-auto object-fit-contain brightness-75"
          />
        </div>
        <div
          className="w-full flex-shrink-0 transform cursor-grab snap-center"
          data-active="false"
          data-testid="carousel-item"
        >
          <img
            src="https://images.pexels.com/photos/3772302/pexels-photo-3772302.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1"
            alt="..."
            id='customimg'
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 h-auto object-fit-contain brightness-75 rounded-lg"
          />
        </div>
        <div
          className="w-full flex-shrink-0 transform cursor-grab snap-center"
          data-active="true"
          data-testid="carousel-item"
        >
          <img
            src="https://www.wallart.com/media/catalog/product/cache/296967dd00486cb8867f6b6fbb192224/w/0/w03204-small.jpg"
            alt="..."
            id='customimg'
            className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 h-auto object-fit-contain brightness-75 rounded-lg"
          />
        </div>
      </div>
      <div id='carousellogo' className="absolute m-20 ml-28">
        <img id='carousellogo1' src={myimage} alt="" />
        
        <p id='carouselinfo' className="text-zinc-300 font-gsr tracking-wide absolute -ml-11">
          connect with people in your area through <span id="yellow">hangouts</span>
        </p>
      
      </div>
      <div className="h-16 font-gsr absolute top-[45.3%] left-[31.6%]">
        <Typeahead
          
          id="basic-typeahead-single"
          labelKey="name"
          
          onChange={(e) => 
            {setSingleSelections(e);
              searchPosts(e[0]);
            console.log(e, "TYPEAHEAD")}}
          options={venue.sort()}
          placeholder="Choose a venue..."
          selected={singleSelections}
        />
      </div>

      
    </div>
  );
};

export default Carousel;
