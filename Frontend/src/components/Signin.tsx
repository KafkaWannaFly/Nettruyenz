import React, { useState } from 'react';
import PropTypes from 'prop-types';
import imgLogin from "../logos/imgLogin.png";
import imgTest from "../logos/testLogin.jpg";
import logo1 from "../logos/fox.png";

async function loginUser(credentials) {
  return fetch('http://localhost:3001/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}
export default function Signin({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(false);
  }
  return (
    //   <div className="login-wrapper">
    //     <h1>Please Log In</h1>
    //     <form onSubmit={handleSubmit}>
    //       <label>
    //         <p>Username</p>
    //         <input type="text"/>
    //       </label>
    //       <label>
    //         <p>Password</p>
    //         <input type="password"/>
    //       </label>
    //       <div>
    //         <button type="submit">Submit</button>
    //       </div>
    //     </form>
    //   </div>


    // <div className="container flex flex-wrap">
    //   <div className="w-1/2 h-full bg-white">
    //     <img className="w-full h-96 pl-10" src={imgLogin}>
    //     </img>
    //   </div>
    //   <div className="w-1/2 h-full bg-red-700">
    //     asdhgasgh
    //   </div>
    // </div>
    <div className="">
      <main className="max-w-70rem bg-gray-600 max-h-full mx-auto my-10 rounded-lg shadow-2xl flex">
        <div className="w-1/2">
          <img src={imgLogin}></img>
        </div>
        <div className="w-1/2 justify-center pt-6 pr-10 items-center text-white">
          <div className="flex justify-end p-10 text-xl">
            <div className="px-3">
              <button>Sign in</button>
            </div>
            <div>
              <button>Sign up</button>
            </div>
          </div>
          <section className="text-center pt-2 pb-4 flex items-center justify-center">
            <img className="w-24 h-24 pr-2" src={logo1} alt="" />
            <h3 className="font-bold text-6xl">WELCOME</h3>
          </section>
          <section className="mt-10 px-4 bg-gray-600">
            <form className="flex flex-col" method="POST" action="#">
              <div className="mb-3 pt-2 px-5 rounded-lg  border-2">
                <input type="text" id="email" className=" rounded w-full text-white focus:outline-none  transition duration-500 px-3 pb-3"></input>
              </div>
              <div className="mb-6 pt-2 px-5 rounded-lg border-2">
                <input type="password" id="password" className="bg-gray-200 rounded transition duration-500 px-3 pb-3"></input>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

Signin.propTypes = {
  setToken: PropTypes.func.isRequired
};