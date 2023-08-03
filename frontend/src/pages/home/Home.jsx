import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import "./home.css"

import Navbar from '../navbar/Navbar'

const Home = () => {
  const { userModel, setUserModel } = useContext(UserContext);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    console.log("raw data: " , JSON.parse(localStorage.getItem("currentUser")))
    setProfile(JSON.parse(localStorage.getItem("currentUser")));
  }, [])
  
  return (
    <div>
      <Navbar />
      <div className='home'>
        <div className="home-left">
          <div className="profile">
            <img src={profile?.photoURL} alt="" />
            <h2>{profile?.displayName}</h2>
          </div>
        </div>
        <div className="home-right">

        </div>
      </div>

      <div className="add-pass">
        <h1>+</h1>
      </div>
    </div>
  )
}

export default Home