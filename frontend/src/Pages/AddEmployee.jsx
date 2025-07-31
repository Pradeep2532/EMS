import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A form component for adding a new employee.
 * Features a modern, responsive layout with Tailwind CSS and user-friendly notifications.
 */
function AddEmployee() {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");

  // State for managing notifications and loading status
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook to programmatically navigate after form submission
  const navigate = useNavigate();

  // Resets all form fields
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setDesignation("");
  };

  /**
   * Handles the form submission asynchronously.
   * @param {React.FormEvent} e - The form submission event.
   */
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);   // Show loading indicator
    setMessage("");     // Clear previous messages

    const employeeData = { firstName, lastName, email, contact, designation };

    try {
      // Make a POST request to the backend API
      await axios.post(
        "http://127.0.0.1:5000/employee/create",
        employeeData,
        {
          withCredentials:true
        }
        
      );
      
      // Show success message
      setIsError(false);
      setMessage("New Employee Added Successfully!");
      
      resetForm(); // Clear form fields

      // Redirect to the employee list page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      // Show error message if the API call fails
      setIsError(true);
      setMessage("Failed to add employee. Please try again.");
      console.error("Submission Error:", err);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-3 mb-5 p-6 sm:p-8 max-h-screen overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mt-3 mb-6 p-3">
        Add New Employee
      </h2>

      {/* Form starts here */}
      <form onSubmit={submitHandler} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* First Name Field */}
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Contact Field */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Designation Field */}
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* --- Notification Message --- */}
        {message && (
          <div className={`mt-4 text-center p-3 rounded-md text-sm ${
              isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* --- Submit Button --- */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Submitting...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddEmployee;
