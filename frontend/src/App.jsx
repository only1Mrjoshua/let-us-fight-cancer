import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Donate from './pages/Donate/Donate'
import PatientDetails from './pages/PatientDetails/PatientDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
      </Routes>
    </Router>
  )
}

export default App