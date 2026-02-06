import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBox } from './components/EntranceBox'
import { SignUp } from './pages/signUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </>
  )
}

export default App
