import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='header bg-emerald-600 text-white flex justify-between items-center px-5 py-5 text-sm sm:text-xl'>
      <h1 className='text-base sm:text-2xl'>Employee Management System</h1>
      <div className='text flex space-x-4 text-sm sm:text-lg'>
        <Link to="/" className='hover:text-emerald-300'>All Employees</Link>
        <Link to="/add-employee" className='hover:text-emerald-300'>Add Employee</Link>
      </div>
    </div>
  )
}

export default Navbar