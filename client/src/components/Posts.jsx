import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Filters from "./Filters";
import CreatePost from "./CreatePost";
import { BsCalendar3 } from "react-icons/bs";
import { MdLocationOn, MdGroups } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import EditPost from "./EditPost";
import ViewAttendees from "./ViewAttendees";
import { HiOutlinePlus } from "react-icons/hi";

const Posts = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryTypeId = searchParams.get("categoryTypeId");
  const [posts, setPosts] = useState([]);
  const user_id = Number(localStorage.getItem("user_id"));
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const OpenHover = () => {
    setIsHovered(true);
  };

  const CloseHover = () => {
    setIsHovered(false);
  };

  function fetchPosts() {
    const url = new URL("http://localhost:8000");
    url.pathname = "/posts";
    Number(categoryId) && url.searchParams.append("categoryId", categoryId);
    Number(categoryTypeId) &&
      url.searchParams.append("categoryTypeId", categoryTypeId);
    axios
      .get(url, {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        console.log(response.data, "THIS IS YOUR POSTS");
        setPosts(response.data);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, [categoryId, categoryTypeId]);

  const handleDropdownToggle = (post_id) => {
    setDropdownVisible((prevState) => (prevState === post_id ? null : post_id));
  };

  const handleJoin = (post_id) => {
    console.log("user JOINED");
    console.log(post_id);
    axios
      .post(
        "http://localhost:8000/join-user",
        {
          post_id: post_id,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLeave = (post_id) => {
    console.log("user UNJOINED");
    console.log(post_id);
    axios
      .delete(`http://localhost:8000/posts/${post_id}/post_users`, {
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
        },
      })
      .then(function (response) {
        console.log(response);
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeletePost = (post_id) => {
    axios
      .delete(`http://localhost:8000/posts/${post_id}`, {
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
        },
      })
      .then(function (response) {
        console.log(response, "RESPONSED");
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error, "ERROR");
      });
  };

  return (
    <div id="filthis">
      <div id="marginpost" className="flex flex-col">
        <div id="insidepost" className="flex">
          <div id="chilloutareas" className="text-black font-dcb font-bold">
            Chillout<span id="darkyellow">Areas</span>
          </div>
          <div id="dashedline"></div>
          <div className="mt-8 ml-3">
            <CreatePost fetchPosts={fetchPosts} />
          </div>
        </div>
        {/* <div id="locationpost" className="font-gsr mt-9 ml-2">
          Showing ongoing chillouts around
          <span id="darkyellow" className="font-bold">
            {" "}
            San Fernando, La Union
          </span>
        </div> */}
        <div className="">
          <Filters />
        </div>
        <div id="allposts" className="grid grid-cols-2">
          {posts.length === 0 ? (
            <div id="user_post2" className="shadow-2xl text-center font-gsr text-[26px] py-[50%] text-[#AFAFAF]">
              <div className="mx-[46%] mb-4 text-[48px]"><HiOutlinePlus /></div>
              <div className="font-bold">Post a Chillout</div>
            </div>
          ) : (
            posts.map((post) => {
              return (
                <div
                  id="user_post"
                  className=" bg-white shadow-lg rounded"
                  key={post.post_id}
                >
                  <div id="imagepost" className="font-gsr">
                    <img
                      className="w-100 w-full h-full rounded"
                      alt=""
                      src={post.photo_img}
                    />
                    {post.user_id === user_id && (
                      <div
                        id="upperleft"
                        className="bg-gradient-to-r from-teal-400 to-lime-400 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 rounded-full h-8"
                      >
                        <button
                          onClick={() => handleDropdownToggle(post.post_id)}
                        >
                          <HiDotsVertical className="text-3xl shadow-lg " />
                        </button>

                        {dropdownVisible === post.post_id && (
                          <div id="dropdown-list">
                            <EditPost post={post} />
                            <button
                              onClick={() => handleDeletePost(post.post_id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    <div id="lowerleft" className="tracking-wide">
                      <div>
                        <img
                          className="w-12 border-2 h-11 rounded-full"
                          src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <div>
                          Posted by{" "}
                          <span className="font-bold">{post.username}</span>
                        </div>
                        <div>
                          {formatDistanceToNow(parseISO(post.created_at), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>

                    <div
                      id="upperright"
                      className="font-gsr font-bold tracking-wider"
                    >
                      {post.ongoing_count} <span>are going</span>
                    </div>
                  </div>
                  <div className="h-auto">
                    <p id="yellowpost" className="w-11 font-gsr text-white ">
                      {post.category}
                    </p>
                    <p id="interestpost" className="font-gsr font-bold">
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
                            "MMM d, yyyy h:mm a, EEE"
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
                        Group Limit:
                        <span className="font-gsr font-bold">
                          {" "}
                          {post.max_users}
                        </span>
                      </div>
                    </div>

                    <div className="h-full">
                      <div className="text-2xl ml-[3.20rem]">
                        {!isHovered && post.ongoing_count >= post.max_users ? (
                          <div className="toggle-container mb-[0.35rem] font-bold">
                            {post.user_id !== user_id &&
                            post.is_joined_already ? (
                              <div
                                id="joinbutton"
                                className="pt-7 font-gsr text-center text-[#AFAFAF]"
                                onMouseEnter={OpenHover}
                              >
                                Slots Full
                              </div>
                            ) : (
                              <div
                                id="joinbutton"
                                className="pt-7 font-gsr text-center text-[#AFAFAF]"
                              >
                                Slots Full
                              </div>
                            )}
                          </div>
                        ) : isHovered &&
                          post.is_joined_already &&
                          post.ongoing_count >= post.max_users ? (
                          <div className="toggle-container">
                            <div
                              className={`toggle-button2 leave ${
                                post.is_joined_already ? "active" : ""
                              }`}
                            >
                              <button
                                onClick={() => {
                                  handleLeave(post.post_id);
                                }}
                                onMouseLeave={CloseHover}
                              >
                                <div className="flex pt-4">
                                  <div
                                    id="joinbutton"
                                    className="pl-[6rem] pt-3 pr-5 font-gsr"
                                  >
                                    You are going to this chillout. See you!
                                  </div>
                                  <div className="text-[#EBA51D] bg-white rounded-2xl w-8 ml-11">
                                    <FaChevronLeft className="mt-1 ml-[0.17rem]" />
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : post.user_id == user_id &&
                          post.ongoing_count < post.max_users ? (
                          <div className="h-[74px]"></div>
                        ) : post.is_joined_already ? (
                          <div className="toggle-container">
                            <div
                              className={`toggle-button2 leave ${
                                post.is_joined_already ? "active" : ""
                              }`}
                            >
                              <button
                                onClick={() => {
                                  handleLeave(post.post_id);
                                }}
                              >
                                <div className="flex pt-4">
                                  <div
                                    id="joinbutton"
                                    className="pl-[6rem] pt-3 pr-5 font-gsr"
                                  >
                                    You are going to this chillout. See you!
                                  </div>
                                  <div className="text-[#EBA51D] bg-white rounded-2xl w-8 ml-11">
                                    <FaChevronLeft className="mt-1 ml-[0.17rem]" />
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="toggle-container">
                            <div
                              className={`toggle-button join ${
                                !post.is_joined_already ? "active" : ""
                              }`}
                            >
                              <button
                                onClick={() => {
                                  handleJoin(post.post_id);
                                }}
                              >
                                <div className="flex gap-1 pt-4">
                                  <div
                                    id="joinbutton"
                                    className="pl-7 pt-3 pr-5 font-gsr"
                                  >
                                    Click to Join
                                  </div>
                                  <div className="text-[#EBA51D] bg-white rounded-2xl w-8">
                                    <FaChevronRight className="mt-1 ml-[0.35rem]" />
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center mt-4">
                        <ViewAttendees />
                      </div>
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
