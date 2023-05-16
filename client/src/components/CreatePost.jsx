import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const CreatePost = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [categoriesList, setCategoriesList] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [description, setDescription] = useState("");
  const [datetime, setDateTime] = useState("");
  const [section, setSection] = useState("");
  const [venue, setVenue] = useState("");

  const d = new Date();

  const createPost = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8000/posts",
        {
          section: section,
          description: description,
          datetime: datetime,
          venue: venue,
          created_at: d,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowModal(false);
  };

  const handleChangeSection = (event) => {
    setSection(Number(event.target.value));
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeDateTime = (event) => {
    setDateTime(event.target.value);
  };

  const handleChangeVenue = (event) => {
    setVenue(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        console.log(localStorage.getItem("jwt"))
        console.log(response.data);
        setCategoriesList(response.data);
        axios
          .get(`http://localhost:8000/categories/1/category_types`, {
            headers: { Authorization: localStorage.getItem("jwt") },
          })
          .then((response) => {
            console.log(response.data);
            setSectionList(response.data);
            setSection(response.data[0].id);
          });
      });
  }, []);

  const handleCategoryChange = (event) => {
    // const name_index = event.target.selectedIndex
    // const name = document.getElementById('category').options[name_index].text
    // alert(`you selected category ${name} with category_id ${event.target.value}`)
    axios
      .get(
        `http://localhost:8000/categories/${event.target.value}/category_types`,
        { headers: { Authorization: localStorage.getItem("jwt") } }
      )
      .then((response) => {
        console.log("this one");
        console.log(response.data);
        setSectionList(response.data);
        setSection(response.data[0].id);
      });
  };

  return (
    <>
      <button
        className="flex"
        id="createpostbutton"
        onClick={() => setShowModal(true)}
      >
        <div id="plus" className="font-bold">
          <AiOutlinePlus />
        </div>
        <div id="createpost" className="font-bold font-gsr mt-1 tracking-wider">
          Post a Chillout
        </div>
      </button>
      {showModal ? (
        <>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/5 h-4/5 max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-4/5 max-w-4xl">
                  <h3 className="text-3xl font-semibold">Create Post</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="category" value="category" />
                    </div>
                    <select
                      className="w-80 border-x-0 border-t-0"
                      id="category"
                      onChange={handleCategoryChange}
                      required={true}
                    >
                      {categoriesList.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="section" value="section" />
                    </div>
                    <select
                      className="w-80 border-x-0 border-t-0"
                      id="section"
                      onChange={handleChangeSection}
                      required={true}
                    >
                      {sectionList.map((section) => {
                        return (
                          <option key={section.id} value={section.id}>
                            {section.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="description" value="Post message" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="description"
                      type="text"
                      placeholder="post message"
                      onChange={handleChangeDescription}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="started_at" value="started_at">
                        dawda
                      </label>
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="started_at"
                      type="datetime-local"
                      placeholder="datetime"
                      onChange={handleChangeDateTime}
                      required={true}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="venue" value="venue" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="venue"
                      type="text"
                      placeholder="Venue"
                      onChange={handleChangeVenue}
                      required={true}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={createPost}
                  >
                    Post!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default CreatePost;
