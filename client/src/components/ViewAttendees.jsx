import React, { useState } from 'react';

const ViewAttendees = (props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
        <div id="viewattendees">


            <div id="userjoined">
                {/* Modal content */}
                <button onClick={toggleModal}>Close</button>
            </div>


        </div>
      )}
    </>
  );
};

export default ViewAttendees;
