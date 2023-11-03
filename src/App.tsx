import{Routes, Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/SignUp"
import PageNotFound from "./pages/error/NotFound"
import './App.css'
import { ToastContainer } from "react-toastify"
import Dashboard from "./pages/Dashboard"

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/'element={<Login/>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/dashboard'element={<Dashboard/>}/>
      <Route path='*'element={<PageNotFound/>}/>
      

    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
