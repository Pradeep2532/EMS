import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-emerald-600 text-white flex justify-between items-center px-5 py-5 '>
      <h1 className='text-2xl '>Employee Menegment System</h1>
      <div className='flex space-x-4'>
        <Link to="/" className='text-lg hover:text-emerald-300'>All Employees</Link>
        <Link to="/add-employee" className='text-lg hover:text-emerald-300'>Add Employee</Link>
      </div>
    </div>

  )
}

export default Navbar
