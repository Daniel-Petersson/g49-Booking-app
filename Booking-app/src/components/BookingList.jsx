import React, { useEffect, useState } from 'react';
import { getBookings } from '../services/bookingService';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const fromDate = '2024-08-15';  // Justera datumintervallet som behövs
        const toDate = '2024-08-15';  // Justera datumintervallet som behövs
        const bookingsData = await getBookings(fromDate, toDate);
        setBookings(bookingsData);
      } catch (err) {
        setError('Could not fetch bookings.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      {error && <p>{error}</p>}
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Booking ID: {booking.id}</h5>
                <p className="card-text">
                  <strong>Date and Time:</strong> {new Date(booking.dateTime).toLocaleString()}
                </p>
                <p className={`card-text ${booking.booked ? 'text-success' : 'text-danger'}`}>
                  {booking.booked ? 'Confirmed' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingList;
