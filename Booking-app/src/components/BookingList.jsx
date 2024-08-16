import React, { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 12;
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const fromDate = "2024-08-16"; // Justera datumintervallet som behövs
        const toDate = "2024-08-23"; // Justera datumintervallet som behövs
        const bookingsData = await getBookings(fromDate, toDate);
        setBookings(bookingsData);
      } catch (err) {
        setError("Could not fetch bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handelButtonClick = (bookingId) => {
    if (bookings.find((booking) => booking.id === bookingId).booked) {
      navigate(`/cancel/${bookingId}`);
    } else {
      navigate(`/book/${bookingId}`);
    }
  };

  function buttonTitle(booked) {
    return booked ? "Cancel Slot" : "Book Slot";
  }

  return (
    <div>
      <h2>Available Slots</h2>
      {error && <p>{error}</p>}
      <div className="row">
        {currentBookings.map((booking) => (
          <div key={booking.id} className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Booking ID: {booking.id}</h5>
                <p className="card-text">
                  <strong>Date and Time:</strong>{" "}
                  {new Date(booking.dateTime).toLocaleString()}
                </p>
                <p
                  className={`card-text ${
                    booking.booked ? "text-success" : "text-danger"
                  }`}
                >
                  {booking.booked ? "Confirmed" : "Pending"}
                </p>
                <button
                  className={`btn ${
                    booking.booked ? "btn-danger" : "btn-primary"
                  } w-100`}
                  onClick={() => handelButtonClick(booking.id)}
                >
                  {buttonTitle(booking.booked)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookingList;
