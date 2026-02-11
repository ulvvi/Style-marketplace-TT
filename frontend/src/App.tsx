import { useState } from 'react'
import { BrowserRouter } from "react-router"
import { Home } from './pages/Home'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
    </>
  )
}

export default App
