import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getBookingsById, bookSlot } from '../services/bookingService';

function BookingForm() {
  const { bookingId } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const data = await getBookingsById(bookingId);
        setBookingDetails(data);
      } catch (err) {
        setError('Failed to fetch booking details.');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const onSubmit = async (formData) => {
    const bookingData = {
      ...formData,
      id: bookingDetails.id
    };

    try {
      await bookSlot(bookingData);
      alert('Booking successful!');
      reset();
    } catch (error) {
      alert('Failed to book. Please try again.');
    }
  };

  return (
    <div className="card mx-auto my-4" style={{ maxWidth: '500px' }}>
    <h2 className="card-header bg-primary text-white text-center">Book Slot</h2>
  
    <div className="card-body">
      {error && <div className="alert alert-danger">{error}</div>}
      {bookingDetails ? (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Booking ID: {bookingDetails.id}</h5>
              <p className="card-text">
                <strong>Date:</strong> {bookingDetails.date}
              </p>
              <p className="card-text">
                <strong>Time:</strong> {bookingDetails.time}
              </p>
              <p className={`card-text ${bookingDetails.booked ? 'text-success' : 'text-danger'}`}>
                {bookingDetails.booked ? 'Confirmed' : 'Pending'}
              </p>
            </div>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                {...register('email', { required: true })}
              />
              {errors.email && <div className="text-danger mt-2">This field is required</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={!bookingDetails}>Book</button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading booking details...</p>
        </div>
      )}
    </div>
  </div>
  
  );
}

export default BookingForm;
