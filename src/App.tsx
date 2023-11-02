import{Routes, Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Login"
import PageNotFound from "./pages/error/NotFound"
import './App.css'
import { ToastContainer } from "react-toastify"

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/'element={<Login/>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='*'element={<PageNotFound/>}/>

    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
