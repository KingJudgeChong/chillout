import React, { useState } from "react";
import { Label, TextInput, Checkbox, Button, Carousel } from "flowbite-react";
import CreateAccount from "./CreateAccount";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
	const loginPage = (event) => {
    event.preventDefault()
		axios.post("http://localhost:8000/auth", {
			username: username,
      password: password
		}).then(function (response) {
			console.log(response)
      // alert('correct password')
      navigate('/')
      
		}).catch(function (error) {
			console.log(error)
      alert('wrong password')
		})
  }

  const handleChangeUsername = (event => {
    setUsername(event.target.value)
  })

  const handleChangePassword = (event => {
    setPassword(event.target.value)
  })


  return (
    <div className="h-screen flex">
  <div className="h-full w-1/2">
    <Carousel>
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
    </Carousel>
    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-base italic ... font-bold">
        Connect with people through Hangouts or Sports in your area.
      </div>
  </div>
<div className="absolute top-0 right-0 w-25 ... font-snow p-5 text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-blue-500">
      ChillOut
    </div>
  
  <div className="h-full w-1/2 flex items-center justify-center bg-gradient-to-b from-white to-blue-400">
    
    <form className="flex flex-col gap-4" >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email/Username" />
        </div>
        <TextInput className='w-80 border-x-0'
          id="email1"
          type="email"
          placeholder="Enter username or email"
          onChange={handleChangeUsername}
          required={true}
        />
      </div>
      <div>
        <div className="mt-4 mb-2 block">
          <Label htmlFor="password1" value="Password" />
        </div>
        <TextInput id="password1" type="password" placeholder="Enter password" onChange={handleChangePassword} required={true} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Checkbox id="remember" />
        <Label className="me-20" htmlFor="remember">Remember me</Label>
        <button className="underline text-sm"> Forgot password? </button>
      </div>
      
      <Button onClick={loginPage}className="bg-neutral-950 flex" type="submit" href="/">
        Log in
      </Button>
      <span className="text-center">Don't have an account? <CreateAccount/>  </span>
    </form>
  </div>
</div>

  );
};

export default Login;
