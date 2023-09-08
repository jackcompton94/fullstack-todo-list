import React, {useState} from "react";
import './styles/core.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Form from "./components/Form";


// TODO: Start building webpage flow: Register -> Login -> Access list manager
const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (username, password) => {
    setUsername(username)
    setPassword(password)
  }

  // const handleLogout = () => {
  //   setUser(null)
  // }

  return (
    <BrowserRouter>
    <Routes>
      <Route 
        path="/" 
        element={<Login 
        onLogin={handleLogin}/>} /> 
      {username && (
        <Route 
          path="/form" 
          element={<Form username={username} />} 
        />
      )}
    </Routes>
    </BrowserRouter>
  )
}

export default App;
