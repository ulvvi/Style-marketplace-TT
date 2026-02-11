import { useState } from 'react'
import { BrowserRouter } from "react-router"
import { Home } from './pages/Home'
import './App.css'
import { Profile } from './pages/Profile'

function App() {
  return (
    <>
    <BrowserRouter>
      <Profile/>
    </BrowserRouter>
    </>
  )
}

export default App
