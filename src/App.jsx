import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home'
import WeddingMap from './pages/Footer'
import Invitation from './pages/Invitation'

function App() {
  return(
    <>
      <Invitation/>
      <WeddingMap/>
    </>
  )
}

export default App
