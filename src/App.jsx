import { PetProvider } from './context/PetContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PetList from './pages/PetList'
import AddPet from './pages/AddPet'
import AppNavbar from './components/AppNavbar'

function App() {
  return (
    <PetProvider>
      <BrowserRouter>
        <AppNavbar />
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
