import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PetProvider } from './context/PetContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import PetList from './pages/PetList'
import AddPet from './pages/AddPet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PetProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/add" element={<AddPet />} />
          <Route path="/edit/:id" element={<AddPet />} />
        </Routes>
        <ToastContainer position='bottom-right' />
      </BrowserRouter>
    </PetProvider>
    
  )
}

export default App
