import React from 'react'
import { auth, provider } from '../../../firebase'
import { signInWithPopup, signOut, signInWithRedirect } from 'firebase/auth'
import "./login.css"
import { useNavigate } from 'react-router-dom'
import client from '../../client'

import login_img from "../../assets/login-image.png"

const Login = () => {
  // console.log(auth?.currentUser?.email);

  const navigate = useNavigate();

  async function checkUser(rawData)  {
    // console.log("user: ", JSON.parse(rawData));

    const userData = JSON.parse(rawData);
    // console.log("email: ", userData?.email)

    try {
      const data = await client.fetch(`*[_type == 'user']`);
      console.log("check: ", data);
      let mappedData = Object.entries(data).map(([key, value]) => {
          return {id: key, ...value};
      })

      const found = mappedData.find(user => user.email === userData?.email) !== undefined;
      console.log("found: ", found);

      // console.log("mapped: ", mappedData);

      if (!found)  {
        const newUser = await client.create({
          _type: "user",
          name: userData.displayName,
          email: userData.email,
          password: [],
        })
      }

    }catch(err) {
      console.error(err)
    }
  }

  async function signInWithGoogle()  {
    try {
      const res = await signInWithPopup(auth, provider);
      //check if user already exists
      checkUser(JSON.stringify(res.user));
      
      localStorage.setItem("currentUser", JSON.stringify(res.user));
      localStorage.setItem("profile", JSON.stringify(res.user.photoURL));

      navigate("/home")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <h1>Password Manager</h1>
        <img src={login_img} alt="login image" />
        <button onClick={signInWithGoogle}>Sign Up</button>
      </div>
      <p className='credit'>Illustration by Icons 8 from Ouch!</p>
    </div>
  )
}

export default Login