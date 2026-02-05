import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBox } from './components/EntranceBox'
import { SignIn } from './pages/signIn'

function App() {

  return (
    <>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </>
  )
}

export default App
