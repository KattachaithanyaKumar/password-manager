import React from 'react'
import { auth, provider } from '../../../firebase'
import { signInWithPopup, signOut, signInWithRedirect } from 'firebase/auth'
import "./login.css"
import { useNavigate } from 'react-router-dom'

import login_img from "../../assets/login-image.png"

const Login = () => {
  console.log(auth?.currentUser?.email);

  const navigate = useNavigate();

  async function signInWithGoogle()  {
    try {
      const res = await signInWithPopup(auth, provider);
      localStorage.setItem("currentUser", JSON.stringify(res.user))
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