import React, { useEffect, useState } from "react";
import axios from "axios";

const EditPost = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoriesList, setCategoriesList] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [description, setDescription] = useState("");
  const [datetime, setDateTime] = useState("")
  const [section, setSection] = useState("");
  const [venue, setVenue] = useState("");
  const [maxUsers, setMaxUsers] = useState("");

  useEffect(() => {
    console.log(props.post, "THIS IS THE ONE")
    if (typeof props.post != "undefined") {
      console.log(props.post, "THIS IS THE ONE");
      console.log(props.post.start_at, "THIS IS START_AT")
      setSectionList(props.post.interest);
      setDescription(props.post.description);
      const date = new Date(props.post.start_at)
      const phOffset = 8; // Offset from UTC for PH is +8
      const phTime = date.getTime() + phOffset * 60 * 60 * 1000;
      const phDate = new Date(phTime);
      // const localDateString =  date.toLocaleString('ko-KR', { timeZone: 'UTC' })
      // const localDate = new Date(localDateString)
      const localeISOString = phDate.toISOString().slice(0,-5)
      setDateTime(localeISOString)
      setVenue(props.post.venue);
      setMaxUsers(props.post.max_users);

    }
  }, [props.post]);
  const editPost = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8000/posts/${props.post.post_id}`,
        {
          section: section,
          description: description,
          datetime: datetime,
          venue: venue,
          max_users: maxUsers,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(function (response) {
        props.fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowEditModal(false);
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

  const handleChangeMaxUsers = (event) => {
    setMaxUsers(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories", {
        headers: { Authorization: localStorage.getItem("jwt") },
      })
      .then((response) => {
        console.log(localStorage.getItem("jwt"));
        console.log(response.data);
        setCategoriesList(response.data);
        axios
          .get(
            `http://localhost:8000/categories/${props.post.category_id}/category_types`,
            {
              headers: { Authorization: localStorage.getItem("jwt") },
            }
          )
          .then((response) => {
            console.log(props.post.category_type_id);
            console.log(response.data);
            setSectionList(response.data);
            // setSection(response.data[0].id);
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
        console.log("CreatePost");
        console.log(response.data);
        setSectionList(response.data);
        setSection(response.data[0].id);
      });
  };

  return (
    <>
      <button onClick={() => setShowEditModal(true)}>Edit</button>
      {showEditModal ? (
        <form onSubmit={editPost}>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/5 h-4/5 max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-4/5 max-w-4xl">
                  <h3 className="text-3xl font-semibold">Edit Post</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <select
                      className="w-80 border-x-0 border-t-0"
                      id="category"
                      onChange={handleCategoryChange}
                      required={true}
                    >
                      {categoriesList?.map((category) => {
                        if (category.name === props.post.category) {
                          return (
                            <option
                              selected="selected"
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          );
                        } else {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>

                  <div>
                    <select
                      className="w-80 border-x-0 border-t-0"
                      id="section"
                      onChange={handleChangeSection}
                      required={true}
                    >
                      {sectionList?.map((section) => {
                        console.log("tracking section");
                        console.log(section.name, props.post.interest);
                        console.log(section.name === props.post.interest);
                        if (section.name === props.post.interest) {
                          return (
                            <option
                              selected
                              key={section.id}
                              value={section.id}
                            >
                              {section.name}
                            </option>
                          );
                        } else {
                          return (
                            <option key={section.id} value={section.id}>
                              {section.name}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>

                  <div>
                    <textarea
                      className="w-80 border-x-0 border-t-0"
                      id="description"
                      type="textarea"
                      value={description}
                      rows="3"
                      maxLength="50"
                      placeholder="Post message"
                      onChange={handleChangeDescription}
                      required={true}
                    />
                  </div>
                  <div>
                    {/* when clicked, open calendar */}
                    <input
                      className="w-80 border-x-0 border-t-0 text-lg"
                      id="started_at"
                      type="datetime-local"
                      value={datetime}
                      onChange={handleChangeDateTime}
                      required={true}
                    />
                  </div>

                  <div>
                    
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="venue"
                      type="text"
                      placeholder="Venue"
                      value={venue}
                      onChange={handleChangeVenue}
                      required={true}
                    />
                  </div>
                  <div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="hide-arrow"
                      type="number"
                      min={2}
                      max={99}
                      value={maxUsers}
                      placeholder="Group Limit: 2-99"
                      onChange={handleChangeMaxUsers}
                      required={true}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button id="green"
                    className="text-white font-bold uppercase text-sm px-6 rounded shadow hover:shadow-lg mr-1 -mt-3"
                    type="submit"
                  >
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};
export default EditPost;
