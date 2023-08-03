import Login from './pages/login/Login'
import { auth, provider } from '../firebase'
import "./App.css"

const App = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default App