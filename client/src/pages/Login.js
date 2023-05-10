import React, { useState } from "react";
import { Label, TextInput, Checkbox } from "flowbite-react";
import CreateAccount from "./CreateAccount";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // const [username, setUsername] = useState('')
  // const [email, setEmail] = useState('')
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // const loginPage = async event => {
  //   event.preventDefault()
  //   try {
  //     const response = await axios.post('http://localhost:8000/auth', {
  //       username: username,
  //       password: password,
  //     })

  //     console.log(response)
  //     navigate('/')
  //   } catch (error) {
  //     console.log(error)
  //     alert(error.response.data)
  //   }
  // }

  const loginPage = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/auth", {
        // username: username,
        // email: email,
        usernameOrEmail: name,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data);
      });
  };

  const handleChange = (event) => {
    // setUsername(event.target.value)
    // setEmail(event.target.value)
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="h-screen flex bg-bglogin bg-cover">
      <div className="h-full w-1/2">
        {/* <Carousel>
      <img
        src="https://i.pinimg.com/originals/d4/b2/75/d4b275b49306f9b1d1c9b56a98a48878.gif"
        alt="..."
        className="w-full h-full object-fit-contain brightness-75"
      />
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmI3N2QyMzQwYTcyMGM3Njg0ZDQyNjhhZWZmMTJhNjgwYjM1NWIzYSZjdD1n/xT5LMyhwQOTZQHszTi/giphy.gif"
        alt="..."
        className="w-full h-full object-fit-contain brightness-75"
      />
      <img
        src="https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="..."
        className="w-full h-full object-fit-contain brightness-75"
      />
      <img
        src="https://images.pexels.com/photos/3772302/pexels-photo-3772302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="..."
        className="w-full h-full object-fit-contain brightness-75"
      />
      <img
        src="https://www.wallart.com/media/catalog/product/cache/296967dd00486cb8867f6b6fbb192224/w/0/w03204-small.jpg"
        alt="..."
        className="w-full h-full object-fit-contain brightness-75"
      />
    </Carousel> */}
      </div>
      <div className="absolute top-32 right-64 w-80 ...">
        <img
          src="https://cdn.discordapp.com/attachments/818821918303715350/1105451216223354910/logo.png"
          alt=""
        />
      </div>

      <div className="absolute top-72 right-5 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white font-gsr text-lg ...">
        <p>
          connect with people through <span id="yellow">hangouts</span> in your
          area
        </p>
      </div>
      <div className="h-full w-1/2 flex items-center justify-center">
        <form className="flex flex-col gap-4">
          <div className="-ml-10 mt-56">
            <div className="mb-2 block">
              <Label
                className="text-zinc-300 text-xs font-gsr"
                htmlFor="email1"
                value="Username or Email"
              />
            </div>
            <TextInput
              className="w-80"
              id="email1"
              type="email"
              placeholder="Enter username or email"
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="-ml-10">
            <div className="mb-2 block">
              <Label
                className="text-zinc-300 text-xs font-gsr"
                htmlFor="password1"
                value="Password"
              />
            </div>
            <TextInput
              className="w-80"
              id="password1"
              type="password"
              placeholder="Enter password"
              onChange={handleChangePassword}
              required={true}
            />
          </div>
          <div className="flex items-center gap-2 mb-2 mt-2 -ml-10">
            <Checkbox id="remember" />
            <Label
              className="text-zinc-300 me-20 text-xs font-gsr mt-2"
              htmlFor="remember"
            >
              Remember me
            </Label>
            <button
              id="yellow"
              className="underline text-xs ml-9 font-gsr font-bold mt-2"
            >
              {" "}
              Forgot password?{" "}
            </button>
          </div>

          <button
            onClick={loginPage}
            id="ybut"
            className="flex text-zinc-300 justify-center rounded w-32 h-10 ml-14 pt-3 font-gsr font-bold text-base"
            type="submit"
            href="/home"
          >
            Log in
          </button>
          <span className="text-center text-zinc-300 text-xs font-gsr font-bold -ml-8 mt-4">
            Don't have an account? <CreateAccount />{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
