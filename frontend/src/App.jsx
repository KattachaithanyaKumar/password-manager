import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"

import { UserProvider } from './context/UserContext'
import Login from './pages/login/Login'
import Home from './pages/home/Home'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/home' element={<Home />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App