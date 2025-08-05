import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllEmployees() {
  const [result, setResult] = useState([]);

  // Fetches all employee records from the API
  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get("https://ems-f5u0.onrender.com/employee/all",{withCredentials:true});
      // Ensure response.data.result is an array before setting state
      console.log("API Response:", response.data);
      if (Array.isArray(response.data.result)) {
        setResult(response.data.result);
      } else {
        console.error("API response is not an array:", response.data);
        setResult([]); // Reset to an empty array on error 
      }
    } catch (e) {
      console.log("Error fetching employees:", e);
    }
  };

  // Deletes a specific employee record and refreshes the list
  const deleteRecord = async (id) => {
    try {
      // Optional: Add a confirmation dialog for a better user experience
      if (window.confirm("Are you sure you want to delete this employee?")) {
        await axios.delete(`https://ems-f5u0.onrender.com/employee/delete/${id}`);
        fetchAllEmployees(); // Refresh the list after deletion
      }
    } catch (e) {
      console.log("Error deleting record:", e);
    }
  };

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mt-10 mx-auto max-w-6xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
            All Employees 👥
          </h2>
        </div>

        {/* This div makes the table scroll horizontally on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            {/* Table Header */}
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6">First Name</th>
                <th className="py-3 px-6">Last Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Contact</th>
                <th className="py-3 px-6">Designation</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700 text-sm">
              {result.map((row) => (
                <tr
                  key={row._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{row.firstName}</td>
                  <td className="py-3 px-6">{row.lastName}</td>
                  <td className="py-3 px-6">{row.email}</td>
                  <td className="py-3 px-6">{row.contact}</td>
                  <td className="py-3 px-6">{row.degination}</td>
                  <td className="py-3 px-6 text-center">
                    <button>
                    <Link 
                      to={`/update-employee/${row._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-xs mr-2 transition duration-300 ease-in-out mt-3 mb-3 w-auto"
                    >
                      Edit
                    </Link>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRecord(row._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-xs transition duration-300 ease-in-out mt-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {result.length === 0 && (
             <p className="text-center text-gray-500 py-8">No employee data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllEmployees;