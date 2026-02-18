import { useState } from 'react'
import { Home } from './pages/Home'
import { ProductInfo } from './pages/ProductInfo'
import './App.css'
import { Profile } from './pages/Profile'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'
import { SignIn } from './pages/signIn'
import { Orders } from './pages/Orders'
import { Sales } from './pages/Sales'
import { Settings } from './pages/Settings'
import { Header } from './components/Header'


function App() {

  return (
    <>
      
      <GoogleOAuthProvider clientId='623900671725-l059r7q9p91hbal82ikmqd0d2lhm7bai.apps.googleusercontent.com'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/SignIn" element={<SignIn />}/>
            <Route path="/SignUp" element={<SignUp />}/>
            <Route path="/SignIn" element={<Home />}/>
            <Route path="/" element={<Home />}/>
            <Route path="/ProductInfo" element={<ProductInfo />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Settings" element={<Settings />}/>
            <Route path="/Sales" element={<Sales />}/>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
      
    </>
  )
}

export default App
