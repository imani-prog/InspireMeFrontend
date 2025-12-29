import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SavedPage from './pages/SavedPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App
