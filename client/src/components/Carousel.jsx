import React from "react";

const Carousel = () => {
  return (
    <div className="h-1/2 w-screen" data-testid="carousel">
      <div className="flex h-full snap-mandatory overflow-y-visible overflow-x-scroll scroll-smooth rounded-none indiana-scroll-container indiana-scroll-container--hide-scrollbars indiana-scroll-container--native-scroll">
        <div
          className="w-full flex-shrink-0 transform cursor-grab snap-center"
          data-active="false"
          data-testid="carousel-item"
        >
          <img
            src="https://cdn.discordapp.com/attachments/818821918303715350/1106094933850460251/bg.png"
            alt="..."
            className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 h-full object-fit-contain brightness-75"
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
            className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 h-full object-fit-contain brightness-75 rounded-lg"
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
            className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 h-full object-fit-contain brightness-75"
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
            className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 h-full object-fit-contain brightness-75 rounded-lg"
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
            className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2"
          />
        </div>
      </div>
      <div className="absolute top-5 left-1/3 w-80 m-20 ml-28">
        <img src="https://cdn.discordapp.com/attachments/818821918303715350/1105451216223354910/logo.png" alt="" />
        
        <p className="text-zinc-300 -ml-5 -mr-12 mt-1 font-gsr">
          connect with people through <span id="yellow">hangouts</span> in your
          area
        </p>
      
      </div>

      {/* <div className="relative bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
        <button
          className="h-3 w-3 rounded-full bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800"
          data-testid="carousel-indicator"
        ></button>
        <button
          className="h-3 w-3 rounded-full bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800"
          data-testid="carousel-indicator"
        ></button>
        <button
          className="h-3 w-3 rounded-full bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800"
          data-testid="carousel-indicator"
        ></button>
        <button
          className="h-3 w-3 rounded-full bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800"
          data-testid="carousel-indicator"
        ></button>
        <button
          className="h-3 w-3 rounded-full bg-white dark:bg-gray-800"
          data-testid="carousel-indicator"
        ></button>
      </div> */}
      
    </div>
  );
};

export default Carousel;
