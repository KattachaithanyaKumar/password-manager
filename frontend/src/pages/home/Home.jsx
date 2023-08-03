import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import "./home.css"
// import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Modal } from 'antd';

import Navbar from '../navbar/Navbar'

const antIcon = <LoadingOutlined style={{ fontSize: 84, color: "white" }} spin />;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userModel, setUserModel } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getUserData()  {
      const userData = localStorage.getItem("currentUser");
      setImage(JSON.parse(localStorage.getItem("profile")));
      console.log("raw data: " , JSON.parse(localStorage.getItem("currentUser")))
      setProfile(JSON.parse(localStorage.getItem("currentUser")));

      setLoading(false);
    }
    getUserData();
  }, [])
  
  return (
    <div>
      {loading ? (
        <div className='loading-container'>
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className='home'>
            <div className="home-left">
              <div className="profile">
                {image && <img src={image} alt="" />}
                <h2>{profile?.displayName}</h2>
              </div>
            </div>
            <div className="home-right">

            </div>
          </div>

          <div className="add-pass" onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}>
            <h1>+</h1>
          </div>

          {isModalOpen && 
            <div className='modal'>
              <h2>Add Password here</h2>
              <form>
                <input type="text" placeholder='Title' />
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Password' />
                <div className="inputs">
                  <button onClick={() => setIsModalOpen(false)}>Close</button>
                  <button>Add</button>
                </div>
              </form>
            </div>
          }

        </div>
      )}
    </div>
  )
}

export default Home