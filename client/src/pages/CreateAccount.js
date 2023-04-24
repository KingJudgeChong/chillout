import React from "react";
import { useState } from 'react'
import axios from 'axios'

const CreateAccount = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createAccount = (event) => {
		event.preventDefault()
		axios.post("http://localhost:8000/add-user", {
			username: username,
			email: email,
            password: password
		}).then(function (response) {
			console.log(response)
		}).catch(function (error) {
			console.log(error)
		})
	} 
  
  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <button
        className="font-bold underline"
        onClick={() => setShowModal(true)}
      >
        Sign up for free
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
                  <h3 className="text-3xl font-semibold">Create Account</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="username" value="username" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="username"
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
