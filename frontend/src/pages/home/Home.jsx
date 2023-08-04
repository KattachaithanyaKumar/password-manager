import React, { useContext, useDeferredValue, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import "./home.css"
// import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import Navbar from '../navbar/Navbar'
import { toast } from 'react-hot-toast';
import client from '../../client';
import { v4 as uuidv4 } from "uuid";

const antIcon = <LoadingOutlined style={{ fontSize: 84, color: "white" }} spin />;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userModel, setUserModel } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState([]);

  //user password
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  
  async function fetchPasswords()  {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      setEmail(userData.email);
      const res = await client.fetch(`*[_type == "password"]`);
      const mappedData = Object.entries(res).map(([key, value]) => {
        return {id: key, ...value};
      })
      console.log("email: ", email);
      const pass = mappedData.filter(i => i.userEmail === email)
      console.log("passwords: ", pass);
      setPasswords(pass);
    }catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function getUserData()  {
      const loggedIn = localStorage.getItem("loggedIn");
      if (loggedIn == "false")  {
        toast.error("user not logged in")
        console.log("user not logged in")
        navigate("/")
      }
      
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      setImage(JSON.parse(localStorage.getItem("profile")));
      // console.log("raw data: " , userData)
      setProfile(userData);

      setLoading(false);
    }
    fetchPasswords();
    getUserData();
  }, [])

  useEffect(() => {
    fetchPasswords();
  }, [isModalOpen])

  async function handleSubmit()  {
    try {

      if (title === "" && name === "" && password === "")  {
        toast.error("enter details first");
        setIsModalOpen(false);
        return false;
      }
      console.table(title, name, password);

      const userData = JSON.parse(localStorage.getItem("currentUser"));
      console.log("user data: " , userData)
      
      const userEmail = userData.email;

      const query = `*[_type == 'user' && email == $userEmail][0]`
      const user = await client.fetch(query, { userEmail });
      console.log("check: ", user);
      
      const passKey = uuidv4().toString();
      
      const newPassoword = await client.create({
        _type: "password",
        _key: passKey,
        title,
        name, 
        password,
        userEmail,
      })
      
      const updatedPasswords = [...(user?.password || []), { _type: "reference", _ref: newPassoword._id, _key: passKey }]
      
      await client.patch(user?._id).set({ password: updatedPasswords }).commit({ waitForCommit: true });
      
      toast.success("password added successfully")
      setTitle("");
      setName("");
      setPassword("");
      console.log("new pass", newPassoword)
      
      setIsModalOpen(false);
      return newPassoword;
    }catch (err) {
      console.error(err);
    }
  }

  
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
              {passwords?.map((item, index) => (
                <div key={index} className='passwords-container'>
                  <h1>Title: {item.title}</h1>
                  <p>Name: {item.name}</p>
                  <p className='password'>Password: {item.password}</p>
                </div>
              ))}
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
              <div className='form'>
                <input 
                  type="text" 
                  placeholder='Title' 
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input 
                  type="text" 
                  placeholder='Name'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}  
                />
                <input 
                  type="password"  
                  placeholder='Password' 
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}  
                />
                <div className="inputs">
                  <button onClick={() => setIsModalOpen(false)}>Close</button>
                  <button onClick={handleSubmit}>Add</button>
                </div>
              </div>
            </div>
          }

        </div>
      )}
    </div>
  )
}

export default Home