import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ViewAttendees = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [postUsers, setPostUsers] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8000/post_users/${props.post.post_id}`, {
        headers: { Authorization: localStorage.getItem("jwt")},
      })
      .then((response) => {
        setPostUsers(response.data)
      })
  }, [props.post.post_id])

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function generateRandomGradientColor() {
    const r1 = Math.floor(Math.random() * 256);
    const g1 = Math.floor(Math.random() * 256);
    const b1 = Math.floor(Math.random() * 256);
    const r2 = Math.floor(Math.random() * 256);
    const g2 = Math.floor(Math.random() * 256);
    const b2 = Math.floor(Math.random() * 256);

    return `linear-gradient(to right, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`;
  }
  
  
  return (
    <>
      <button
        className="font-bold underline"
        id="yellow"
        onClick={toggleModal}
      >
        View Attendees
      </button>
      {showModal && (
        <div id="viewattendees" className='show'>
            <div className='w-full h-1/2 grid grid-rows-5 gap-5 grid-cols-5'>
              {postUsers.map((users) => {
                return (
                <div id='viewusers' className='text-white flex' style={{ background: generateRandomGradientColor() }}>
                  <div className='ml-1 mt-1 mb-1'>
                        <img
                          className="w-16 border-2 h-16 rounded-full"
                          src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                          alt=""
                        />
                  </div>
                  <div className='text-xl ml-4 pt-5'>
                    <span className='font-gsr font-bold'>{users.username}</span>
                  </div>
                </div>
                )
              })
            }
            </div>
                <button onClick={toggleModal}>Close</button>


        </div>
      )}
    </>
  );
};

export default ViewAttendees;
