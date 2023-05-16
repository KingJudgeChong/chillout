import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Filters from "./Filters";
import CreatePost from "./CreatePost";
import { BsCalendar3 } from "react-icons/bs";
import { MdLocationOn, MdGroups } from "react-icons/md";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/posts", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        console.log(response.data, "strings");
        setPosts(response.data);
      });
  }, []);

  return (
    <div id="filthis">
      <div id="marginpost" className="flex flex-col">
        <div id='insidepost' className="flex">
          <div id="chilloutareas" className="text-black font-dcb font-bold">
            Chillout<span id="darkyellow">Areas</span>
          </div>
          <div id="dashedline"></div>
          <div className="mt-8 ml-3">
            <CreatePost />
          </div>
        </div>
        <div id='post2' className="font-gsr mt-9 ml-2">
          Showing ongoing chillouts around{" "}
          <span id="darkyellow" className="font-bold"> San Fernando, La Union</span>
        </div>
        <div className="">
          <Filters />
        </div>
        <div id='allposts' className="grid grid-cols-2">
          {posts.length === 0 ? (
            <div className="text-8xl text-center">
              BOOM!
              <img
                alt=""
                src="https://thumbs.gfycat.com/AcclaimedPortlyCarp-size_restricted.gif"
              />
              GULAT KA NOH
            </div>
          ) : (
            posts.map((post) => {
              return (
                <div
                  id='user_post'
                  className=" bg-white shadow-lg rounded"
                  key={post.post_id}
                >
                  <div id="imagepost">
                    <img
                      className="w-100 w-full h-full rounded"
                      alt=""
                      src={post.photo_img}
                    />
                  </div>
                  <div className="h-auto">
                    {/* <p>{post.username}</p> */}
                    <p
                      id="yellowpost"
                      className="w-11 font-gsr text-white "
                    >
                      {post.category}
                    </p>
                    <p
                      id="interestpost"
                      className="font-gsr font-bold"
                    >
                      {post.interest}
                      <span> with anyone!</span>
                    </p>
                    <p id="descriptionpost" className="font-gsr">
                      {post.description}
                    </p>
                    <div id="post" className="flex">
                      <div id="icon">
                        <BsCalendar3 />
                      </div>
                      <div className="font-gsr">
                        Date and Time:
                        <span className="font-gsr font-bold">
                          {" "}
                          {format(
                            new Date(post.start_at),
                            "MMM dd - hh:mm aaa"
                          )}
                        </span>
                      </div>
                    </div>
                    <div id="post2" className="flex">
                      <div id="icon2">
                        <MdLocationOn />
                      </div>
                      <div className="font-gsr">
                        Meetup Place:
                        <span className="font-gsr font-bold">
                          {" "}
                          {post.venue}
                        </span>
                      </div>
                    </div>
                    <div id="post3" className="flex">
                      <div id="icon3">
                        <MdGroups />
                      </div>
                      <div className="font-gsr">
                        Group Limit:{" "}
                        <span className="font-gsr font-bold">
                          20 people
                        </span>
                      </div>
                    </div>
                    <div className="text-center border-2 mt-10 text-2xl">
                      <button >BUTTON</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
