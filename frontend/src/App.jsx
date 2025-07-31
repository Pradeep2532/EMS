import React from 'react'
import Navbar from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import AddEmployee from './Pages/AddEmployee.jsx'
import UpdateEmployee from './Pages/UpdateEmployee.jsx'
import AllEmployee from './Pages/AllEmployee.jsx'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
