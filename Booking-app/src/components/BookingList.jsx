import React, { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService"; 

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async ()=>{
        try {
            const fromDate = '2024-08-01';
            const toDate = '2024-08-31';
            const bookingsdata = await getBookings(fromDate, toDate);
            setBookings(bookingsdata);
    }catch (err){
        setError(err.message || 'Failed to fetch bookings');
    }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <ul className="list-group">
      {error && <div className="error">{error}</div>} {/* Display error if exists */}
        {bookings.map((booking) => (
          <li key={booking.id} className="list-group-item">
            Booking ID: {booking.id} - Date: {booking.dateTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
