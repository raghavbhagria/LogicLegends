
import React, { useState } from 'react';
import { useTicketContext } from './TicketContext';

function ProfilePage() {
  const { ticketDetails } = useTicketContext();
  // Initialize user state with data from localStorage or null if not found
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  // State to manage form inputs, initializing with current user data
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '', // Assuming you want to display but not edit the email
    zipCode: user?.zipCode || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Begin the API call section
    try {
      const response = await fetch('/updateProfile', { // Adjust the endpoint as needed
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // If you have authentication tokens, add them to headers
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: user.id, // Ensure your user object includes the user's id
          name: editData.name,
          zipCode: editData.zipCode,
        }),
      });

      if (response.ok) {
        const updatedUser = { ...user, ...editData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        // Optionally, display a success message or perform additional actions
        alert("Profile updated successfully.");
      } else {
        // Handle errors, for example, show an error message
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle network errors or other exceptions
      alert("An error occurred. Please try again.");
    }
  };

  if (!user) {
    return <div>No user data found. Please log in.</div>;
  }

  // Display tickets component if ticket details are available
  let ticketsComponent = ticketDetails && (
    <div className="mt-8 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
      <div className="border-b border-gray-200 py-4">
        <div className="text-lg font-semibold">{ticketDetails.eventName}</div>
        <div>Date: {ticketDetails.eventDate}</div>
        <div>Location: {ticketDetails.location}</div>
        <div>Quantity: {ticketDetails.quantity}</div>
        <div>Total Price: ${ticketDetails.totalPrice}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 block w-full"
              name="name"
              type="text"
              value={editData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 block w-full"
              name="email"
              type="email"
              value={editData.email}
              onChange={handleInputChange}
              disabled // Assuming you don't want the email to be editable
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              className="mt-1 block w-full"
              name="zipCode"
              type="text"
              value={editData.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Save Changes
        </button>
      </form>
      {ticketsComponent}
    </div>
  );
}

export default ProfilePage;

