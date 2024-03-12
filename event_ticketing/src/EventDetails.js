import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy event details data (replace with actual data fetching or storage)
  const eventDetails = {
    1: {
      title: 'Event 1',
      description: 'Description of Event 1',
      date: '2024-03-15',
      location: 'Location of Event 1',
      organizer: 'Organizer Name 1',
      price: 20, // Ticket price
    },
    2: {
      title: 'Event 2',
      description: 'Description of Event 2',
      date: '2024-03-20',
      location: 'Location of Event 2',
      organizer: 'Organizer Name 2',
      price: 25, // Ticket price
    },
    // Add details for events 3 and 4
    3: {
      title: 'Diljit',
      description: 'Concert',
      date: '2024-03-20',
      location: 'Location B',
      organizer: 'Organizer Name 3',
      price: 30, // Ticket price
    },
    4: {
      title: 'Karan Aujla',
      description: 'Concert',
      date: '2024-03-20',
      location: 'Location B',
      organizer: 'Organizer Name 4',
      price: 35, // Ticket price
    },
  };

  // Get event details based on the id from URL parameters
  const selectedEvent = eventDetails[id];

  // State for quantity selection
  const [quantity, setQuantity] = useState(1);

  // Function to calculate total price based on quantity
  const totalPrice = selectedEvent.price * quantity;

  // Function to handle buy now
  const handleBuyNow = () => {
    // Navigate to checkout page with event details and quantity
    navigate(`/checkout/${id}?quantity=${quantity}`);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
        <p className="text-lg mb-6">{selectedEvent.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="mb-2"><strong>Date:</strong> {selectedEvent.date}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedEvent.location}</p>
            <p className="mb-2"><strong>Organizer:</strong> {selectedEvent.organizer}</p>
            <p className="mb-2"><strong>Price per ticket:</strong> ${selectedEvent.price}</p>
          </div>
          <div className="text-right">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              min="1"
              className="border border-gray-400 p-2 w-16 text-center"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>
        <p className="mb-6"><strong>Total Price:</strong> ${totalPrice}</p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}  

export default EventDetails;
