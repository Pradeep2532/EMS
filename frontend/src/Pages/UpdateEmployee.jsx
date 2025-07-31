import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * A form component to edit an existing employee's details.
 * It fetches the current employee data, populates the form, and submits updates.
 * Features a modern, responsive layout with loading states and user-friendly notifications.
 */
function EditEmployee() {
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
  const [isFetching, setIsFetching] = useState(true); // For initial data load

  // Hooks from react-router-dom
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // For programmatic navigation

  // Fetches the details of the specific employee to be edited
  useEffect(() => {
    const fetchOneDetails = async () => {
      setIsFetching(true); // Start loading
      try {
        const response = await axios.put(
          `http://localhost:5000/employee/update/${id}`,{withCredentials:true}
        );
        const { result } = response.data;
        // Populate the form with fetched data
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setEmail(result.email);
        setContact(result.contact);
        setDesignation(result.degination);
      } catch (err) {
        setIsError(true);
        setMessage("Failed to fetch employee data. Please try again.");
        console.error("Fetch Error:", err);
      } finally {
        setIsFetching(false); // Stop loading
      }
    };

    fetchOneDetails();
  }, [id]); // Dependency array with 'id' ensures this runs when the id changes

  /**
   * Handles the form submission to update the employee record.
   * @param {React.FormEvent} e - The form submission event.
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const updatedData = { firstName, lastName, email, contact, designation };

    try {
      // Make a PUT request to update the record
      await axios.put(
        `http://127.0.0.1:5000/employee/update/${id}`,
        updatedData,{withCredentials:true }
      );

      setIsError(false);
      setMessage("Record Updated Successfully!");

      // Redirect to the main employee list after a short delay
      setTimeout(() => {
        navigate("/"); // Corrected path to navigate to the main list
      }, 1000);

    } catch (err) {
      setIsError(true);
      setMessage("Failed to update record. Please try again.");
      console.error("Update Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Display a loading skeleton while fetching initial data
  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="mt-6 h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 mt-3">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
        Edit Employee Details
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
            {isLoading ? 'Updating...' : 'Update Employee'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default EditEmployee;
