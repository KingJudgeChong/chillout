import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateAccount = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/add-user", {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowModal(false);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeContactNo = (event) => {
    setContactNo(event.target.value);
  };

  return (
    <>
      <button
        className="font-bold underline"
        id="yellow"
        onClick={() => setShowModal(true)}
      >
        Create Account
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-40 bg-bglogin bg-cover"></div>
          <div className="justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mr-52 ml-3">
            <div className="relative w-2/5 h-4/5 max-w-3xl">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 w-4/5 max-w-4xl">
                  <img
                    className="w-52"
                    src="https://cdn.discordapp.com/attachments/818821918303715350/1105451216223354910/logo.png"
                    alt=""
                  />
                </div>
                <div className="absolute top-40 right-44 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white font-gsr text-2xl ...">
                  <p>
                    Begin the <span id="yellow">fun</span> with us!
                  </p>
                  <span className="text-sm text-zinc-300 -ml-10">
                    Complete the form to proceed
                  </span>
                </div>

                <div className="relative p-6 flex-auto mt-11 -ml-44">
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="username" value="username" />
                    </div>
                    <input
                      className="w-80"
                      id="email1"
                      type="text"
                      placeholder="Enter username"
                      onChange={handleChangeUsername}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="email1" value="Email/Username" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="email1"
                      type="email"
                      placeholder="Enter email"
                      onChange={handleChangeEmail}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="firstName" value="First Name" />
                    </div>
                    <input
                      className="w-80"
                      id="email1"
                      type="text"
                      placeholder="Enter first name"
                      onChange={handleChangeFirstName}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="lastName" value="Last Name" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="email1"
                      type="text"
                      placeholder="Enter last name"
                      onChange={handleChangeLastName}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mt-4 mb-2 block">
                      <label htmlFor="contactNo" value="Contact Number" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="email1"
                      type="text"
                      placeholder="Enter contact number"
                      onChange={handleChangeContactNo}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mt-4 mb-2 block">
                      <label htmlFor="password1" value="Password" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="password1"
                      type="password"
                      placeholder="Enter password"
                      onChange={handleChangePassword}
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
                    onClick={createAccount}
                  >
                    Sign Up
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

export default CreateAccount;
