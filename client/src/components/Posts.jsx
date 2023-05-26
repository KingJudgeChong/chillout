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
import { FaChevronRight } from "react-icons/fa";

const Posts = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryTypeId = searchParams.get("categoryTypeId");
  const [posts, setPosts] = useState([]);
  const user_id = Number(localStorage.getItem("user_id"));
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
            <div id="user_post2" className="shadow-lg p-64">
              Post a chillout
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
                    <div
                      id="upperleft"
                      className="bg-[rgba(235,165,29,0.6)] rounded-full h-8"
                    >
                      <button
                        onClick={() => handleDropdownToggle(post.post_id)}
                      >
                        <HiDotsVertical className="text-3xl shadow-lg " />
                      </button>

                      {dropdownVisible === post.post_id && (
                        <div id="dropdown-list">
                          <button onClick={""}>Edit</button>
                          <button onClick={""}>Delete</button>
                        </div>
                      )}
                    </div>
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

                    <div className="h-full border-2 border-red-800">
                      {post.ongoing_count >= post.max_users ? (
                        <div className="text-center mt-10 text-2xl">
                          Max group limit reached!
                        </div>
                      ) : (
                        <div className="text-center mt-10 text-2xl">
                          {post.user_id ===
                          user_id ? null : post.is_joined_already ? (
                            <div className="toggle-container">
                              <button
                                onClick={() => {
                                  handleLeave(post.post_id);
                                }}
                                className={`toggle-button leave ${
                                  post.is_joined_already ? "active" : ""
                                }`}
                              >
                                Leave
                              </button>
                              <div
                                className={`toggle-switch ${
                                  post.is_joined_already ? "active" : ""
                                }`}
                              ></div>
                            </div>
                          ) : (
                            <div className="toggle-container">
                              <div
                                className={`toggle-switch ${
                                  !post.is_joined_already ? "active" : ""
                                }`}
                              ></div>
                              <button
                                onClick={() => {
                                  handleJoin(post.post_id);
                                }}
                                className={`toggle-button join ${
                                  !post.is_joined_already ? "active" : ""
                                }`}
                              >
                                <div className="flex gap-1">
                                  <div className="pl-5">Join</div>
                                  <div className="text-black bg-white rounded-2xl w-8">
                                    <FaChevronRight className="mt-1 ml-1" />
                                  </div>
                                </div>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="text-center">
                        <button>View attendees</button>
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
