import React from "react";
import Filters from "./Filters";
import CreatePost from "./CreatePost";
import { HiOutlinePlus } from "react-icons/hi";
import PostItem from "./PostItem";

const Posts = ({ posts, fetchPosts, showLocation }) => {

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
        <div id="locationpost" className="font-gsr mt-9 ml-2">
          Showing ongoing chillouts around
          <span id="darkyellow" className="font-bold">
            {" "}
            {showLocation}
            {/* {console.log(showLocation, "SHOW LOCATION")} */}
          </span>
        </div>
        <div className="">
          <Filters />
        </div>
        <div id="allposts" className="grid grid-cols-2">
          {posts.length === 0 ? (
            <div
              id="user_post2"
              className="shadow-2xl text-center font-gsr text-[26px] py-[50%] text-[#AFAFAF]"
            >
              <div className="mx-[46%] mb-4 text-[48px]">
                <HiOutlinePlus />
              </div>
              <div className="font-bold">Post a Chillout</div>
            </div>
          ) : (
            posts.map((post) => {
              return <PostItem post={post} key={post.post_id} fetchPosts={fetchPosts}/>
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
