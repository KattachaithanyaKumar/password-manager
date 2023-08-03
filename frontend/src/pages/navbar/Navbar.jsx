import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import "./nav.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  async function handleLogout()  {
    try {
      await signOut(auth);
      console.log('logged out');
      navigate("/")
    }catch(err) {
      console.error(err)
    }
  }

  return (
    <div className='nav'>
      <h1>Password Manager</h1>
      <div className="nav-credit">
        <p>made by <a href="https://github.com/KattachaithanyaKumar" target='_blank'>@Chaithanya</a></p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar