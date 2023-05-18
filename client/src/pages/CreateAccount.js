import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import myimage from "../pages/images/logo/logo.png"
const CreateAccount = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState("")
  
  const createAccount = (event) => {
    event.preventDefault();
    if (username !== '' && email !== '' && firstName !== '' && lastName !== '' && contactNo !== '' && password !== '') {
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
          console.log(response.data);
          localStorage.setItem('jwt', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('user_id', response.data.user_id)
          navigate("/home")
        })
        .catch(function (error) {
          console.log(error);
        });
    }else {
        alert('Fill up all the details!')
    }
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (regex.test(event.target.value)) {
      setIsValidEmail(true);
      setEmail(event.target.value) 
    }else {
      setInvalidEmail('Invalid email!')
      setIsValidEmail(false)
    }
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
        <form onSubmit={createAccount}>
          <div className="fixed inset-0 z-40 bg-bglogin bg-cover"></div>
          <div className="justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mr-52 ml-3">
            <div className="relative w-2/5 h-4/5 max-w-3xl">
              
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 w-4/5 max-w-4xl">
                  <img
                    className="w-52"
                    src={myimage}
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
                      minlength="2"
                      maxlength="30"
                      placeholder="Username"
                      onChange={handleChangeUsername}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="email1" value="Email/Username"/>
                    </div>
                    
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="email1"
                      type="email"
                      placeholder="Email"
                      onChange={handleChangeEmail}
                      required={true}
                      />
                    {!isValidEmail ? <div>{invalidEmail}</div> : null}
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <label htmlFor="firstName" value="First Name" />
                    </div>
                    <input
                      className="w-80"
                      id="email1"
                      type="text"
                      placeholder="First name"
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
                      placeholder="Last name"
                      onChange={handleChangeLastName}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="mt-4 mb-2 block">
                      <label htmlFor="contactNo" value="Contact Number"/>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="contact1"
                      type="tel"
                      minlength="11"
                      maxlength="13"
                      placeholder="Mobile Number"
                      pattern="[09]{2}[0-9]{9}|[+639]{4}[0-9]{9}"
                      onChange={handleChangeContactNo}
                      required={true}
                      />
                      </div>
                  </div>
                  <div>
                    <div className="mt-4 mb-2 block">
                      <label htmlFor="password1" value="Password" />
                    </div>
                    <input
                      className="w-80 border-x-0 border-t-0"
                      id="password1"
                      type="password"
                      placeholder="Password"
                      onChange={handleChangePassword}
                      required={true}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="items-center p-6 border-t border-solid border-slate-200">
                  <div id='createaaccount'>
                  <button
                    type="submit"
                  >
                    Create Account
                  </button>
                  </div>
                  <div>
                    Already have an account?
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <span>Login</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default CreateAccount;
